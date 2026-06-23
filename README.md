# Cántaro Azul Rainwater Harvesting Calculator

An interactive web calculator for simulating rainwater harvesting systems across 14 communities in Chiapas, Mexico. Built in partnership with [Cántaro Azul](https://www.cantaroazul.org/).

## Features

- Interactive map with 14 Chiapas locations
- WorldClim v2.1 precipitation data (1970–2000 climate normals)
- Daily tank simulation with rainy-day distribution model
- Monthly charts: volume captured vs demand, and overflow
- English / Spanish language toggle
- Cántaro Azul branding and design

## Getting Started

```bash
git clone https://github.com/PheidoleLamia/CantaroAzulRainCaptureCalculator.git
cd CantaroAzulRainCaptureCalculator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building a Static File

To export as a standalone folder that can be shared without a server:

```bash
npm run build
```

This produces an `out/` folder. Open `out/index.html` in any browser. An internet connection is needed for the map tiles (OpenStreetMap) and fonts (Google Fonts).

## Data Sources

- Precipitation: [WorldClim v2.1](https://worldclim.org/data/worldclim21.html) monthly climate normals
- Map tiles: OpenStreetMap contributors
