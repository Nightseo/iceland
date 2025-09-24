export interface Day {
  id: string
  title: string
  subtitle: string
  route: string
  distance: string
  duration: string
  drivingHours: number
  mainImage: string
  images?: string[]
  description: string
  highlights: string[]
  tips: string
  logistics: string
  hiddenGems?: string
}

export const itineraryData: Day[] = [
  {
    id: '0-1',
    title: 'Día 0-1 (28-29 Sep): Llegada y Preparativos',
    subtitle: 'Keflavík → Hveragerði',
    route: 'Keflavík → Hveragerði',
    distance: '50 km',
    duration: '~45 min',
    drivingHours: 0.75,
    mainImage: 'https://adventures.com/media/10117/summer-geothermal-river-reykjadalur.jpg?anchor=center&mode=crop&width=970&height=645&rnd=132604554570000000&format=jpg&quality=80',
    description: 'Día 0 (28/09): Aterrizaje a las 23:55. Traslado al hotel en Keflavík para descansar. Día 1 (29/09): Mañana tranquila. A las 16:00, recogida de la campervan.',
    highlights: [
      'Recogida de campervan en Indie Campers',
      'Gran compra en BÓNUS Keflavík',
      'Primera noche en camping de Hveragerði',
      'Pueblo geotermal perfecto para adaptarse'
    ],
    tips: 'En Hveragerði hay una ruta de senderismo que lleva a un río termal donde te puedes bañar. Si llegáis con tiempo y luz, es una experiencia increíble y gratuita.',
    logistics: 'BÓNUS en Keflavík | ⛽ Gasolinera N1/Orkan en Keflavík | 🏕️ Camping Hveragerði'
  },
  {
    id: '2',
    title: 'Día 2 (30 Sep): El Famoso Círculo Dorado',
    subtitle: 'Hveragerði → Círculo Dorado → Hella',
    route: 'Hveragerði → Círculo Dorado → Hella',
    distance: '200 km',
    duration: '~3h',
    drivingHours: 3,
    mainImage: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Roca_de_la_Ley%2C_Parque_Nacional_de_%C3%9Eingvellir%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_017.JPG',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fc/Roca_de_la_Ley%2C_Parque_Nacional_de_%C3%9Eingvellir%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_017.JPG',
      'https://images.ctfassets.net/a68ipajj4t9l/4LIX16vMawXcIwO6o7cnUZ/1e82192ed32dc9d22b8d9d3c90458e31/geysir_hero.jpg?w=1200&q=60',
      'https://www.civitatis.com/f/islandia/islandia/guia/gullfoss-m.jpg'
    ],
    description: 'Empezamos fuerte con el Círculo Dorado, una ruta imprescindible que incluye los tres sitios más icónicos de Islandia.',
    highlights: [
      'Parque Nacional Þingvellir: Placas tectónicas de Norteamérica y Eurasia',
      'Área Geotermal de Geysir: Géiser Strokkur cada 5-10 minutos',
      'Cascada Gullfoss: Una de las más impresionantes de Islandia'
    ],
    tips: 'Tras Gullfoss, conducimos hacia el sur para posicionarnos para la Costa Sur.',
    logistics: 'Supermercado en Selfoss | ⛽ Gasolinera en Selfoss/Flúðir | 🏕️ Camping Arhús, Hella',
    hiddenGems: 'En lugar de la turística Blue Lagoon, visita la Secret Lagoon en Flúðir, cerca de Geysir. Es más rústica, barata y auténtica.'
  },
  {
    id: '3',
    title: 'Día 3 (1 Oct): Cascadas y Playas Negras',
    subtitle: 'Hella → Vík',
    route: 'Hella → Vík',
    distance: '120 km',
    duration: '~1h 45min',
    drivingHours: 1.75,
    mainImage: 'https://cdn.sanity.io/images/a4mln02c/production/9b6a41f869888f89bf917c51d099bd5ae3f9c4cd-5520x3943.jpg?w=2400&h=1600&fit=crop&auto=format',
    images: [
      'https://cdn.sanity.io/images/a4mln02c/production/9b6a41f869888f89bf917c51d099bd5ae3f9c4cd-5520x3943.jpg?w=2400&h=1600&fit=crop&auto=format',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/38/e6/dd/caption.jpg?w=900&h=500&s=1',
      'https://cdn.sanity.io/images/a4mln02c/production/46435518920aaa16c2b774e7d6de160e0b331d9c-4632x3086.jpg?fp-x=0.5&fp-y=0.5&w=1200&h=675&fit=crop&crop=focalpoint&auto=format'
    ],
    description: 'Un día icónico en la Costa Sur, lleno de maravillas naturales que definen el paisaje islandés.',
    highlights: [
      'Seljalandsfoss: La cascada donde puedes caminar por detrás',
      'Gljúfrabúi: Cascada secreta escondida en un cañón',
      'Skógafoss: Cortina de agua perfecta con 527 escalones',
      'Reynisfjara: Playa de arena negra con columnas de basalto'
    ],
    tips: 'Lleva chubasquero para Seljalandsfoss. En Reynisfjara, cuidado con las olas traicioneras.',
    logistics: 'Supermercado pequeño en Vík | ⛽ Gasolinera en Vík | 🏕️ Camping Vík',
    hiddenGems: 'La piscina de Seljavallalaug, una de las más antiguas de Islandia, está enclavada en un valle precioso.'
  },
  {
    id: '4',
    title: 'Día 4 (2 Oct): Cañones y Campos de Lava',
    subtitle: 'Vík → Skaftafell',
    route: 'Vík → Skaftafell',
    distance: '140 km',
    duration: '~2h',
    drivingHours: 2,
    mainImage: 'https://www.islandia24.com/wp-content/uploads/2024/05/Canon-Fjadrargljufur-1.jpg',
    description: 'Atravesamos el campo de lava de Eldhraun, uno de los más grandes del mundo, hacia el Parque Nacional de Skaftafell.',
    highlights: [
      'Cañón Fjaðrárgljúfur: Un cañón serpenteante de belleza sobrecogedora',
      'Parque Nacional de Skaftafell: Parte del glaciar Vatnajökull',
      'Cascada Svartifoss: Famosa por sus columnas de basalto'
    ],
    tips: 'Haremos la ruta de senderismo hasta Svartifoss. Lleva calzado cómodo.',
    logistics: 'Pequeña tienda en Kirkjubæjarklaustur | ⛽ Gasolinera en Kirkjubæjarklaustur | 🏕️ Camping Skaftafell',
    hiddenGems: 'La lengua glaciar Svínafellsjökull, a menudo más tranquila que las famosas del día siguiente.'
  },
  {
    id: '5',
    title: 'Día 5 (3 Oct): Hielo y Diamantes',
    subtitle: 'Skaftafell → Höfn',
    route: 'Skaftafell → Höfn',
    distance: '140 km',
    duration: '~2h',
    drivingHours: 2,
    mainImage: 'https://images.ctfassets.net/a68ipajj4t9l/6UUYSvNzP7XUXPO9B0u6Yq/99ef05d6d83f590ba5a461dacf985aeb/Jokulsarlon1.jpg',
    images: [
      'https://images.ctfassets.net/a68ipajj4t9l/6UUYSvNzP7XUXPO9B0u6Yq/99ef05d6d83f590ba5a461dacf985aeb/Jokulsarlon1.jpg',
      'https://gti.images.tshiftcdn.com/9093464/x/0/diamond-beach-15.jpg?ixlib=php-3.3.0&w=883'
    ],
    description: 'Día dedicado al hielo en su máxima expresión, con lagunas glaciares espectaculares.',
    highlights: [
      'Fjallsárlón: Laguna glaciar más pequeña y tranquila',
      'Jökulsárlón: La famosa laguna glaciar con icebergs',
      'Diamond Beach: Donde los icebergs llegan al océano'
    ],
    tips: 'Visita Diamond Beach con diferentes mareas para ver cómo cambia.',
    logistics: 'BÓNUS/Nettó en Höfn | ⛽ Gasolinera en Höfn | 🏕️ Camping Höfn'
  },
  {
    id: '6',
    title: 'Día 6 (4 Oct): Los Fiordos del Este',
    subtitle: 'Höfn → Egilsstaðir',
    route: 'Höfn → Egilsstaðir',
    distance: '250 km',
    duration: '~3h 30min',
    drivingHours: 3.5,
    mainImage: 'https://static.wixstatic.com/media/df9fb8_c293a0e8a6a84500a0da246c156ba3d8~mv2.jpg/v1/fill/w_568,h_380,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/df9fb8_c293a0e8a6a84500a0da246c156ba3d8~mv2.jpg',
    description: 'Nos adentramos en la región más remota y tranquila de la Ring Road: los Fiordos del Este.',
    highlights: [
      'Carretera serpenteante por la costa con vistas espectaculares',
      'Pueblos pesqueros como Djúpivogur y Fáskrúðsfjörður',
      'Paisajes más vírgenes y menos turísticos'
    ],
    tips: 'La carretera serpentea por la costa, ofreciendo vistas espectaculares.',
    logistics: 'BÓNUS en Egilsstaðir | ⛽ Gasolineras en los pueblos | 🏕️ Camping Egilsstaðir',
    hiddenGems: 'Parada en el mirador de Stokksnes y la montaña Vestrahorn cerca de Höfn (acceso de pago, pero merece la pena).'
  },
  {
    id: '7',
    title: 'Día 7 (5 Oct): Hacia la Potencia del Norte',
    subtitle: 'Egilsstaðir → Mývatn',
    route: 'Egilsstaðir → Mývatn',
    distance: '170 km',
    duration: '~2h 15min',
    drivingHours: 2.25,
    mainImage: 'https://res.cloudinary.com/itb-database/image/upload/s--XMh_Iuyf--/c_fill,dpr_auto,f_auto,q_auto:eco,w_1280/v1/Places/ngizybzrjsopsrf1a74i',
    images: [
      'https://res.cloudinary.com/itb-database/image/upload/s--XMh_Iuyf--/c_fill,dpr_auto,f_auto,q_auto:eco,w_1280/v1/Places/ngizybzrjsopsrf1a74i',
      'https://www.carsiceland.com/assets/img/blog/583/featured/namaskard-guide.jpg'
    ],
    description: 'Cruzamos un paisaje casi lunar para llegar a la zona del lago Mývatn, región volcánica activa.',
    highlights: [
      'Dettifoss: La cascada más caudalosa de Europa',
      'Námaskarð (Hverir): Campo de fumarolas y lodo hirviendo'
    ],
    tips: 'Termina el día relajándote en los Mývatn Nature Baths, una alternativa genial a la Blue Lagoon.',
    logistics: 'Supermercado en Reykjahlíð | ⛽ Gasolinera en Reykjahlíð | 🏕️ Camping Bjarg, Mývatn'
  },
  {
    id: '8',
    title: 'Día 8 (6 Oct): Maravillas de Mývatn y los Dioses',
    subtitle: 'Mývatn → Akureyri',
    route: 'Mývatn → Akureyri',
    distance: '100 km',
    duration: '~1h 30min',
    drivingHours: 1.5,
    mainImage: 'https://arcticyeti.es/wp-content/uploads/2021/07/dimmuborgir.jpg',
    images: [
      'https://arcticyeti.es/wp-content/uploads/2021/07/dimmuborgir.jpg',
      'https://gti.images.tshiftcdn.com/1241954/x/0/.jpg?crop=1.91%3A1&width=1200&fit=crop'
    ],
    description: 'Dedicamos la mañana a explorar los alrededores del lago Mývatn antes de dirigirnos a Akureyri.',
    highlights: [
      'Dimmuborgir: Laberinto de formaciones de lava',
      'Hverfjall: Sube al borde de este enorme cráter',
      'Grjótagjá: Cueva de lava con fuente termal',
      'Goðafoss: La "Cascada de los Dioses"'
    ],
    tips: 'Por la tarde, rumbo a Akureyri con parada obligatoria en Goðafoss.',
    logistics: 'BÓNUS en Akureyri | ⛽ Gasolinera en Akureyri | 🏕️ Camping Hamrar, Akureyri'
  },
  {
    id: '9',
    title: 'Día 9 (7 Oct): Día de Transición y Oeste',
    subtitle: 'Akureyri → Borgarnes',
    route: 'Akureyri → Borgarnes',
    distance: '380 km',
    duration: '~4h 30min',
    drivingHours: 4.5,
    mainImage: 'https://cdn.sanity.io/images/a4mln02c/production/dfa981ebe179d068a944b2a9a9751087220c22e4-6016x4016.jpg?fp-x=0.5&fp-y=0.5&w=1200&h=900&fit=crop&crop=focalpoint&auto=format',
    description: 'Este es el día de conducción más largo. Atravesamos el norte de Islandia hacia el oeste.',
    highlights: [
      'Glaumbær: Casas tradicionales de turba',
      'Kolugljúfur: Un cañón impresionante y menos visitado',
      'Caballos islandeses en los campos'
    ],
    tips: 'El destino es Borgarnes, base para explorar Snæfellsnes.',
    logistics: 'BÓNUS en Borgarnes | ⛽ Gasolinera en Borgarnes | 🏕️ Camping Borgarnes'
  },
  {
    id: '10',
    title: 'Día 10 (8 Oct): Snæfellsnes, la "Islandia en Miniatura"',
    subtitle: 'Ruta circular por Snæfellsnes',
    route: 'Ruta circular por Snæfellsnes',
    distance: '250 km',
    duration: '~3h 30min',
    drivingHours: 3.5,
    mainImage: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/af/0c/8f/aurora-borealis-at-mount.jpg?w=900&h=500&s=1',
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/af/0c/8f/aurora-borealis-at-mount.jpg?w=900&h=500&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/5e/8b/6f/the-budir-black-church.jpg?w=1200&h=-1&s=1'
    ],
    description: 'Día completo explorando esta península que resume toda la belleza de Islandia.',
    highlights: [
      'Kirkjufell: La montaña más fotografiada del país',
      'Arnarstapi: Acantilados y formaciones rocosas',
      'Búðakirkja: La famosa iglesia negra'
    ],
    tips: 'Ruta circular completa por la península de Snæfellsnes.',
    logistics: 'Tiendas en los pueblos | ⛽ Gasolineras en los pueblos | 🏕️ Camping Borgarnes'
  },
  {
    id: '11',
    title: 'Día 11 (9 Oct): Península de Reykjanes',
    subtitle: 'Borgarnes → Grindavík',
    route: 'Borgarnes → Grindavík',
    distance: '120 km',
    duration: '~1h 45min',
    drivingHours: 1.75,
    mainImage: 'https://maps.arcticyeti.com/cgmlImg/148-apsqdql/wmdpi16/PRI_IS020-seltun-geothermal-area_01.jpg',
    description: 'Dejamos Borgarnes y nos dirigimos a la península de Reykjanes para la última noche.',
    highlights: [
      'Seltún-Krýsuvík: Área geotermal muy colorida',
      'Puente entre Continentes: Sobre la fisura de las placas tectónicas'
    ],
    tips: 'Reykjanes es el lugar perfecto para una última caza de auroras boreales.',
    logistics: 'Supermercado en Grindavík/Keflavík | ⛽ Gasolinera en Grindavík | 🏕️ Camping Grindavík'
  },
  {
    id: '12',
    title: 'Día 12 (10 Oct): Últimas Vistas y Despedida',
    subtitle: 'Grindavík → Aeropuerto de Keflavík',
    route: 'Grindavík → Aeropuerto de Keflavík',
    distance: '25 km',
    duration: '~20 min',
    drivingHours: 0.5,
    mainImage: 'https://cdn.sanity.io/images/lf2d8f6r/production/6f9cc1f3737eda34065837b54e22c4e0e3f09705-2500x1875.jpg?q=75&fit=max&auto=format&w=3840',
    description: 'Mañana de despedida. Vuelo a las 15:00. Aprovechad para las últimas visitas.',
    highlights: [
      'Área geotermal de Gunnuhver',
      'Faro de Reykjanesviti',
      'Últimas vistas de Islandia'
    ],
    tips: 'Dejad más tiempo del que creéis para devolver la camper. ¡Mejor ir sobrados de tiempo y sin estrés!',
    logistics: '08:00-10:00: Última visita | 10:00-11:30: Limpiar camper | 11:30-12:00: Devolver | 12:00+: Aeropuerto'
  }
]