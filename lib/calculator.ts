// Rainwater Harvesting Calculator Logic

export interface CalculatorInputs {
  numUsers: number
  dailyUsePerUser: number // liters
  storageVolume: number // liters
  catchmentArea: number // m²
  // Either provide a constant `precipitationPerDay` (mm/day) or a full
  // `precipitationSeries` array with 365 entries (mm/day). If both are
  // omitted the function will generate a synthetic seasonal pattern.
  precipitationPerDay?: number // mm/day
  precipitationSeries?: number[] // length 365, mm/day
}

export interface DailyData {
  day: number
  rainfall: number // liters
  demand: number // liters
  storage: number // liters
  supply: number // liters
  overflow: number // liters
}

/**
 * Convert mm of rainfall to liters given catchment area
 * 1 mm of rain on 1 m² = 1 liter
 */
function precipitationToVolume(mm: number, catchmentAreaM2: number): number {
  return mm * catchmentAreaM2
}

/**
 * Generate daily data for a year based on inputs and precipitation data
 * Uses a simplified precipitation pattern
 */
export function calculateYearlyData(inputs: CalculatorInputs): DailyData[] {
  const { numUsers, dailyUsePerUser, storageVolume, catchmentArea } = inputs
  const dailyDemand = numUsers * dailyUsePerUser

  // Build precipitation series: priority -> explicit series, single value, synthetic
  let series: number[] = []
  if (inputs.precipitationSeries && inputs.precipitationSeries.length === 365) {
    series = inputs.precipitationSeries.slice(0, 365)
  } else if (typeof inputs.precipitationPerDay === 'number') {
    series = new Array(365).fill(inputs.precipitationPerDay)
  } else {
    // Synthetic seasonal pattern (backward-compatible)
    for (let day = 0; day < 365; day++) {
      const seasonalComponent = Math.sin((day / 365) * Math.PI * 2) * 0.5 + 0.5
      const randomComponent = Math.random() * 0.3
      const precipitationIntensity = seasonalComponent + randomComponent
      const dailyPrecipitation = precipitationIntensity * 5 // mm
      series.push(dailyPrecipitation)
    }
  }

  const dailyData: DailyData[] = []
  let currentStorage = 0 // Start empty (end of dry season)

  for (let day = 0; day < 365; day++) {
    const dailyPrecipitation = series[day]

    // Convert precipitation to volume
    const rainfallVolume = precipitationToVolume(dailyPrecipitation, catchmentArea)

    // Rainfall occurs and is added to the tank first. Overflow is any volume that
    // cannot be stored because the tank is already full at the time of rainfall.
    let newStorage = currentStorage + rainfallVolume
    let overflow = 0
    if (newStorage > storageVolume) {
      overflow = newStorage - storageVolume
      newStorage = storageVolume
    }

    // After rainfall, demand is served from storage
    const supply = Math.min(dailyDemand, newStorage)
    newStorage = newStorage - supply

    // Ensure non-negative
    if (newStorage < 0) newStorage = 0

    currentStorage = newStorage

    dailyData.push({
      day: day + 1,
      rainfall: Math.round(rainfallVolume * 100) / 100,
      demand: dailyDemand,
      storage: Math.round(currentStorage * 100) / 100,
      supply,
      overflow: Math.round(overflow * 100) / 100,
    })
  }

  return dailyData
}

/**
 * Calculate aggregated statistics from daily data
 */
export function calculateStatistics(dailyData: DailyData[]) {
  const totalRainfall = dailyData.reduce((sum, day) => sum + day.rainfall, 0)
  const totalDemand = dailyData.reduce((sum, day) => sum + day.demand, 0)
  const totalSupply = dailyData.reduce((sum, day) => sum + day.supply, 0)
  const totalOverflow = dailyData.reduce((sum, day) => sum + day.overflow, 0)
  const unmetDemand = totalDemand - totalSupply

  const avgDailyRainfall = totalRainfall / dailyData.length
  const avgDailySupply = totalSupply / dailyData.length
  const avgDailyDemand = totalDemand / dailyData.length

  const selfSufficiencyRate = totalDemand > 0 ? (totalSupply / totalDemand) * 100 : 0

  return {
    totalRainfall: Math.round(totalRainfall),
    totalDemand: Math.round(totalDemand),
    totalSupply: Math.round(totalSupply),
    totalOverflow: Math.round(totalOverflow),
    unmetDemand: Math.round(unmetDemand),
    avgDailyRainfall: Math.round(avgDailyRainfall * 100) / 100,
    avgDailySupply: Math.round(avgDailySupply * 100) / 100,
    avgDailyDemand: Math.round(avgDailyDemand * 100) / 100,
    selfSufficiencyRate: Math.round(selfSufficiencyRate * 100) / 100,
  }
}

/**
 * Calculate monthly aggregated data
 */
export function calculateMonthlyData(dailyData: DailyData[]) {
  const monthlyData = []
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let startDay = 0
  for (let month = 0; month < 12; month++) {
    const endDay = startDay + daysInMonth[month]
    const monthlyDays = dailyData.slice(startDay, endDay)
    startDay = endDay

    const monthlyRainfall = monthlyDays.reduce((sum, day) => sum + day.rainfall, 0)
    const monthlyDemand = monthlyDays.reduce((sum, day) => sum + day.demand, 0)
    const monthlySupply = monthlyDays.reduce((sum, day) => sum + day.supply, 0)
    const monthlyOverflow = monthlyDays.reduce((sum, day) => sum + day.overflow, 0)
    const avgStorage = monthlyDays.reduce((sum, day) => sum + day.storage, 0) / monthlyDays.length

    monthlyData.push({
      month: month + 1,
      rainfall: Math.round(monthlyRainfall),
      demand: Math.round(monthlyDemand),
      supply: Math.round(monthlySupply),
      overflow: Math.round(monthlyOverflow),
      avgStorage: Math.round(avgStorage),
    })
  }

  return monthlyData
}
