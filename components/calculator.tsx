'use client'

import React, { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts'
import dynamic from 'next/dynamic'

const ChiapasMap = dynamic(() => import('./chiapas-map').then(m => m.ChiapasMap), { ssr: false })
import { calculateYearlyData, calculateMonthlyData, calculateStatistics } from '@/lib/calculator'
import {
  CHIAPAS_LOCATIONS,
  DEFAULT_LOCATION,
  getLocationById,
  PrecipitationLocation,
} from '@/lib/chiapas-locations'
import { Language, getTranslation } from '@/lib/translations'

const STORAGE_OPTIONS = [
  100, 200, 450, 500, 750, 1000, 1100, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 15000, 20000,
  25000, 30000, 40000, 50000, 75000, 100000, 150000, 200000, 300000, 400000, 500000, 750000,
  1000000, 2500000, 5000000, 10000000,
]

const MONTH_NAMES: { [key: string]: { en: string; es: string } } = {
  0: { en: 'January', es: 'Enero' },
  1: { en: 'February', es: 'Febrero' },
  2: { en: 'March', es: 'Marzo' },
  3: { en: 'April', es: 'Abril' },
  4: { en: 'May', es: 'Mayo' },
  5: { en: 'June', es: 'Junio' },
  6: { en: 'July', es: 'Julio' },
  7: { en: 'August', es: 'Agosto' },
  8: { en: 'September', es: 'Septiembre' },
  9: { en: 'October', es: 'Octubre' },
  10: { en: 'November', es: 'Noviembre' },
  11: { en: 'December', es: 'Diciembre' },
}

const SHORT_MONTH_NAMES: { [key: string]: { en: string; es: string } } = {
  0: { en: 'Jan', es: 'Ene' },
  1: { en: 'Feb', es: 'Feb' },
  2: { en: 'Mar', es: 'Mar' },
  3: { en: 'Apr', es: 'Abr' },
  4: { en: 'May', es: 'May' },
  5: { en: 'Jun', es: 'Jun' },
  6: { en: 'Jul', es: 'Jul' },
  7: { en: 'Aug', es: 'Ago' },
  8: { en: 'Sep', es: 'Sep' },
  9: { en: 'Oct', es: 'Oct' },
  10: { en: 'Nov', es: 'Nov' },
  11: { en: 'Dec', es: 'Dic' },
}

interface MonthlyData {
  month: string
  rainfall: number
  demand: number
  supply: number
  overflow: number
  storage: number
}

// Cantaro Azul brand colors
const CA = {
  darkBlue: '#2b5672',
  midBlue: '#40B4E5',
  lightBlue: '#eaf7ff',
  paleBlue: '#d3edff',
  white: '#FFFFFF',
  orange: '#f97316',
  text: '#1a2a3a',
  muted: '#6b8ba4',
}

export default function Calculator() {
  const [language, setLanguage] = useState<Language>('en')
  const t = (key: keyof typeof import('@/lib/translations').translations.en) =>
    getTranslation(language, key)

  const [numUsersRaw, setNumUsersRaw] = useState('60')
  const [dailyUseRaw, setDailyUseRaw] = useState('2')
  const [storageVolume, setStorageVolume] = useState(2500)
  const [catchmentRaw, setCatchmentRaw] = useState('100')
  const [selectedLocation, setSelectedLocation] = useState<PrecipitationLocation>(DEFAULT_LOCATION)

  const numUsers = Math.max(1, parseInt(numUsersRaw) || 1)
  const dailyUsePerUser = Math.max(0.1, parseFloat(dailyUseRaw) || 0.1)
  const catchmentArea = Math.max(1, parseInt(catchmentRaw) || 1)

  const chartData = useMemo(() => {
    const monthly = selectedLocation.monthlyPrecipitation
    const rainyDaysPerMonth = selectedLocation.monthlyRainyDays
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const monthValues = [
      monthly.january, monthly.february, monthly.march, monthly.april,
      monthly.may, monthly.june, monthly.july, monthly.august,
      monthly.september, monthly.october, monthly.november, monthly.december,
    ]

    const dailySeries: number[] = []
    for (let m = 0; m < 12; m++) {
      const days = daysInMonth[m]
      const totalRain = monthValues[m]
      const rainyDays = Math.min(Math.max(rainyDaysPerMonth[m], 1), days)
      const rainPerRainyDay = totalRain / rainyDays
      const monthArr = new Array(days).fill(0)
      for (let r = 0; r < rainyDays; r++) {
        const dayIdx = Math.floor((r / rainyDays) * days)
        monthArr[dayIdx] += rainPerRainyDay
      }
      dailySeries.push(...monthArr)
    }

    if (dailySeries.length > 365) dailySeries.length = 365
    while (dailySeries.length < 365) dailySeries.push(0)

    const dailyData = calculateYearlyData({
      numUsers,
      dailyUsePerUser,
      storageVolume,
      catchmentArea,
      precipitationSeries: dailySeries,
    })

    const months = calculateMonthlyData(dailyData).map((m) => ({
      month: SHORT_MONTH_NAMES[m.month - 1][language],
      rainfall: m.rainfall,
      demand: m.demand,
      supply: m.supply,
      overflow: m.overflow,
      storage: m.avgStorage || 0,
    }))

    const stats = calculateStatistics(dailyData)
    return { months, stats }
  }, [selectedLocation, numUsersRaw, dailyUseRaw, storageVolume, catchmentRaw, language])

  const handleLocationSelect = (location: PrecipitationLocation) => {
    setSelectedLocation(location)
  }

  const handleLocationDropdownChange = (locationId: string) => {
    const location = getLocationById(locationId)
    if (location) setSelectedLocation(location)
  }

  const inputClass = `w-full rounded-lg border border-[#b3d9f0] bg-white px-3 py-2 text-sm text-[#1a2a3a] focus:border-[#40B4E5] focus:outline-none focus:ring-2 focus:ring-[#40B4E5]/20`
  const labelClass = `mb-1 block text-xs font-semibold uppercase tracking-wide text-[#2b5672]`

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: CA.lightBlue }}>

      {/* Header */}
      <header className="flex-none border-b border-[#c5e4f5] bg-white px-5 py-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="./cantaro-logo-text.png"
              alt="Cántaro Azul"
              className="h-10 w-auto flex-none"
            />
            <div className="hidden sm:block border-l border-[#c5e4f5] pl-4">
              <h1 className="text-sm font-semibold leading-tight" style={{ color: CA.darkBlue }}>
                {t('title')}
              </h1>
              <p className="text-xs" style={{ color: CA.muted }}>{t('subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-[#eaf7ff]"
            style={{ border: `1px solid ${CA.midBlue}`, color: CA.darkBlue }}
          >
            {language === 'en' ? 'English' : 'Español'}
          </button>
        </div>
      </header>

      {/* Two-column layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="flex w-80 flex-none flex-col overflow-y-auto border-r border-[#c5e4f5]" style={{ backgroundColor: CA.white }}>
          <div className="space-y-4 p-4">

            {/* Location selector */}
            <div>
              <label className={labelClass}>{t('searchLocation')}</label>
              <select
                value={selectedLocation.id}
                onChange={(e) => handleLocationDropdownChange(e.target.value)}
                className={inputClass}
              >
                {CHIAPAS_LOCATIONS.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-lg border border-[#c5e4f5]">
              <ChiapasMap
                selectedLocationId={selectedLocation.id}
                onLocationSelect={handleLocationSelect}
              />
            </div>

            {/* Location info */}
            <div className="rounded-lg p-3 text-xs" style={{ backgroundColor: CA.lightBlue, border: `1px solid ${CA.paleBlue}` }}>
              <p className="font-semibold" style={{ color: CA.darkBlue }}>{selectedLocation.name}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span style={{ color: CA.muted }}>{t('annualPrecipitation')}</span>
                  <span className="font-semibold" style={{ color: CA.darkBlue }}>{selectedLocation.annualPrecipitation} mm/yr</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: CA.muted }}>{t('dailyAverage')}</span>
                  <span className="font-semibold" style={{ color: CA.darkBlue }}>{selectedLocation.dailyAveragePrecipitation.toFixed(1)} mm/day</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: CA.muted }}>{t('region')}</span>
                  <span className="font-semibold text-right" style={{ color: CA.darkBlue }}>{selectedLocation.region}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: CA.muted }}>{t('elevation')}</span>
                  <span className="font-semibold" style={{ color: CA.darkBlue }}>{selectedLocation.elevation}m</span>
                </div>
              </div>
            </div>

            <p className="text-xs" style={{ color: CA.muted }}>
              Precipitation data:{' '}
              <a
                href="https://worldclim.org/data/worldclim21.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: CA.midBlue }}
              >
                WorldClim v2.1
              </a>{' '}
              (1970–2000 climate normals)
            </p>

            <hr style={{ borderColor: CA.paleBlue }} />

            {/* Number of Users */}
            <div>
              <label className={labelClass}>{t('numberOfUsers')}</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={numUsersRaw}
                onChange={(e) => setNumUsersRaw(e.target.value)}
                onBlur={() => setNumUsersRaw(String(Math.max(1, parseInt(numUsersRaw) || 1)))}
                className={inputClass}
              />
            </div>

            {/* Daily Use Per User */}
            <div>
              <label className={labelClass}>{t('dailyUsePerUser')}</label>
              <input
                type="number"
                min="0.1"
                max="500"
                step="0.1"
                value={dailyUseRaw}
                onChange={(e) => setDailyUseRaw(e.target.value)}
                onBlur={() => setDailyUseRaw(String(Math.max(0.1, parseFloat(dailyUseRaw) || 0.1)))}
                className={inputClass}
              />
              <p className="mt-1 text-xs" style={{ color: CA.muted }}>
                {t('totalDailyDemand')} <span className="font-semibold" style={{ color: CA.darkBlue }}>{(numUsers * dailyUsePerUser).toLocaleString(undefined, { maximumFractionDigits: 1 })} L</span>
              </p>
            </div>

            {/* Storage Volume */}
            <div>
              <label className={labelClass}>{t('storageVolume')}</label>
              <select
                value={storageVolume}
                onChange={(e) => setStorageVolume(parseInt(e.target.value))}
                className={inputClass}
              >
                {STORAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option.toLocaleString()} L
                  </option>
                ))}
              </select>
            </div>

            {/* Catchment Area */}
            <div>
              <label className={labelClass}>{t('catchmentArea')}</label>
              <input
                type="number"
                min="1"
                max="100000"
                value={catchmentRaw}
                onChange={(e) => setCatchmentRaw(e.target.value)}
                onBlur={() => setCatchmentRaw(String(Math.max(1, parseInt(catchmentRaw) || 1)))}
                className={inputClass}
              />
              <p className="mt-1 text-xs" style={{ color: CA.muted }}>{catchmentArea} {t('mSquared')}</p>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: CA.lightBlue }}>

          {/* Stats cards */}
          <div className="mb-5 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-white p-4 shadow-sm" style={{ borderTop: `4px solid ${CA.midBlue}` }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: CA.muted }}>
                {t('totalAnnualRainfall')}
              </p>
              <p className="mt-1 text-2xl font-bold" style={{ color: CA.midBlue }}>
                {chartData.stats.totalRainfall.toLocaleString()} L
              </p>
              <p className="text-xs" style={{ color: CA.muted }}>/year</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm" style={{ borderTop: `4px solid ${CA.darkBlue}` }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: CA.muted }}>
                {t('totalAnnualDemand')}
              </p>
              <p className="mt-1 text-2xl font-bold" style={{ color: CA.darkBlue }}>
                {chartData.stats.totalDemand.toLocaleString()} L
              </p>
              <p className="text-xs" style={{ color: CA.muted }}>/year</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm" style={{ borderTop: `4px solid ${CA.orange}` }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: CA.muted }}>
                {t('totalAnnualOverflow')}
              </p>
              <p className="mt-1 text-2xl font-bold" style={{ color: CA.orange }}>
                {chartData.stats.totalOverflow.toLocaleString()} L
              </p>
              <p className="text-xs" style={{ color: CA.muted }}>/year</p>
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-5">

            {/* Volume Captured vs Demand */}
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-bold" style={{ color: CA.darkBlue }}>
                {t('rainwaterSupply')}
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={chartData.months} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dceefb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: CA.muted }} stroke={CA.paleBlue} />
                  <YAxis
                    label={{ value: t('volume'), angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: CA.muted } }}
                    tick={{ fontSize: 11, fill: CA.muted }}
                    stroke={CA.paleBlue}
                  />
                  <Tooltip
                    formatter={(value: any) => value.toLocaleString()}
                    contentStyle={{ backgroundColor: '#fff', border: `1px solid ${CA.paleBlue}`, borderRadius: '8px', fontSize: 12, fontFamily: 'Poppins, sans-serif' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="rainfall" fill={CA.midBlue} name={t('rainfall')} isAnimationActive={false} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="demand" fill={CA.darkBlue} name={t('demand')} isAnimationActive={false} radius={[3, 3, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Overflow */}
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-bold" style={{ color: CA.darkBlue }}>
                {t('overflowVolume')}
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData.months} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dceefb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: CA.muted }} stroke={CA.paleBlue} />
                  <YAxis
                    label={{ value: t('volume'), angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: CA.muted } }}
                    tick={{ fontSize: 11, fill: CA.muted }}
                    stroke={CA.paleBlue}
                  />
                  <Tooltip
                    formatter={(value: any) => value.toLocaleString()}
                    contentStyle={{ backgroundColor: '#fff', border: `1px solid ${CA.paleBlue}`, borderRadius: '8px', fontSize: 12, fontFamily: 'Poppins, sans-serif' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="overflow" fill={CA.orange} name={t('overflowVolume')} isAnimationActive={false} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 rounded-lg p-3 text-sm" style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}>
                <span className="font-semibold" style={{ color: CA.darkBlue }}>{t('totalAnnualOverflowValue')} </span>
                <span className="font-bold" style={{ color: CA.orange }}>{chartData.stats.totalOverflow.toLocaleString()} L</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
