import React from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'

export default function VolunteerCall() {
  return (
    <section id="volunteer" className="relative py-0 bg-baluarte-bg overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[600px]">
        
        {/* Lado Esquerdo: Imagem com Impacto (Split Layout) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="md:w-1/2 relative h-[400px] md:h-auto"
        >
          <img 
            src="/images/volunteercall.webp" // Substitua pela imagem do Sanity
            alt="Mãos que transformam"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay suave para integrar com o fundo */}
          <div className="absolute inset-0 bg-baluarte-vida/10" />
        </motion.div>

        {/* Lado Direito: O Convite (Texto e Ação) */}
        <div className="md:w-1/2 flex items-center justify-center p-12 md:p-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-center md:text-left"
          >
            <div className="flex justify-center md:justify-start mb-6">
              <div className="bg-white p-4 rounded-full shadow-sm ring-1 ring-baluarte-luz/20">
                <HeartHandshake className="w-8 h-8 text-baluarte-vida" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-baluarte-vida mb-8 leading-tight">
              Seja o sustento de uma <span className="italic">nova história.</span>
            </h2>

            <p className="text-lg text-baluarte-text/80 font-sans mb-12 leading-relaxed">
              O sertão não precisa de pena, precisa de baluartes. Pessoas que acreditam que o direito de sonhar 
              começa com um prato de comida, uma aula de reforço e um abraço sincero.
              <br /><br />
              <span className="font-semibold text-baluarte-vida">Seu talento é a ferramenta, seu tempo é o milagre.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              {/* Botão com Efeito de Pulso Suave */}
              <motion.a
                href="https://forms.gle/your-form-link"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ 
                  boxShadow: ["0px 0px 0px 0px rgba(212, 163, 115, 0)", "0px 0px 0px 15px rgba(212, 163, 115, 0.1)", "0px 0px 0px 0px rgba(212, 163, 115, 0)"] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-baluarte-vida text-white px-8 py-4 rounded-full font-medium shadow-xl hover:bg-baluarte-vida/90 transition-all flex items-center justify-center gap-2"
              >
                Quero ser voluntário
              </motion.a>

              <button className="text-baluarte-luz font-sans font-medium hover:underline underline-offset-8 transition-all">
                Outras formas de ajudar
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}