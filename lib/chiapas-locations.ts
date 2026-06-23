// WorldClim v2.1 monthly precipitation data (mm/month, 1970-2000 climate normals)
// Sources: WorldClim 2.1 / NASA POWER MERRA-2 climatology per location coordinates

export interface MonthlyPrecipitation {
  january: number
  february: number
  march: number
  april: number
  may: number
  june: number
  july: number
  august: number
  september: number
  october: number
  november: number
  december: number
}

export interface PrecipitationLocation {
  id: string
  name: string
  latitude: number
  longitude: number
  annualPrecipitation: number // mm/year
  dailyAveragePrecipitation: number // mm/day
  monthlyPrecipitation: MonthlyPrecipitation // mm/month
  // Number of days per month with measurable rainfall (>1mm) — WorldClim wet-day frequency
  monthlyRainyDays: [number,number,number,number,number,number,number,number,number,number,number,number]
  elevation: number // meters
  region: string
}

export const CHIAPAS_LOCATIONS: PrecipitationLocation[] = [
  {
    id: 'tuxtla',
    name: 'Tuxtla Gutiérrez (Capital)',
    latitude: 16.7574,
    longitude: -93.1109,
    // WorldClim v2.1
    annualPrecipitation: 1171,
    dailyAveragePrecipitation: 3.21,
    monthlyPrecipitation: {
      january: 6, february: 4, march: 7, april: 20,
      may: 96, june: 251, july: 175, august: 195,
      september: 247, october: 131, november: 32, december: 7,
    },
    monthlyRainyDays: [2, 1, 2, 4, 10, 20, 17, 19, 21, 14, 4, 2],
    elevation: 550,
    region: 'Central Depression',
  },
  {
    id: 'san-cristobal',
    name: 'San Cristóbal de Las Casas',
    latitude: 16.7369,
    longitude: -92.6376,
    // WorldClim v2.1
    annualPrecipitation: 1128,
    dailyAveragePrecipitation: 3.09,
    monthlyPrecipitation: {
      january: 17, february: 14, march: 16, april: 30,
      may: 115, june: 202, july: 137, august: 180,
      september: 221, october: 136, november: 38, december: 22,
    },
    monthlyRainyDays: [5, 4, 5, 8, 15, 22, 20, 22, 24, 20, 9, 6],
    elevation: 2120,
    region: 'Highlands',
  },
  {
    id: 'tapachula',
    name: 'Tapachula',
    latitude: 14.9064,
    longitude: -92.2625,
    annualPrecipitation: 2569,
    dailyAveragePrecipitation: 7.04,
    monthlyPrecipitation: {
      january: 7, february: 7, march: 28, april: 74,
      may: 307, june: 430, july: 343, august: 401,
      september: 474, october: 405, november: 82, december: 11,
    },
    monthlyRainyDays: [3, 2, 4, 7, 18, 24, 21, 23, 25, 22, 10, 3],
    elevation: 183,
    region: 'Soconusco (Coastal Plain)',
  },
  {
    id: 'comitan',
    name: 'Comitán',
    latitude: 16.2506,
    longitude: -92.1328,
    annualPrecipitation: 1348,
    dailyAveragePrecipitation: 3.69,
    monthlyPrecipitation: {
      january: 28, february: 23, march: 22, april: 43,
      may: 150, june: 241, july: 137, august: 193,
      september: 254, october: 169, november: 56, december: 32,
    },
    monthlyRainyDays: [5, 4, 5, 8, 15, 21, 16, 20, 23, 19, 9, 6],
    elevation: 1640,
    region: 'Eastern Highlands',
  },
  {
    id: 'palenque',
    name: 'Palenque',
    latitude: 17.5091,
    longitude: -91.9878,
    annualPrecipitation: 2150,
    dailyAveragePrecipitation: 5.89,
    monthlyPrecipitation: {
      january: 123, february: 76, march: 55, april: 65,
      may: 146, june: 289, july: 183, august: 273,
      september: 344, october: 307, november: 180, december: 109,
    },
    monthlyRainyDays: [14, 10, 9, 10, 16, 24, 20, 23, 25, 24, 19, 14],
    elevation: 80,
    region: 'Lacandon Jungle',
  },
  {
    id: 'villahermosa',
    name: 'Villahermosa',
    latitude: 17.9896,
    longitude: -92.6345,
    annualPrecipitation: 2127,
    dailyAveragePrecipitation: 5.83,
    monthlyPrecipitation: {
      january: 137, february: 81, march: 60, april: 52,
      may: 123, june: 255, july: 170, august: 250,
      september: 333, october: 340, november: 207, december: 119,
    },
    monthlyRainyDays: [14, 11, 10, 10, 16, 24, 21, 24, 26, 25, 20, 14],
    elevation: 50,
    region: 'Tabasco (Adjacent)',
  },
  {
    id: 'ocosingo',
    name: 'Ocosingo',
    latitude: 16.9094,
    longitude: -92.0826,
    // WorldClim v2.1
    annualPrecipitation: 1930,
    dailyAveragePrecipitation: 5.29,
    monthlyPrecipitation: {
      january: 92, february: 61, march: 45, april: 63,
      may: 162, june: 278, july: 174, august: 246,
      september: 326, october: 259, november: 140, december: 84,
    },
    monthlyRainyDays: [12, 9, 8, 10, 17, 23, 20, 23, 25, 23, 18, 12],
    elevation: 950,
    region: 'Selva Lacandona',
  },
  {
    id: 'arriaga',
    name: 'Arriaga',
    latitude: 16.3142,
    longitude: -93.6683,
    annualPrecipitation: 1506,
    dailyAveragePrecipitation: 4.13,
    monthlyPrecipitation: {
      january: 17, february: 13, march: 12, april: 26,
      may: 121, june: 298, july: 215, august: 261,
      september: 313, october: 169, november: 38, december: 23,
    },
    monthlyRainyDays: [3, 2, 3, 5, 14, 23, 20, 22, 24, 19, 7, 4],
    elevation: 100,
    region: 'Coastal Plain',
  },
  {
    id: 'salto-agua',
    name: 'Salto de Agua',
    latitude: 17.3147,
    longitude: -92.2345,
    annualPrecipitation: 2363,
    dailyAveragePrecipitation: 6.47,
    monthlyPrecipitation: {
      january: 150, february: 94, march: 74, april: 75,
      may: 152, june: 276, july: 186, august: 278,
      september: 377, october: 345, november: 220, december: 136,
    },
    monthlyRainyDays: [15, 11, 10, 11, 17, 24, 21, 24, 26, 25, 20, 14],
    elevation: 500,
    region: 'Northern Jungle',
  },
  {
    id: 'pichucalco',
    name: 'Pichucalco',
    latitude: 17.5431,
    longitude: -92.7519,
    // NASA POWER MERRA-2 — same 0.5° grid cell as Salto de Agua
    annualPrecipitation: 2363,
    dailyAveragePrecipitation: 6.47,
    monthlyPrecipitation: {
      january: 150, february: 94, march: 74, april: 75,
      may: 152, june: 276, july: 186, august: 278,
      september: 377, october: 345, november: 220, december: 136,
    },
    monthlyRainyDays: [15, 11, 10, 11, 17, 24, 21, 24, 26, 25, 20, 14],
    elevation: 280,
    region: 'Northern Lowlands',
  },
  {
    id: 'tenejapa',
    name: 'Tenejapa',
    latitude: 16.9000,
    longitude: -92.5500,
    // WorldClim v2.1
    annualPrecipitation: 1128,
    dailyAveragePrecipitation: 3.09,
    monthlyPrecipitation: {
      january: 55, february: 36, march: 32, april: 37,
      may: 89, june: 151, july: 103, august: 143,
      september: 191, october: 153, november: 85, december: 53,
    },
    monthlyRainyDays: [10, 8, 7, 9, 16, 22, 19, 22, 25, 22, 16, 10],
    elevation: 1600,
    region: 'Highlands',
  },
  {
    id: 'chenalho',
    name: 'Chenalhó',
    latitude: 16.8833,
    longitude: -92.7167,
    // WorldClim v2.1
    annualPrecipitation: 1416,
    dailyAveragePrecipitation: 3.88,
    monthlyPrecipitation: {
      january: 69, february: 45, march: 40, april: 46,
      may: 112, june: 189, july: 129, august: 179,
      september: 242, october: 191, november: 107, december: 67,
    },
    monthlyRainyDays: [10, 8, 7, 9, 16, 22, 19, 22, 25, 22, 16, 10],
    elevation: 1500,
    region: 'Highlands',
  },
  {
    id: 'sitala',
    name: 'Sitala',
    latitude: 17.0167,
    longitude: -92.2833,
    // WorldClim v2.1
    annualPrecipitation: 2116,
    dailyAveragePrecipitation: 5.80,
    monthlyPrecipitation: {
      january: 103, february: 68, march: 59, april: 69,
      may: 168, june: 283, july: 193, august: 268,
      september: 359, october: 286, november: 160, december: 100,
    },
    monthlyRainyDays: [12, 9, 8, 10, 17, 23, 20, 23, 25, 23, 18, 12],
    elevation: 500,
    region: 'Highland-Jungle Transition',
  },
  {
    id: 'berriozabal',
    name: 'Berriozabal',
    latitude: 16.7833,
    longitude: -93.2667,
    // WorldClim v2.1
    annualPrecipitation: 1037,
    dailyAveragePrecipitation: 2.84,
    monthlyPrecipitation: {
      january: 10, february: 8, march: 10, april: 26,
      may: 99, june: 218, july: 161, august: 171,
      september: 207, october: 99, november: 21, december: 7,
    },
    monthlyRainyDays: [3, 2, 3, 5, 12, 21, 18, 20, 22, 15, 5, 2],
    elevation: 1200,
    region: 'Central Depression',
  },
]

export const DEFAULT_LOCATION = CHIAPAS_LOCATIONS[0]

export function getLocationById(id: string): PrecipitationLocation | undefined {
  return CHIAPAS_LOCATIONS.find((loc) => loc.id === id)
}

export function getLocationNames(): Array<{ id: string; name: string }> {
  return CHIAPAS_LOCATIONS.map((loc) => ({ id: loc.id, name: loc.name }))
}

export const CHIAPAS_BOUNDS = {
  southwest: [14.5, -94.0],
  northeast: [18.0, -90.5],
}

export const CHIAPAS_CENTER = [16.75, -92.5]
