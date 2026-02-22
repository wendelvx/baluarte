import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Loader2 } from 'lucide-react'
import { urlFor } from '../sanity'

export default function Header({ logo, conm }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Início')
  const [isScrolled, setIsScrolled] = useState(false)

  const menuLinks = [
    { name: 'Início', target: 'top' },
    { name: 'Essência', target: 'about' },
    { name: 'O Seu Sim', target: 'volunteer' },
    { name: 'Sementes', target: 'shop' },
    { name: 'Conectar', target: 'footer' },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (target, name) => {
    setActiveTab(name)
    setIsOpen(false)
    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(target)
      if (element) {
        const offset = 80 
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = element.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <>
      {/* Gradiente de proteção para contraste no topo */}
      <div 
        className={`fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-[45] pointer-events-none transition-opacity duration-700 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`} 
      />

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-baluarte-luz/10 py-3 shadow-md' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          
          {/* BLOCO DE LOGOS */}
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={() => handleNavigate('top', 'Início')} className="relative h-10 md:h-12 w-auto shrink-0 transition-transform hover:scale-105 active:scale-95">
              {logo ? (
                <img 
                  src={urlFor(logo).height(100).url()} 
                  alt="Logo Missão Baluarte" 
                  // CORREÇÃO AQUI: Removido o filtro 'brightness-0 invert'. 
                  // Agora a logo original é mostrada, protegida pelo gradiente escuro atrás.
                  className={`h-full w-auto object-contain transition-all duration-500`}
                />
              ) : (
                <Loader2 className="animate-spin text-baluarte-luz w-6 h-6" />
              )}
            </button>

            {conm?.logo && (
              <div className={`flex items-center gap-4 md:gap-6 pl-4 md:pl-8 border-l transition-colors duration-500 ${isScrolled ? 'border-baluarte-vida/10' : 'border-white/30'}`}>
                <div className="flex flex-col">
                  {/* Ajuste sutil na logo da CONM também para não ficar "estourada" de branco */}
                  <img 
                    src={urlFor(conm.logo).height(50).url()} 
                    alt="Selo CONM" 
                    className={`h-5 md:h-7 w-auto object-contain transition-all duration-500 ${!isScrolled ? 'opacity-90 brightness-110' : 'grayscale opacity-70'}`}
                  />
                  {conm.slogan && (
                    <span className={`hidden sm:block text-[7px] md:text-[8px] uppercase tracking-[0.3em] font-bold mt-1 transition-colors duration-500 ${isScrolled ? 'text-baluarte-vida/50' : 'text-white/70'}`}>
                      {conm.slogan}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation (Links permanecem brancos no topo para contraste) */}
          <nav className="hidden md:flex items-center gap-10">
            {menuLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.target, link.name)}
                className={`relative group text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${
                  isScrolled ? 'text-baluarte-text/80 hover:text-baluarte-vida' : 'text-white hover:text-baluarte-luz'
                }`}
              >
                {link.name}
                {activeTab === link.name && (
                  <motion.div
                    layoutId="header-underline"
                    className={`absolute -bottom-2 left-0 right-0 h-[1.5px] ${isScrolled ? 'bg-baluarte-luz' : 'bg-white'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 transition-colors duration-500 ${isScrolled ? 'text-baluarte-vida' : 'text-white'}`}
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-baluarte-bg flex flex-col p-10"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsOpen(false)} className="text-baluarte-vida">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {menuLinks.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  onClick={() => handleNavigate(link.target, link.name)}
                  className="text-3xl font-serif text-baluarte-vida text-left"
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto border-t border-baluarte-luz/20 pt-8 flex flex-col gap-4">
              {conm?.logo && (
                 <img 
                    src={urlFor(conm.logo).height(40).url()} 
                    className="h-6 w-fit opacity-40 grayscale" 
                    alt="CONM"
                 />
              )}
              <p className="text-baluarte-luz font-serif italic text-sm">Sustentando promessas no sertão.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}