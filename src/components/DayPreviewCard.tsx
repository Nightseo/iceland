'use client'

import Link from 'next/link'
import { Day } from '@/data/itinerary'

interface DayPreviewCardProps {
  day: Day
  index: number
}

export default function DayPreviewCard({ day, index }: DayPreviewCardProps) {
  return (
    <Link href={`/dia/${day.id}`} className="group block">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:transform hover:-translate-y-1">
        
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={day.mainImage} 
            alt={day.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            className="w-full h-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center"
            style={{ display: 'none' }}
          >
            <div className="text-white text-3xl font-bold opacity-80">
              {index + 1}
            </div>
          </div>
          
          {/* Day number */}
          <div className="absolute top-3 left-3">
            <div className="bg-black/60 backdrop-blur text-white px-2 py-1 rounded-lg text-xs font-medium">
              Día {index + 1}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 leading-snug">
            {day.title.split(':')[1]?.trim() || day.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-1">
            {day.subtitle}
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-300">
              <span className="mr-2">🚗</span>
              <span className="font-medium">{day.distance}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <span className="mr-2">⏱️</span>
              <span className="font-medium">{day.drivingHours}h</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}