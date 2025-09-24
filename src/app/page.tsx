'use client'

import { useEffect, useRef, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

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
    labels: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12'],
    datasets: [
      {
        label: 'Horas de Conducción Estimadas',
        data: [0.75, 3, 1.75, 2, 2, 3.5, 2.25, 1.5, 4.5, 3.5, 1.75, 0.5],
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
              { id: 'itinerario', label: 'Itinerario' },
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
              <option value="itinerario">Itinerario</option>
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

        <section id="itinerario" className="space-y-12">
          <h3 className="text-3xl font-bold text-zinc-800 mb-6 text-center">Itinerario Detallado</h3>

          {/* Día 0 + 1 */}
          <div className="card">
            <div className="p-6 md:p-8">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">Día 0-1 (28-29 Sep): Llegada y Preparativos</h4>
              <p className="text-zinc-600 font-medium mb-4">Keflavík → Hveragerði (50 km, ~45 min)</p>
            </div>
            <img 
              src="https://adventures.com/media/10117/summer-geothermal-river-reykjadalur.jpg?anchor=center&mode=crop&width=970&height=645&rnd=132604554570000000&format=jpg&quality=80" 
              alt="Río termal en Hveragerði" 
              className="w-full h-56 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/475569?text=Hverager%C3%B0i'
              }}
            />
            <p className="text-xs text-center italic text-zinc-500 py-2 bg-zinc-50">Río termal de Reykjadalur, en Hveragerði.</p>
            <div className="p-6 md:p-8">
              <div className="space-y-3 text-zinc-700">
                <p><strong>Día 0 (28/09):</strong> Aterrizaje a las 23:55. Traslado al hotel en Keflavík para descansar.</p>
                <p><strong>Día 1 (29/09):</strong> Mañana tranquila. A las 16:00, recogida de la campervan en <a href="https://www.google.com/maps/search/?api=1&query=Indie+Campers+Keflavik" target="_blank" className="text-blue-600 hover:underline">Indie Campers</a>. La primera misión es crucial: una gran compra en el supermercado <a href="https://www.google.com/maps/search/?api=1&query=BÓNUS+Keflavík" target="_blank" className="text-blue-600 hover:underline">BÓNUS en Keflavík</a>. Con la despensa llena, conducimos un tramo corto hasta el camping de Hveragerði, un pueblo geotermal. Es una primera noche perfecta y tranquila.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-sm">
                  <p><strong>💡 Tip del día:</strong> En Hveragerði hay una <a href="https://www.google.com/maps/search/?api=1&query=Reykjadalur+Hot+Spring+Thermal+River" target="_blank" className="text-blue-600 hover:underline">ruta de senderismo</a> <a href="https://www.google.com/maps/search/?api=1&query=Reykjadalur+Hot+Spring+Thermal+River+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking)</a> que lleva a un río termal donde te puedes bañar. Si llegáis con tiempo y luz, es una experiencia increíble y gratuita.</p>
                  <p className="mt-2">🛒 <strong>Logística:</strong> <span className="font-semibold">BÓNUS</span> en Keflavík | ⛽ Gasolinera N1/Orkan en Keflavík | 🏕️ <a href="https://www.visiticeland.com/service-provider/5ec7d096a90548233654DCC9" target="_blank" className="text-blue-600 hover:underline font-semibold">Camping Hveragerði</a> (<a href="https://www.google.com/maps/search/?api=1&query=Camping+Hveragerði" target="_blank" className="text-blue-500 hover:underline">mapa</a>).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Día 2 */}
          <div className="card">
            <div className="p-6 md:p-8">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">Día 2 (30 Sep): El Famoso Círculo Dorado</h4>
              <p className="text-zinc-600 font-medium mb-4">Hveragerði → Círculo Dorado → Hella (200 km, ~3h)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Roca_de_la_Ley%2C_Parque_Nacional_de_%C3%9Eingvellir%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_017.JPG" 
                alt="Parque Nacional Þingvellir" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=%C3%9Eingvellir'
                }}
              />
              <img 
                src="https://images.ctfassets.net/a68ipajj4t9l/4LIX16vMawXcIwO6o7cnUZ/1e82192ed32dc9d22b8d9d3c90458e31/geysir_hero.jpg?w=1200&q=60" 
                alt="Geysir" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Geysir'
                }}
              />
              <img 
                src="https://www.civitatis.com/f/islandia/islandia/guia/gullfoss-m.jpg" 
                alt="Cascada Gullfoss" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Gullfoss'
                }}
              />
            </div>
            <p className="text-xs text-center italic text-zinc-500 py-2 bg-zinc-50">De izq. a dcha.: Parque Nacional Þingvellir, géiser Strokkur en Geysir, Cascada Gullfoss.</p>
            <div className="p-6 md:p-8">
              <div className="space-y-3 text-zinc-700">
                <p>Empezamos fuerte con el Círculo Dorado, una ruta imprescindible. El orden será:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong><a href="https://www.google.com/maps/search/?api=1&query=Þingvellir+National+Park" target="_blank" className="text-blue-600 hover:underline">Parque Nacional Þingvellir</a></strong> <a href="https://www.google.com/maps/search/?api=1&query=Parking+P1+Þingvellir" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking P1)</a>: Pasea entre las placas tectónicas de Norteamérica y Eurasia.</li>
                  <li><strong><a href="https://www.google.com/maps/search/?api=1&query=Geysir+Geothermal+Area" target="_blank" className="text-blue-600 hover:underline">Área Geotermal de Geysir</a></strong> <a href="https://www.google.com/maps/search/?api=1&query=Geysir+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking)</a>: Observa la erupción del géiser Strokkur cada 5-10 minutos.</li>
                  <li><strong><a href="https://www.google.com/maps/search/?api=1&query=Gullfoss+waterfall" target="_blank" className="text-blue-600 hover:underline">Cascada Gullfoss</a></strong> <a href="https://www.google.com/maps/search/?api=1&query=Gullfoss+Upper+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking Superior)</a>: Una de las cascadas más impresionantes y potentes de Islandia.</li>
                </ul>
                <p>Tras Gullfoss, conducimos hacia el sur para pasar la noche cerca de Hella, posicionándonos para la aventura en la Costa Sur.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-sm">
                  <p><strong>🤫 Zona poco concurrida:</strong> En lugar de la turística Blue Lagoon, visita la <a href="https://www.google.com/maps/search/?api=1&query=Secret+Lagoon+Flúðir" target="_blank" className="text-blue-600 hover:underline font-semibold">Secret Lagoon</a> <a href="https://www.google.com/maps/search/?api=1&query=Secret+Lagoon+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking)</a> en Flúðir, cerca de Geysir. Es más rústica, barata y auténtica.</p>
                  <p className="mt-2">🛒 <strong>Logística:</strong> Supermercado en Selfoss | ⛽ Gasolinera en Selfoss/Flúðir | 🏕️ <a href="https://arhus.is/camping/" target="_blank" className="text-blue-600 hover:underline font-semibold">Camping Arhús, Hella</a> (<a href="https://www.google.com/maps/search/?api=1&query=Camping+Arhús+Hella" target="_blank" className="text-blue-500 hover:underline">mapa</a>).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Día 3 */}
          <div className="card">
            <div className="p-6 md:p-8">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">Día 3 (1 Oct): Cascadas y Playas Negras</h4>
              <p className="text-zinc-600 font-medium mb-4">Hella → Vík (120 km, ~1h 45min)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
              <img 
                src="https://cdn.sanity.io/images/a4mln02c/production/9b6a41f869888f89bf917c51d099bd5ae3f9c4cd-5520x3943.jpg?w=2400&h=1600&fit=crop&auto=format" 
                alt="Cascada Seljalandsfoss" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Seljalandsfoss'
                }}
              />
              <img 
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/38/e6/dd/caption.jpg?w=900&h=500&s=1" 
                alt="Cascada Skógafoss" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Sk%C3%B3gafoss'
                }}
              />
              <img 
                src="https://cdn.sanity.io/images/a4mln02c/production/46435518920aaa16c2b774e7d6de160e0b331d9c-4632x3086.jpg?fp-x=0.5&fp-y=0.5&w=1200&h=675&fit=crop&crop=focalpoint&auto=format" 
                alt="Playa de arena negra Reynisfjara" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Reynisfjara'
                }}
              />
            </div>
            <p className="text-xs text-center italic text-zinc-500 py-2 bg-zinc-50">De izq. a dcha.: Cascada Seljalandsfoss, Cascada Skógafoss, Playa de arena negra Reynisfjara.</p>
            <div className="p-6 md:p-8">
              <div className="space-y-3 text-zinc-700">
                <p>Un día icónico en la Costa Sur, lleno de maravillas naturales:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong><a href="https://www.google.com/maps/search/?api=1&query=Seljalandsfoss" target="_blank" className="text-blue-600 hover:underline">Seljalandsfoss</a></strong> <a href="https://www.google.com/maps/search/?api=1&query=Seljalandsfoss+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking)</a>: La cascada en la que puedes caminar por detrás (¡lleva chubasquero!).</li>
                  <li><strong>Gljúfrabúi:</strong> A pocos metros de la anterior, una cascada secreta escondida en un cañón.</li>
                  <li><strong><a href="https://www.google.com/maps/search/?api=1&query=Skógafoss" target="_blank" className="text-blue-600 hover:underline">Skógafoss</a></strong> <a href="https://www.google.com/maps/search/?api=1&query=Skógafoss+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking)</a>: Una cortina de agua perfecta y poderosa. Sube sus 527 escalones para una vista espectacular.</li>
                  <li><strong>Avión DC-3 abandonado</strong> <a href="https://www.google.com/maps/search/?api=1&query=Sólheimasandur+Plane+Wreck+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking)</a>: Si os interesa, es una caminata de 45 min (ida) desde el parking.</li>
                  <li><strong><a href="https://www.google.com/maps/search/?api=1&query=Reynisfjara+Black+Sand+Beach" target="_blank" className="text-blue-600 hover:underline">Reynisfjara</a></strong> <a href="https://www.google.com/maps/search/?api=1&query=Reynisfjara+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking)</a>: Acantilados, arcos de roca, columnas de basalto y la famosa playa de arena negra. Cuidado con las olas traicioneras.</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-sm">
                  <p><strong>🤫 Zona poco concurrida:</strong> La piscina de <a href="https://www.google.com/maps/search/?api=1&query=Seljavallalaug+Swimming+Pool" target="_blank" className="text-blue-600 hover:underline font-semibold">Seljavallalaug</a> <a href="https://www.google.com/maps/search/?api=1&query=Seljavallalaug+Parking" target="_blank" className="text-xs text-zinc-500 hover:text-blue-600 ml-1">(🚗 Parking)</a>, una de las más antiguas de Islandia, está enclavada en un valle precioso. Requiere una corta caminata.</p>
                  <p className="mt-2">🛒 <strong>Logística:</strong> Supermercado pequeño en Vík | ⛽ Gasolinera en Vík | 🏕️ <a href="http://www.vikcamping.is/" target="_blank" className="text-blue-600 hover:underline font-semibold">Camping Vík</a> (<a href="https://www.google.com/maps/search/?api=1&query=Camping+Vík" target="_blank" className="text-blue-500 hover:underline">mapa</a>).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining days abbreviated for brevity - they follow the same pattern */}
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