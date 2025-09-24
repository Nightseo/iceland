'use client'

import Link from 'next/link'
import { Day } from '@/data/itinerary'

interface DayPreviewCardProps {
  day: Day
  index: number
}

export default function DayPreviewCard({ day, index }: DayPreviewCardProps) {
  return (
    <Link href={`/dia/${day.id}`} className="group">
      <div className="card h-full group-hover:scale-[1.02] transition-transform duration-300">
        <div className="relative overflow-hidden">
          <img 
            src={day.mainImage} 
            alt={day.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/400x200/e2e8f0/475569?text=Día+${day.id}`
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Día {index + 1}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
              {day.drivingHours}h conducción
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-blue-600 transition-colors">
            {day.title.split(':')[1]?.trim() || day.title}
          </h3>
          <p className="text-blue-600 font-medium mb-3">{day.subtitle}</p>
          
          <div className="flex items-center text-sm text-zinc-500 mb-3 space-x-4">
            <span className="flex items-center">
              <span className="mr-1">🚗</span>
              {day.distance}
            </span>
            <span className="flex items-center">
              <span className="mr-1">⏱️</span>
              {day.duration}
            </span>
          </div>
          
          <p className="text-zinc-600 text-sm line-clamp-3 mb-4">
            {day.description}
          </p>
          
          <div className="space-y-2">
            <p className="text-xs text-zinc-500 font-semibold">Lugares destacados:</p>
            <ul className="text-xs text-zinc-600">
              {day.highlights.slice(0, 2).map((highlight, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-1 text-blue-500">•</span>
                  <span className="line-clamp-1">{highlight.split(':')[0]}</span>
                </li>
              ))}
              {day.highlights.length > 2 && (
                <li className="text-blue-500 text-xs">
                  +{day.highlights.length - 2} más...
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600 font-medium group-hover:text-blue-700">
              Ver detalles completos →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}