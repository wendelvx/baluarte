import { useState, useEffect } from 'react'
import { client, urlFor } from '../sanity'
import { Menu, Loader2 } from 'lucide-react'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState(null)
  const [logoLoaded, setLogoLoaded] = useState(false)

  const menuLinks = [
    { name: 'Início', target: 'top' },
    { name: 'Quem Somos', target: 'about' },
    { name: 'Voluntariado', target: 'volunteer' },
    { name: 'Contato', target: 'footer' },
  ]

  useEffect(() => {
    const query = '*[_type == "homePage"][0]{ logo }'
    client.fetch(query).then((data) => {
      if (data?.logo) {
        setLogoUrl(
          urlFor(data.logo)
            .width(360)
            .auto('format')
            .quality(90)
            .url()
        )
      }
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
    return () => (document.body.style.overflow = 'auto')
  }, [isMenuOpen])

  const handleScroll = (target) => {
    setIsMenuOpen(false)

    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const el = document.getElementById(target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-24">

            <button
              onClick={() => handleScroll('top')}
              className="relative flex items-center h-16 w-44"
              aria-label="Ir para o início"
            >
              {!logoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                </div>
              )}

              {logoUrl && (
    <img
      src={logoUrl}
      alt="Logo Missão Baluarte"
      onLoad={() => setLogoLoaded(true)}
      className={`h-16 w-auto transition-opacity duration-500 ${
        logoLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )}
            </button>

            <nav className="hidden md:flex items-center gap-12">
              {menuLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScroll(link.target)}
                  className="text-slate-600 font-medium hover:text-emerald-700 transition"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition"
              aria-label="Abrir menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        links={menuLinks}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleScroll}
      />
    </>
  )
}
