import React from 'react'
import {
  Instagram,
  Youtube,
  Phone
} from 'lucide-react'

export default function Footer({ contact }) {
  if (!contact) return null

  const normalizePhone = (phone = '') =>
    phone.replace(/\D/g, '')

  const phoneNumber = normalizePhone(contact.phone)

  const getSocialIcon = (url) => {
    if (!url) return null
    const lower = url.toLowerCase()

    if (lower.includes('instagram.com'))
      return <Instagram className="w-5 h-5" />

    if (lower.includes('youtube.com') || lower.includes('youtu.be'))
      return <Youtube className="w-5 h-5" />

    if (lower.includes('wa.me') || lower.includes('whatsapp'))
      return <Phone className="w-5 h-5" />

    return null
  }

  return (
    <footer id="footer" className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-3 text-center md:text-left">
        
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Onde Estamos
          </h3>
          <p className="text-slate-400 leading-relaxed">
            {contact.address || 'Endereço não cadastrado'}
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Fale Conosco
          </h3>

          {contact.phone ? (
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center md:justify-start gap-2
                text-slate-400
                hover:text-emerald-400
                transition
              "
            >
              <Phone className="w-4 h-4" />
              {contact.phone}
            </a>
          ) : (
            <p className="text-slate-500">(00) 00000-0000</p>
          )}
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Siga-nos
          </h3>

          <div className="flex justify-center md:justify-start gap-4">
            {contact.socialLinks && contact.socialLinks.length > 0 ? (
              contact.socialLinks.map((link, idx) => {
                const icon = getSocialIcon(link)
                if (!icon) return null

                return (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rede social"
                    className="
                      w-10 h-10
                      flex items-center justify-center
                      rounded-full
                      bg-slate-800
                      text-slate-300
                      hover:bg-emerald-600
                      hover:text-white
                      transition
                    "
                  >
                    {icon}
                  </a>
                )
              })
            ) : (
              <p className="text-slate-500 text-sm">
                Nenhuma rede social cadastrada
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Missão Baluarte. Todos os direitos reservados.
      </div>
    </footer>
  )
}
