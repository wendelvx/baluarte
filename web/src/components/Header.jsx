import { useState, useEffect } from 'react'
import { client, urlFor } from '../sanity'
import { Menu, X, Loader2 } from 'lucide-react'

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

  // 🔒 trava scroll vertical
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
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200 overflow-x-hidden">
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

            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo Missão Baluarte"
                onLoad={() => setLogoLoaded(true)}
                className={`h-16 w-auto transition-opacity duration-500 ${
                  logoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <span className="text-2xl font-semibold text-emerald-700">
                Missão Baluarte
              </span>
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

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          <aside className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-white shadow-xl p-6 animate-slide-in">
            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-semibold text-slate-800">
                Menu
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md hover:bg-slate-100"
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {menuLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScroll(link.target)}
                  className="text-slate-700 text-lg font-medium text-left hover:text-emerald-700 transition"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </aside>
        </>
      )}
    </header>
  )
}
