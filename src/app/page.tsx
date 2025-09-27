'use client'

import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { itineraryData } from '@/data/itinerary'
import DayPreviewCard from '@/components/DayPreviewCard'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Home() {
  const [activeSection, setActiveSection] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id') || ''
        }
      })
      
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const drivingData = {
    labels: itineraryData.map((_, index) => `D${index + 1}`),
    datasets: [
      {
        label: 'Horas de Conducción Estimadas',
        data: itineraryData.map(day => day.drivingHours),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Horas',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y} horas`
          },
        },
      },
    },
  }

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        
        :root {
          --gradient-primary: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          --gradient-accent: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
          --gradient-surface: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          --blur-glass: blur(20px) saturate(180%);
          --shadow-luxury: 0 32px 64px -12px rgba(0, 0, 0, 0.25);
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
          background: var(--gradient-primary);
          color: #ffffff;
          margin: 0;
          padding: 0;
          font-weight: 400;
          line-height: 1.7;
          letter-spacing: -0.01em;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: var(--blur-glass);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: var(--shadow-luxury), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }
        
        .glass-morphism:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(79, 70, 229, 0.3);
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 40px 80px -12px rgba(79, 70, 229, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }
        
        .typography-display {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.04em;
        }
        
        .text-gradient-primary {
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.3); }
          100% { box-shadow: 0 0 40px rgba(79, 70, 229, 0.6); }
        }
      `}</style>
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />

      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-xl">🇮🇸</span> Islandia
          </h1>
          <div className="hidden md:flex items-center space-x-6">
            {[
              { id: 'hero', label: 'Inicio' },
              { id: 'dias', label: 'Itinerario' },
              { id: 'recursos', label: 'Recursos' },
              { id: 'consejos', label: 'Consejos' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <select
              className="bg-white/5 text-white py-1 px-3 text-sm rounded border border-white/10 focus:outline-none"
              onChange={(e) => scrollToSection(e.target.value)}
            >
              <option value="resumen">Resumen</option>
              <option value="dias">Días</option>
              <option value="consejos">Consejos</option>
              <option value="recursos">Recursos</option>
            </select>
          </div>
        </nav>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section id="hero" className="py-20 px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Itinerario por <span className="text-gradient-primary">Islandia</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              12 días por la Ring Road con altas probabilidades de auroras boreales
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-xl font-bold text-white mb-1">2,150 km</div>
                <div className="text-gray-400 text-xs">Ring Road</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white mb-1">9-11h</div>
                <div className="text-gray-400 text-xs">Luz diaria</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white mb-1">Alta</div>
                <div className="text-gray-400 text-xs">Prob. auroras</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white mb-1">4.5h</div>
                <div className="text-gray-400 text-xs">Máx. conducción</div>
              </div>
            </div>
            
            <button 
              onClick={() => scrollToSection('dias')}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 text-sm"
            >
              Ver itinerario
            </button>
          </div>
        </section>

        {/* Chart Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Horas de Conducción por Día</h3>
            <div className="h-64">
              <Bar data={drivingData} options={{
                ...chartOptions,
                scales: {
                  x: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                  },
                  y: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    title: {
                      display: true,
                      text: 'Horas',
                      color: '#9ca3af'
                    }
                  }
                }
              }} />
            </div>
          </div>
        </section>

        <section id="dias" className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Itinerario Completo
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              12 días planificados con lugares destacados y logística detallada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {itineraryData.map((day, index) => (
              <DayPreviewCard key={day.id} day={day} index={index} />
            ))}
          </div>
        </section>

        <section id="recursos" className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Recursos Útiles</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Enlaces esenciales para un viaje seguro</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-300">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-white mb-4">Carreteras y Clima</h3>
              <div className="space-y-3 text-sm">
                <a href="https://road.is" target="_blank" className="block text-gray-300 hover:text-white transition-colors">
                  road.is - Estado carreteras
                </a>
                <a href="https://en.vedur.is/" target="_blank" className="block text-gray-300 hover:text-white transition-colors">
                  vedur.is - Clima oficial
                </a>
                <a href="https://safetravel.is/" target="_blank" className="block text-gray-300 hover:text-white transition-colors">
                  safetravel.is - Alertas
                </a>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-300">
              <div className="text-4xl mb-4">🌌</div>
              <h3 className="text-xl font-bold text-white mb-4">Auroras Boreales</h3>
              <div className="space-y-3 text-sm">
                <a href="https://en.vedur.is/weather/forecasts/aurora/" target="_blank" className="block text-gray-300 hover:text-white transition-colors">
                  Aurora Forecast - KP oficial
                </a>
                <div className="text-gray-300">
                  My Aurora Forecast - App
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-300">
              <div className="text-4xl mb-4">🏕️</div>
              <h3 className="text-xl font-bold text-white mb-4">Campings</h3>
              <div className="space-y-3 text-sm">
                <div className="text-gray-300">
                  Park4Night - App spots
                </div>
                <a href="https://tjalda.is/en/" target="_blank" className="block text-gray-300 hover:text-white transition-colors">
                  tjalda.is - Directorio oficial
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="consejos" className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Consejos Prácticos</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Lo esencial para disfrutar tu aventura</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-4">⛽</div>
                <h3 className="text-xl font-bold text-white mb-3">Combustible</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Mantén el depósito &gt;50%. BÓNUS y Kronan son supermercados económicos.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">👕</div>
                <h3 className="text-xl font-bold text-white mb-3">Ropa</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Capas: térmica + polar + impermeable. Imprescindible gorro, guantes y botas.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-white mb-3">Mentalidad</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  El clima manda en Islandia. Sé flexible, ten plan B. Seguridad primero.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-16 text-center">
        <div className="border-t border-white/10 pt-8">
          <p className="text-gray-500 text-sm">&copy; 2024 - Plan de Viaje Personalizado</p>
        </div>
      </footer>
    </div>
  )
}