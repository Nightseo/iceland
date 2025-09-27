'use client'

import { useParams, useRouter } from 'next/navigation'
import { itineraryData } from '@/data/itinerary'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function getMapUrl(dayId: string, route: string) {
  // Configuraciones específicas por día para mejor zoom y centrado
  const mapConfigs: Record<string, { bbox: string; center: string }> = {
    '0-1': {
      bbox: '-22.0,63.9,-21.4,64.1', // Keflavík - Hveragerði más zoom
      center: '64.0,-21.7'
    },
    '2': {
      bbox: '-21.5,63.9,-20.2,64.4', // Círculo Dorado más zoom
      center: '64.15,-20.85'
    },
    '3': {
      bbox: '-19.5,63.4,-18.8,63.9', // Costa Sur más zoom
      center: '63.65,-19.15'
    },
    '4': {
      bbox: '-18.2,63.7,-16.5,64.3', // Vík - Skaftafell con Fjaðrárgljúfur
      center: '63.98,-17.35'
    },
    '5': {
      bbox: '-16.8,63.9,-15.5,64.3', // Skaftafell - Höfn con lagunas glaciares
      center: '64.1,-16.15'
    },
    '6': {
      bbox: '-15.5,64.0,-13.5,65.5', // Höfn - Egilsstaðir (Fiordos del Este)
      center: '64.75,-14.5'
    },
    '7': {
      bbox: '-17.5,65.0,-15.0,66.0', // Egilsstaðir - Mývatn (incluye Dettifoss)
      center: '65.5,-16.25'
    },
    '8': {
      bbox: '-18.5,65.3,-16.5,66.0', // Mývatn - Akureyri (incluye Goðafoss)
      center: '65.65,-17.5'
    },
    '9': {
      bbox: '-22.0,64.0,-18.0,66.0', // Akureyri - Borgarnes (travesía norte-oeste)
      center: '65.0,-20.0'
    },
    '10': {
      bbox: '-24.5,64.6,-22.5,65.2', // Snæfellsnes península completa
      center: '64.9,-23.5'
    },
    '11': {
      bbox: '-22.8,63.8,-21.4,64.2', // Península Reykjanes completa
      center: '64.0,-22.1'
    },
    '12': {
      bbox: '-22.8,63.8,-21.4,64.2', // Última mañana Reykjanes + aeropuerto
      center: '64.0,-22.1'
    },
    // Configuración por defecto
    'default': {
      bbox: '-22.0,63.4,-18.0,64.4', // Sur de Islandia general
      center: '63.9,-20.0'
    }
  }
  
  const config = mapConfigs[dayId] || mapConfigs['default']
  // Usar OpenStreetMap con marcador en el centro
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${config.bbox}&layer=mapnik&marker=${config.center}`
  console.log(`Map URL for day ${dayId}:`, osmUrl)
  return osmUrl
}

function extractLocationLink(highlight: string): { text: string; location?: string } {
  // Buscar patrones de lugares específicos al inicio del highlight
  const locationPatterns = [
    { pattern: /^([^:]+):\s*(.+)/, group: 1 }, // "Lugar: descripción"
    { pattern: /^([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\/\s-]+(?:foss|fjall|vatn|nes|gja|karð|holt|fell|dalur|kirkja))[:\s]/, group: 1 }, // Nombres islandeses
    { pattern: /^(Stokksnes\/Vestrahorn|Dimmuborgir|Hverfjall|Grjótagjá|Goðafoss|Dettifoss|Námaskarð|Jökulsárlón|Diamond Beach|Seljalandsfoss|Skógafoss|Gullfoss|Geysir|Þingvellir)/, group: 1 }
  ]
  
  for (const { pattern, group } of locationPatterns) {
    const match = highlight.match(pattern)
    if (match && match[group]) {
      const location = match[group].trim().replace(/[:\s]*$/, '') // Quitar : y espacios al final
      return {
        text: highlight,
        location: location
      }
    }
  }
  
  return { text: highlight }
}

export default function DayDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dayId = params.id as string
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  const day = itineraryData.find(d => d.id === dayId)
  const currentIndex = itineraryData.findIndex(d => d.id === dayId)
  const prevDay = currentIndex > 0 ? itineraryData[currentIndex - 1] : null
  const nextDay = currentIndex < itineraryData.length - 1 ? itineraryData[currentIndex + 1] : null

  if (!day) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">Día no encontrado</h1>
          <Link href="/" className="text-gray-300 hover:text-white font-medium">
            ← Volver al itinerario
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Navigation Header */}
      <header className="bg-white/5 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-xl">🇮🇸</span> Islandia
          </Link>
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 px-3 py-1 rounded text-sm">
              <span className="text-gray-300">
                Día <span className="text-white font-semibold">{currentIndex + 1}</span> de {itineraryData.length}
              </span>
            </div>
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white font-medium transition-colors text-sm"
            >
              ← Volver
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={day.mainImage} 
              alt={day.title}
              className="w-full h-64 md:h-72 object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div 
              className="w-full h-64 md:h-72 bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center"
              style={{ display: 'none' }}
            >
              <div className="text-white text-5xl font-bold opacity-80">
                {currentIndex + 1}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
              <div className="p-6 text-white w-full">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{day.title}</h1>
                <p className="text-base md:text-lg mb-4 opacity-90">{day.subtitle}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-white/20 px-2 py-1 rounded text-white">
                    📍 {day.route}
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded text-white">
                    🚗 {day.distance}
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded text-white">
                    ⏱️ {day.duration}
                  </span>
                  <span className="bg-white/30 px-2 py-1 rounded text-white font-medium">
                    🕐 {day.drivingHours}h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - First on mobile, left and sticky on desktop */}
          <div className="lg:order-1 lg:sticky lg:top-24 lg:h-fit space-y-8">
            {/* Day Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Información del día</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Distancia:</span>
                  <span className="font-semibold text-white">{day.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duración:</span>
                  <span className="font-semibold text-white">{day.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Horas conducción:</span>
                  <span className="font-semibold text-white">{day.drivingHours}h</span>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">📍 Mapa de ubicaciones</h3>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                <iframe
                  src={getMapUrl(day.id, day.route)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  className="rounded-lg"
                  loading="lazy"
                  title={`Mapa del ${day.title}`}
                  onError={(e) => {
                    console.error('Error loading map iframe:', e);
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                ></iframe>
                <div 
                  className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <div className="text-sm">Mapa no disponible</div>
                    <div className="text-xs mt-1">Ver enlace de Google Maps abajo</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <a 
                  href={`https://www.google.com/maps/search/${encodeURIComponent(day.route.split('→').join(' to '))}+Iceland`}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>

            {/* Logistics */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">🛒 Logística</h3>
              <div className="text-gray-300 text-sm leading-relaxed itinerary-content" dangerouslySetInnerHTML={{ __html: day.logistics }}></div>
            </div>

            {/* Navigation */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Navegación</h3>
              <div className="space-y-3">
                {prevDay && (
                  <Link 
                    href={`/dia/${prevDay.id}`}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    <span>← Día anterior</span>
                  </Link>
                )}
                <Link 
                  href="/"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <span>🏠 Ver todos los días</span>
                </Link>
                {nextDay && (
                  <Link 
                    href={`/dia/${nextDay.id}`}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    <span>Día siguiente →</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 lg:order-2 space-y-8">
            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Descripción del día</h2>
              <p className="text-gray-300 leading-relaxed">{day.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Lugares destacados</h2>
              <ul className="space-y-3">
                {day.highlights.map((highlight, index) => {
                  const { text, location } = extractLocationLink(highlight)
                  return (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-blue-400 text-lg flex-shrink-0">📍</span>
                      <div className="text-gray-300 leading-relaxed flex-1">
                        {location ? (
                          <div>
                            <a 
                              href={`https://www.google.com/maps/search/${encodeURIComponent(location + ' Iceland')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 underline transition-colors font-medium"
                            >
                              {location}
                            </a>
                            {text.includes(':') && (
                              <span className="text-gray-300">: {text.split(':', 2)[1]?.trim()}</span>
                            )}
                          </div>
                        ) : (
                          <span>{text}</span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Images Gallery */}
            {day.images && day.images.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Galería de imágenes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {day.images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-xl">
                      <img 
                        src={image} 
                        alt={`${day.title} - imagen ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-full h-48 bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center"
                        style={{ display: 'none' }}
                      >
                        <div className="text-white text-3xl font-bold opacity-80">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Information */}
            {day.detailedInfo && (
              <div className="bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-purple-300 mb-4">📋 Información Detallada</h2>
                <div className="text-gray-300 leading-relaxed itinerary-content" dangerouslySetInnerHTML={{ __html: day.detailedInfo }}></div>
              </div>
            )}

            {/* Tips and Hidden Gems */}
            {(day.tips || day.hiddenGems) && (
              <div className="space-y-8">
                {day.tips && (
                  <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-blue-300 mb-4">💡 Consejos del día</h2>
                    <div className="text-gray-300 leading-relaxed itinerary-content" dangerouslySetInnerHTML={{ __html: day.tips }}></div>
                  </div>
                )}
                
                {day.hiddenGems && (
                  <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-emerald-300 mb-4">🤫 Joyas escondidas</h2>
                    <div className="text-gray-300 leading-relaxed itinerary-content" dangerouslySetInnerHTML={{ __html: day.hiddenGems }}></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Day Navigation Footer */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          {prevDay ? (
            <Link 
              href={`/dia/${prevDay.id}`}
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <div>
                <div className="font-semibold">Día anterior</div>
                <div className="text-sm text-gray-500">{prevDay.title.split(':')[0]}</div>
              </div>
            </Link>
          ) : <div></div>}
          
          {nextDay ? (
            <Link 
              href={`/dia/${nextDay.id}`}
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group text-right"
            >
              <div>
                <div className="font-semibold">Día siguiente</div>
                <div className="text-sm text-gray-500">{nextDay.title.split(':')[0]}</div>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ) : <div></div>}
        </div>
      </main>
    </div>
  )
}