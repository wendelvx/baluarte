import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { client } from './sanity'

// Componentes Refatorados
import Header from './components/Header'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto' // Antigo About
import VolunteerCall from './components/VolunteerCall' // Antigo Volunteer
import ShopTeaser from './components/ShopTeaser'
import Footer from './components/Footer'

function App() {
  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Configuração da Progress Bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const query = '*[_type == "homePage"][0]'

    client
      .fetch(query)
      .then((data) => {
        if (!data) throw new Error('Dados não encontrados')
        setHomeData(data)
      })
      .catch((error) => console.error('Erro Sanity:', error))
      .finally(() => setLoading(false))
  }, [])

  // Skeleton Loading Premium
  if (loading) {
    return (
      <div className="bg-baluarte-bg min-h-screen flex flex-col items-center justify-center">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-baluarte-luz/20 border-t-baluarte-luz rounded-full animate-spin mb-4" />
          <p className="font-serif italic text-baluarte-vida tracking-widest">Sustentando promessas...</p>
        </motion.div>
      </div>
    )
  }

  if (!homeData) return null

  return (
    <div className="bg-baluarte-bg font-sans selection:bg-baluarte-luz/30">
      
      {/* Progress Bar Dourada no Topo */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-baluarte-luz z-[60] origin-[0%]"
        style={{ scaleX }}
      />

      <Header />

      <main>
        {/* 1. Hero: O Impacto Visual */}
        {homeData.carouselImages?.length > 0 && (
          <Hero images={homeData.carouselImages} />
        )}

        {/* 2. Manifesto: A Nossa Essência */}
        <Manifesto />

        {/* 3. O Chamado: Conversão para Voluntariado */}
        <VolunteerCall />

        {/* 4. Shop: Apoio através de produtos */}
        <ShopTeaser />
      </main>

      <Footer contact={homeData.contactInfo} />
    </div>
  )
}

export default App