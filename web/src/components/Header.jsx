import { useState, useEffect } from 'react'
import { client, urlFor } from '../sanity'
import { Menu, X } from 'lucide-react'

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

    client
      .fetch(query)
      .then((data) => {
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
      .catch(console.error)
  }, [])

  const handleScroll = (target) => {
    setIsMenuOpen(false)

    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const el = document.getElementById(target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          
          <button
            onClick={() => handleScroll('top')}
            className="relative flex items-center"
            aria-label="Ir para o início"
          >
            {!logoLoaded && (
              <div className="
                absolute
                h-16 w-40
                bg-slate-200
                rounded-md
                animate-pulse
              " />
            )}

            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo Missão Baluarte"
                onLoad={() => setLogoLoaded(true)}
                className={`
                  h-16 w-auto
                  transition-opacity duration-500
                  ${logoLoaded ? 'opacity-100' : 'opacity-0'}
                `}
              />
            ) : (
              <span className="text-3xl font-semibold text-emerald-700">
                Missão Baluarte
              </span>
            )}
          </button>

          <nav className="hidden md:flex items-center gap-12">
            {menuLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.target)}
                className="
                  text-slate-600
                  text-base
                  font-medium
                  hover:text-emerald-700
                  transition
                  cursor-pointer
                "
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-xl p-6">
            <div className="flex justify-between items-center mb-8">
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
                  className="
                    text-slate-700
                    text-lg
                    font-medium
                    text-left
                    hover:text-emerald-700
                    transition
                  "
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
