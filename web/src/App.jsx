import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { client } from './sanity'

// Componentes Refatorados
import Header from './components/Header'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Activities from './components/Activities'
import VolunteerCall from './components/VolunteerCall'
import ShopTeaser from './components/ShopTeaser'
import Footer from './components/Footer'

function App() {
  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const query = `*[_type == "homePage"][0]{
      ...,
      "featuredProjects": featuredProjects[]->{
        _id,
        title,
        mainImage,
        summary,
        description
      },
      "products": *[_type == "product"]{
        _id,
        title,
        category,
        price,
        checkoutUrl,
        mainImage,
        gallery,
        tagline,
        about,
        customSection,
        features,
        faq
      }
    }`

    client
      .fetch(query)
      .then((data) => {
        if (!data) throw new Error('Dados não encontrados')
        setHomeData(data)
        console.log("Dados carregados com sucesso! 🦅", data)
      })
      .catch((error) => console.error('Erro Sanity:', error))
      .finally(() => {
        setTimeout(() => setLoading(false), 800)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-baluarte-bg min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-baluarte-luz/20 border-t-baluarte-vida rounded-full animate-spin mb-8 shadow-xl shadow-baluarte-vida/10" />
          <p className="font-serif italic text-baluarte-vida text-2xl">Semeando o amor</p>
          <span className="text-baluarte-luz font-sans text-[10px] uppercase tracking-[0.5em] font-bold mt-3">que transforma propósitos</span>
        </motion.div>
      </div>
    )
  }

  if (!homeData) return null

  return (
    <div className="bg-baluarte-bg font-sans selection:bg-baluarte-luz/30">
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-baluarte-luz z-[60] origin-[0%]" style={{ scaleX }} />

      <Header logo={homeData.logo} conm={homeData.conmSection} />

      <main>
        {/* 1. Hero: Agora recebe donationFlows para o link de voluntário */}
        {homeData.carouselImages?.length > 0 && (
          <Hero 
            images={homeData.carouselImages} 
            donationFlows={homeData.donationFlows} 
          />
        )}

        {/* 2. Manifesto */}
        <Manifesto essence={homeData.essence} />

        {/* 3. Activities */}
        <Activities projects={homeData.featuredProjects} />

        {/* 4. Volunteer Call */}
        <VolunteerCall flows={homeData.donationFlows} />

        {/* 5. Shop Teaser */}
        <ShopTeaser products={homeData.products} />
      </main>

      <Footer contact={homeData.contactInfo} conm={homeData.conmSection} />
    </div>
  )
}

export default App