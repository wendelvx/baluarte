import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Phone, MapPin, Send } from 'lucide-react'

export default function Footer({ contact }) {
  if (!contact) return null

  // Normaliza: Remove tudo que não é número
  const normalizePhone = (phone = '') => phone.toString().replace(/\D/g, '')

  // Formata para exibição: (88) 98222-8665
  const formatPhoneForDisplay = (phone = '') => {
    const digits = normalizePhone(phone)
    
    // Caso o número venha com 55 (DDI Brasil) + DDD + Número (Ex: 5588982228665)
    if (digits.length === 13 && digits.startsWith('55')) {
      const ddd = digits.slice(2, 4)
      const firstPart = digits.slice(4, 9)
      const secondPart = digits.slice(9)
      return `(${ddd}) ${firstPart}-${secondPart}`
    }

    // Caso o número venha apenas com DDD + Número (Ex: 88982228665)
    if (digits.length === 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
    }

    return phone // Retorna original se não encaixar nos padrões
  }

  const rawPhoneNumber = normalizePhone(contact.phone)
  const formattedPhone = formatPhoneForDisplay(contact.phone)

  // Link corrigido para o Google Maps Real
  const mapsUrl = contact.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
    : null

  const getSocialIcon = (url) => {
    const lower = url.toLowerCase()
    if (lower.includes('instagram.com')) return <Instagram className="w-5 h-5" />
    if (lower.includes('youtube.com')) return <Youtube className="w-5 h-5" />
    return <Send className="w-5 h-5" />
  }

  return (
    <footer id="footer" className="bg-baluarte-text text-baluarte-bg/60 border-t border-baluarte-luz/10">
      <div className="max-w-7xl mx-auto px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center md:text-left">
          
          {/* Coluna 1: Localização */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-baluarte-bg font-serif text-3xl mb-8 tracking-tight">Nossa Casa</h3>
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 hover:text-baluarte-luz transition-all duration-500 max-w-[280px]"
              >
                <div className="p-3 rounded-full bg-baluarte-bg/5 border border-baluarte-luz/20 group-hover:bg-baluarte-luz group-hover:text-baluarte-text transition-all">
                  <MapPin className="w-5 h-5 shrink-0" />
                </div>
                <span className="leading-relaxed font-sans text-sm tracking-wide mt-1">
                  {contact.address}
                </span>
              </a>
            ) : (
              <p className="italic font-sans text-sm opacity-50">Sertão do Ceará, Brasil</p>
            )}
          </div>

          {/* Coluna 2: Contato (O Coração do Footer) */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-baluarte-bg font-serif text-3xl mb-8 tracking-tight text-center">Fale com a Missão</h3>
            {rawPhoneNumber ? (
              <div className="flex flex-col items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${rawPhoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-4 rounded-full border border-baluarte-luz/40 text-baluarte-luz hover:bg-baluarte-luz hover:text-baluarte-text transition-all duration-700 font-sans text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-baluarte-luz/5"
                >
                  <Phone className="w-4 h-4" />
                  {formattedPhone}
                </motion.a>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-baluarte-luz/40">Atendimento Humanizado</p>
              </div>
            ) : (
              <p className="text-sm font-sans tracking-widest">contato@missaobaluarte.org</p>
            )}
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-baluarte-bg font-serif text-3xl mb-8 tracking-tight">Redes de Fé</h3>
            <div className="flex gap-5">
              {contact.socialLinks?.map((link, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-full border border-baluarte-bg/10 bg-baluarte-bg/5 text-baluarte-bg/80 hover:border-baluarte-luz hover:text-baluarte-luz transition-all duration-500 shadow-xl"
                >
                  {getSocialIcon(link)}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Linha Final: Copyright Editorial */}
        <div className="mt-24 pt-12 border-t border-baluarte-bg/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-baluarte-bg">
              © {new Date().getFullYear()} Missão Baluarte
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] font-sans opacity-30">
              Sustentando promessas, protegendo o futuro.
            </p>
          </div>
          <div className="h-[1px] w-12 bg-baluarte-luz/20 hidden md:block" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-sans opacity-30 italic">
            Feito com propósito no coração do sertão.
          </p>
        </div>
      </div>
    </footer>
  )
}