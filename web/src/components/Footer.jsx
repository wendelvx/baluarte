import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Phone, MapPin, Send } from 'lucide-react'

export default function Footer({ contact }) {
  if (!contact) return null

  const normalizePhone = (phone = '') => phone.replace(/\D/g, '')

  const formatPhone = (phone = '') => {
    const digits = normalizePhone(phone)
    if (digits.length === 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
    }
    return phone
  }

  const phoneNumber = normalizePhone(contact.phone)
  const formattedPhone = formatPhone(contact.phone)

  // Link corrigido para o Google Maps
  const mapsUrl = contact.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
    : null

  const getSocialIcon = (url) => {
    const lower = url.toLowerCase()
    if (lower.includes('instagram.com')) return <Instagram className="w-5 h-5" />
    if (lower.includes('youtube.com')) return <Youtube className="w-5 h-5" />
    return <Send className="w-5 h-5" /> // Ícone padrão para outros links
  }

  return (
    <footer id="footer" className="bg-baluarte-text text-baluarte-bg/60 border-t border-baluarte-luz/10">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          
          {/* Coluna 1: Localização */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-baluarte-bg font-serif text-2xl mb-6">Nossa Casa</h3>
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 hover:text-baluarte-luz transition-colors duration-300 max-w-[250px]"
              >
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-baluarte-luz" />
                <span className="leading-relaxed font-sans text-sm tracking-wide">
                  {contact.address}
                </span>
              </a>
            ) : (
              <p className="italic">Sertão do Ceará, Brasil</p>
            )}
          </div>

          {/* Coluna 2: Contato/CTA */}
          <div className="flex flex-col items-center">
            <h3 className="text-baluarte-bg font-serif text-2xl mb-6">Fale com a Missão</h3>
            {phoneNumber ? (
              <motion.a
                whileHover={{ scale: 1.02 }}
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-baluarte-luz/30 text-baluarte-luz hover:bg-baluarte-luz hover:text-white transition-all duration-500 font-sans text-sm font-medium tracking-widest uppercase"
              >
                <Phone className="w-4 h-4" />
                {formattedPhone}
              </motion.a>
            ) : (
              <p className="text-sm">contato@missaobaluarte.org</p>
            )}
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-baluarte-bg font-serif text-2xl mb-6">Acompanhe a Jornada</h3>
            <div className="flex gap-4">
              {contact.socialLinks?.map((link, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -3, color: '#D4A373' }}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-baluarte-bg/10 bg-baluarte-bg/5 hover:border-baluarte-luz/50 transition-all"
                >
                  {getSocialIcon(link)}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Linha Final: Copyright */}
        <div className="mt-20 pt-8 border-t border-baluarte-bg/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] font-sans">
            © {new Date().getFullYear()} Missão Baluarte. Sustentando promessas.
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-sans opacity-40">
            Desenvolvido com fé e propósito no sertão.
          </p>
        </div>
      </div>
    </footer>
  )
}