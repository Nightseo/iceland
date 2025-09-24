'use client'

import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { itineraryData } from '@/data/itinerary'
import DayPreviewCard from '@/components/DayPreviewCard'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Home() {
  const [activeSection, setActiveSection] = useState('')

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
    <div className="bg-zinc-100">
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
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1);
        }
      `}</style>
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />

      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-zinc-800">🇮🇸 Islandia en Campervan</h1>
          <div className="hidden md:flex space-x-8">
            {[
              { id: 'resumen', label: 'Resumen' },
              { id: 'dias', label: 'Días' },
              { id: 'consejos', label: 'Consejos' },
              { id: 'recursos', label: 'Recursos' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors duration-300 ${
                  activeSection === item.id ? 'text-blue-500' : 'text-zinc-600 hover:text-blue-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <select
              className="bg-white border border-zinc-300 rounded-md py-1 px-2 text-zinc-700"
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

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <section id="intro" className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Tu Aventura Definitiva por Islandia</h2>
          <p className="max-w-3xl mx-auto text-lg text-zinc-600">
            Este itinerario de 12 días está diseñado para sumergirte en la belleza cruda de Islandia. Recorreremos la épica Ring Road en sentido antihorario, priorizando paisajes sobre multitudes y aprovechando la magia del otoño, con altas probabilidades de ver auroras boreales. ¡Prepárate para el viaje de tu vida!
          </p>
        </section>

        <section id="resumen" className="mb-16">
          <h3 className="text-3xl font-bold text-zinc-800 mb-6 text-center">Resumen del Viaje</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
            <div className="card p-6">
              <div className="text-5xl mb-2">🚗</div>
              <h4 className="text-xl font-semibold mb-1">Distancia Total</h4>
              <p className="text-2xl font-bold text-blue-600">~2150 km</p>
            </div>
            <div className="card p-6">
              <div className="text-5xl mb-2">☀️</div>
              <h4 className="text-xl font-semibold mb-1">Horas de Luz (Oct)</h4>
              <p className="text-2xl font-bold text-blue-600">~9-11 horas</p>
            </div>
            <div className="card p-6">
              <div className="text-5xl mb-2">🌌</div>
              <h4 className="text-xl font-semibold mb-1">Prob. Auroras</h4>
              <p className="text-2xl font-bold text-blue-600">¡Muy Alta!</p>
            </div>
          </div>
          <div className="card p-6">
            <h4 className="text-xl font-semibold mb-4 text-center">Estimación de Conducción Diaria (Horas)</h4>
            <div className="relative w-full max-w-4xl mx-auto h-80">
              <Bar data={drivingData} options={chartOptions} />
            </div>
          </div>
        </section>

        <section id="dias" className="mb-16">
          <h3 className="text-3xl font-bold text-zinc-800 mb-6 text-center">Itinerario Completo - 12 Días</h3>
          <p className="text-center text-zinc-600 mb-8 max-w-2xl mx-auto">
            Haz clic en cualquier día para ver todos los detalles, lugares destacados, consejos prácticos y logística completa.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {itineraryData.map((day, index) => (
              <DayPreviewCard key={day.id} day={day} index={index} />
            ))}
          </div>
        </section>

        <section id="recursos" className="mt-16">
          <h3 className="text-3xl font-bold text-zinc-800 mb-6 text-center">Recursos Esenciales</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h4 className="text-xl font-semibold mb-2">🚗 Carreteras y Clima</h4>
              <p className="text-zinc-600">Consulta CADA DÍA: <a href="https://road.is" target="_blank" className="text-blue-600 hover:underline">road.is</a> para el estado de las carreteras, <a href="https://en.vedur.is/" target="_blank" className="text-blue-600 hover:underline">vedur.is</a> para el tiempo (sobre todo el viento), y <a href="https://safetravel.is/" target="_blank" className="text-blue-600 hover:underline">safetravel.is</a> para alertas generales.</p>
            </div>
            <div className="card p-6">
              <h4 className="text-xl font-semibold mb-2">🌌 Auroras Boreales</h4>
              <p className="text-zinc-600">Usa la sección de auroras de <a href="https://en.vedur.is/weather/forecasts/aurora/" target="_blank" className="text-blue-600 hover:underline">vedur.is</a> para ver la previsión de actividad (KP) y el mapa de nubes. La app "My Aurora Forecast" es ideal para recibir alertas.</p>
            </div>
            <div className="card p-6">
              <h4 className="text-xl font-semibold mb-2">🏕️ Campings</h4>
              <p className="text-zinc-600">La app "Park4Night" es tu mejor amiga para encontrar campings abiertos en octubre y leer opiniones recientes. <a href="https://tjalda.is/en/" target="_blank" className="text-blue-600 hover:underline">Tjalda.is</a> es un buen directorio oficial.</p>
            </div>
          </div>
        </section>

        <section id="consejos" className="mt-16">
          <h3 className="text-3xl font-bold text-zinc-800 mb-6 text-center">Consejos Prácticos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h4 className="text-xl font-semibold mb-2">⛽ Repostaje y Comida</h4>
              <p className="text-zinc-600">Nunca dejes que el depósito baje de la mitad. BÓNUS y Kronan son los supermercados más económicos. Usa la tarjeta de descuento de la gasolinera que te den con la camper.</p>
            </div>
            <div className="card p-6">
              <h4 className="text-xl font-semibold mb-2">👕 Ropa</h4>
              <p className="text-zinc-600">Vístete por capas: térmica, polar e impermeable. Imprescindible gorro, guantes y botas de trekking impermeables.</p>
            </div>
            <div className="card p-6">
              <h4 className="text-xl font-semibold mb-2">💰 Flexibilidad</h4>
              <p className="text-zinc-600">El tiempo en Islandia manda. Sé flexible y ten un plan B. La seguridad es lo primero. ¡Disfruta!</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-800 text-zinc-300 mt-12 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024. Plan de Viaje Personalizado. ¡Disfrutad de la aventura!</p>
        </div>
      </footer>
    </div>
  )
}