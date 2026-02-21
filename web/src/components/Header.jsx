import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Loader2 } from 'lucide-react'
import { client, urlFor } from '../sanity'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Início')
  const [logoUrl, setLogoUrl] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const menuLinks = [
    { name: 'Início', target: 'top' },
    { name: 'Manifesto', target: 'about' },
    { name: 'O Chamado', target: 'volunteer' },
    { name: 'Contato', target: 'footer' },
  ]

  // Monitora o scroll para adicionar uma sombra leve ao rolar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const query = '*[_type == "homePage"][0]{ logo }'
    client.fetch(query).then((data) => {
      if (data?.logo) setLogoUrl(urlFor(data.logo).width(300).url())
    })
  }, [])

  const handleNavigate = (target, name) => {
    setActiveTab(name)
    setIsOpen(false)
    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-baluarte-bg/80 backdrop-blur-lg border-b border-baluarte-luz/10 py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          
          {/* Logo */}
          <button onClick={() => handleNavigate('top', 'Início')} className="relative h-12 w-40">
            {logoUrl ? (
              <motion.img 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                src={logoUrl} 
                alt="Logo Missão Baluarte" 
                className="h-full w-auto object-contain"
              />
            ) : (
              <Loader2 className="animate-spin text-baluarte-luz w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {menuLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.target, link.name)}
                className="relative group text-sm font-medium tracking-widest uppercase text-baluarte-text/80 hover:text-baluarte-vida transition-colors"
              >
                {link.name}
                {activeTab === link.name && (
                  <motion.div
                    layoutId="header-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-baluarte-luz"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-baluarte-vida p-2"
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

            <div className="mt-auto border-t border-baluarte-luz/20 pt-8">
              <p className="text-baluarte-luz font-serif italic">Sustentando promessas no sertão.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}