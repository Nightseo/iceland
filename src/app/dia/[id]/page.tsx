'use client'

import { useParams, useRouter } from 'next/navigation'
import { itineraryData } from '@/data/itinerary'
import Link from 'next/link'
import { useState } from 'react'

export default function DayDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dayId = params.id as string
  
  const day = itineraryData.find(d => d.id === dayId)
  const currentIndex = itineraryData.findIndex(d => d.id === dayId)
  const prevDay = currentIndex > 0 ? itineraryData[currentIndex - 1] : null
  const nextDay = currentIndex < itineraryData.length - 1 ? itineraryData[currentIndex + 1] : null

  if (!day) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-800 mb-4">Día no encontrado</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-100 min-h-screen">
      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f4f4f5;
          color: #27272a;
        }
        html {
          scroll-behavior: smooth;
        }
        .card {
          background-color: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
        }
      `}</style>
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Navigation Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold text-zinc-800 hover:text-blue-600 transition-colors">
            🇮🇸 Islandia en Campervan
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-zinc-500">
              Día {currentIndex + 1} de {itineraryData.length}
            </span>
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Ver todos los días
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="card mb-8">
          <div className="relative">
            <img 
              src={day.mainImage} 
              alt={day.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/800x400/e2e8f0/475569?text=Día+${day.id}`
              }}
            />
            <div className="absolute inset-0 bg-black/30 flex items-end">
              <div className="p-6 md:p-8 text-white w-full">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{day.title}</h1>
                <p className="text-xl md:text-2xl mb-4">{day.subtitle}</p>
                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                  <span className="bg-white/20 px-3 py-1 rounded-full">📍 {day.route}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">🚗 {day.distance}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">⏱️ {day.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Descripción del día</h2>
              <p className="text-zinc-700 text-lg leading-relaxed">{day.description}</p>
            </div>

            {/* Highlights */}
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Lugares destacados</h2>
              <ul className="space-y-3">
                {day.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-blue-600 text-xl">📍</span>
                    <span className="text-zinc-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Images Gallery */}
            {day.images && day.images.length > 0 && (
              <div className="card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-zinc-800 mb-4">Galería de imágenes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {day.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${day.title} - imagen ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/400x200/e2e8f0/475569?text=Imagen+${index + 1}`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tips and Hidden Gems */}
            {(day.tips || day.hiddenGems) && (
              <div className="space-y-6">
                {day.tips && (
                  <div className="card p-6 md:p-8 bg-blue-50 border border-blue-200">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">💡 Consejos del día</h2>
                    <p className="text-blue-700">{day.tips}</p>
                  </div>
                )}
                
                {day.hiddenGems && (
                  <div className="card p-6 md:p-8 bg-emerald-50 border border-emerald-200">
                    <h2 className="text-2xl font-bold text-emerald-800 mb-4">🤫 Joyas escondidas</h2>
                    <p className="text-emerald-700">{day.hiddenGems}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Day Info */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-zinc-800 mb-4">Información del día</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Distancia:</span>
                  <span className="font-semibold">{day.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Duración:</span>
                  <span className="font-semibold">{day.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Horas conducción:</span>
                  <span className="font-semibold">{day.drivingHours}h</span>
                </div>
              </div>
            </div>

            {/* Logistics */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-zinc-800 mb-4">🛒 Logística</h3>
              <p className="text-zinc-700 text-sm">{day.logistics}</p>
            </div>

            {/* Navigation */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-zinc-800 mb-4">Navegación</h3>
              <div className="space-y-3">
                {prevDay && (
                  <Link 
                    href={`/dia/${prevDay.id}`}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>← Día anterior</span>
                  </Link>
                )}
                <Link 
                  href="/"
                  className="flex items-center space-x-2 text-zinc-600 hover:text-zinc-800 transition-colors"
                >
                  <span>🏠 Ver todos los días</span>
                </Link>
                {nextDay && (
                  <Link 
                    href={`/dia/${nextDay.id}`}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Día siguiente →</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Day Navigation Footer */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-zinc-200">
          {prevDay ? (
            <Link 
              href={`/dia/${prevDay.id}`}
              className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <div>
                <div className="font-semibold">Día anterior</div>
                <div className="text-sm">{prevDay.title.split(':')[0]}</div>
              </div>
            </Link>
          ) : <div></div>}
          
          {nextDay ? (
            <Link 
              href={`/dia/${nextDay.id}`}
              className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-colors group text-right"
            >
              <div>
                <div className="font-semibold">Día siguiente</div>
                <div className="text-sm">{nextDay.title.split(':')[0]}</div>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ) : <div></div>}
        </div>
      </main>
    </div>
  )
}