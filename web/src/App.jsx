import { useEffect, useState } from 'react'
import { client } from './sanity'

import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Volunteer from './components/Volunteer'
import Footer from './components/Footer'

function App() {
  const [homeData, setHomeData] = useState(null)

  useEffect(() => {
    // Essa query busca TODOS os campos do homePage, incluindo a nova 'logo'
    const query = `*[_type == "homePage"][0]`

    client.fetch(query)
      .then((data) => {
        // Dica: Este log ajuda a ver se a 'logo' chegou certinho no console do navegador
        console.log("Dados do Sanity:", data); 
        setHomeData(data)
      })
      .catch((error) => console.error('Erro ao buscar dados:', error))
  }, [])

  if (!homeData) return <div className="loading">Carregando site...</div>

  return (
    <div className="app-container">
      {/* AQUI ESTÁ A MUDANÇA: Passando a logo para o Header */}
      <Header logo={homeData.logo} />

      <Hero images={homeData.carouselImages} />

      <About />

      <Volunteer />
      
      <Footer contact={homeData.contactInfo} />
    </div>
  )
}

export default App