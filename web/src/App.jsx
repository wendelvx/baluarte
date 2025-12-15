import { useEffect, useState } from 'react'
import { client } from './sanity'

import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Volunteer from './components/Volunteer'
import Footer from './components/Footer'

function App() {
  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = '*[_type == "homePage"][0]'

    client
      .fetch(query)
      .then((data) => {
        setHomeData(data)
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do Sanity:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      
      <div className="h-16 bg-slate-100 border-b" />

      <div className="w-full h-[260px] md:h-[420px] bg-slate-200" />

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
        <div className="h-6 w-40 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 rounded" />
        <div className="h-4 w-4/6 bg-slate-200 rounded" />
      </div>

      <div className="py-16 bg-slate-100">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <div className="h-6 w-60 bg-slate-200 rounded mx-auto" />
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-10 w-48 bg-slate-300 rounded-full mx-auto" />
        </div>
      </div>

      <div className="h-32 bg-slate-900" />
    </div>
  )
}


  if (!homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Erro ao carregar o site.
      </div>
    )
  }

  return (
    <div className="bg-white text-slate-800">
      <Header />

      <About />

      {homeData.carouselImages?.length > 0 && (
        <Hero images={homeData.carouselImages} />
      )}

      <Volunteer />

      <Footer contact={homeData.contactInfo} />
    </div>
  )
}

export default App
