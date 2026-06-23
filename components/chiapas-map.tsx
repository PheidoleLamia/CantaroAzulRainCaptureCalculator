'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {
  CHIAPAS_LOCATIONS,
  CHIAPAS_CENTER,
  PrecipitationLocation,
} from '@/lib/chiapas-locations'

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const selectedIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [33, 54],
  iconAnchor: [16, 54],
  popupAnchor: [1, -45],
  shadowSize: [41, 41],
})

interface ChiapasMapProps {
  selectedLocationId?: string
  onLocationSelect: (location: PrecipitationLocation) => void
}

export function ChiapasMap({ selectedLocationId, onLocationSelect }: ChiapasMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-96 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
      <MapContainer
        center={CHIAPAS_CENTER as [number, number]}
        zoom={9}
        style={{ height: '400px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {CHIAPAS_LOCATIONS.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={selectedLocationId === location.id ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => {
                onLocationSelect(location)
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{location.name}</p>
                <p className="text-xs text-gray-600">
                  {location.annualPrecipitation} mm/year
                </p>
                <p className="text-xs text-gray-600">{location.region}</p>
                <p className="mt-1 text-xs">
                  Elevation: {location.elevation}m
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
