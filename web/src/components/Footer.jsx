import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Phone, MapPin, Send, Play } from 'lucide-react'
import { urlFor } from '../sanity'

export default function Footer({ contact, conm }) {
  if (!contact) return null

  const normalizePhone = (phone = '') => phone.toString().replace(/\D/g, '')

  const formatPhoneForDisplay = (phone = '') => {
    const digits = normalizePhone(phone)
    if (digits.length === 13 && digits.startsWith('55')) {
      return `(${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`
    }
    if (digits.length === 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
    }
    return phone
  }

  const rawPhoneNumber = normalizePhone(contact.phone)
  const formattedPhone = formatPhoneForDisplay(contact.phone)

  // URL do Google Maps Corrigida
  const mapsUrl = contact.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
    : null

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
                <span className="leading-relaxed font-sans text-sm tracking-wide mt-1 text-left">
                  {contact.address}
                </span>
              </a>
            ) : (
              <p className="italic font-sans text-sm opacity-50">Sertão do Ceará, Brasil</p>
            )}
          </div>

          {/* Coluna 2: Contato Central */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-baluarte-bg font-serif text-3xl mb-8 tracking-tight">Fale com a Missão</h3>
            {rawPhoneNumber ? (
              <div className="flex flex-col items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${rawPhoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-4 rounded-full border border-baluarte-luz/40 text-baluarte-luz hover:bg-baluarte-luz hover:text-baluarte-text transition-all duration-700 font-sans text-xs font-bold tracking-[0.2em] uppercase"
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

          {/* Coluna 3: Redes Sociais com DESTAQUE YOUTUBE */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-baluarte-bg font-serif text-3xl mb-8 tracking-tight">Redes de Fé</h3>
            <div className="flex items-center gap-6">
              {contact.socialLinks?.map((link, idx) => {
                const isYoutube = link.toLowerCase().includes('youtube.com');
                
                return (
                  <motion.a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: isYoutube ? 1.2 : 1.1 }}
                    className={`relative flex items-center justify-center rounded-full transition-all duration-500 shadow-xl
                      ${isYoutube 
                        ? 'w-20 h-20 bg-baluarte-vida text-white ring-4 ring-baluarte-vida/20' 
                        : 'w-14 h-14 border border-baluarte-bg/10 bg-baluarte-bg/5 text-baluarte-bg/80 hover:border-baluarte-luz hover:text-baluarte-luz'
                      }`}
                  >
                    {isYoutube ? (
                      <>
                        <Youtube className="w-8 h-8 relative z-10" />
                        {/* Efeito de Pulso Magnético para o Youtube */}
                        <motion.div 
                          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-baluarte-vida rounded-full"
                        />
                        {/* Label Flutuante apenas para o Youtube */}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.2em] text-baluarte-vida whitespace-nowrap animate-pulse">
                          Assista Agora
                        </span>
                      </>
                    ) : (
                      link.includes('instagram.com') ? <Instagram className="w-5 h-5" /> : <Send className="w-5 h-5" />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Linha Final: Copyright + Selo CONM */}
        <div className="mt-32 pt-12 border-t border-baluarte-bg/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-baluarte-bg">
              © {new Date().getFullYear()} Missão Baluarte
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] font-sans opacity-30 italic">
              Desde 2019 transformando vidas no sertão 🌵
            </p>
          </div>

          {/* Selo CONM de Autoridade no Footer */}
          {conm?.logo && (
            <div className="flex flex-col items-center md:items-end gap-2 opacity-40 hover:opacity-100 transition-opacity">
               <img 
                  src={urlFor(conm.logo).height(40).url()} 
                  alt="CONM" 
                  className="h-6 w-auto grayscale" 
               />
               {conm.slogan && (
                 <span className="text-[7px] uppercase tracking-[0.3em] font-bold text-baluarte-bg max-w-[150px] text-center md:text-right leading-tight">
                    {conm.slogan}
                 </span>
               )}
            </div>
          )}

          <p className="text-[9px] uppercase tracking-[0.4em] font-sans opacity-30 italic hidden md:block">
            Feito com propósito no coração do sertão.
          </p>
        </div>
      </div>
    </footer>
  )
}