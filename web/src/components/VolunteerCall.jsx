import React from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake, Sparkles } from 'lucide-react'

export default function VolunteerCall() {
  return (
    <section id="volunteer" className="relative py-0 bg-baluarte-bg overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[650px]">
        
        {/* Lado Esquerdo: O Olhar do Impacto */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:w-1/2 relative h-[450px] md:h-auto overflow-hidden"
        >
          <img 
            src="/images/volunteercall.webp" 
            alt="O brilho da esperança"
            className="absolute inset-0 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
          />
          {/* Overlay Quente para unificar com a paleta */}
          <div className="absolute inset-0 bg-gradient-to-r from-baluarte-vida/20 to-transparent" />
        </motion.div>

        {/* Lado Direito: O Convite Irresistível */}
        <div className="md:w-1/2 flex items-center justify-center p-10 md:p-24 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-lg text-center md:text-left"
          >
            <div className="flex justify-center md:justify-start mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-baluarte-luz/20 blur-xl rounded-full" />
                <div className="relative bg-white p-4 rounded-full shadow-sm ring-1 ring-baluarte-luz/20">
                  <HeartHandshake className="w-8 h-8 text-baluarte-vida" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-baluarte-vida mb-8 leading-[1.1]">
              Não mude o mundo. <br />
              <span className="italic text-baluarte-luz">Mude o mundo de alguém.</span>
            </h2>

            <div className="space-y-6 text-lg text-baluarte-text/80 font-sans leading-relaxed mb-12">
              <p>
                Muitas vezes, a distância entre o desespero e a esperança é apenas um par de mãos dispostas. 
                <span className="text-baluarte-vida font-medium"> Não buscamos heróis, buscamos humanidade.</span>
              </p>
              <p className="italic border-l-2 border-baluarte-luz/30 pl-4 py-1">
                Seja doando seu conhecimento, algumas horas do seu mês ou apenas o calor de um abraço: 
                você é o milagre que alguém estava esperando.
              </p>
            </div>

           <div className="flex flex-col sm:flex-row gap-8 justify-center md:justify-start items-center">
  {/* Botão Principal: O "Sim" Emocional via WhatsApp */}
  <motion.a
    href={`https://wa.me/558899990250?text=${encodeURIComponent(
      "Olá! Vi a página da Missão Baluarte e gostei muito do movimento. Gostaria de saber o que posso fazer para ser um voluntário e ajudar!"
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ 
      boxShadow: [
        "0px 0px 0px 0px rgba(212, 163, 115, 0)", 
        "0px 0px 0px 20px rgba(212, 163, 115, 0.1)", 
        "0px 0px 0px 0px rgba(212, 163, 115, 0)"
      ] 
    }}
    transition={{ duration: 3, repeat: Infinity }}
    className="
      bg-baluarte-vida text-white 
      px-10 py-5 rounded-full 
      font-bold tracking-widest uppercase text-xs
      shadow-2xl shadow-baluarte-vida/20
      hover:bg-baluarte-vida/95 transition-all 
      flex items-center gap-3
    "
  >
    <Sparkles className="w-4 h-4 text-baluarte-luz" />
    Quero estender minha mão
  </motion.a>

  {/* Botão Secundário: Direcionando para o Formulário */}
  <motion.a 
    href="https://docs.google.com/forms/d/e/1FAIpQLSdFK0tGtkRgZkbE65s8wOoSNHssbOWPxNXv4bQ49R5eQpms4w/viewform?usp=dialog"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ color: "#D4A373" }}
    className="text-baluarte-text/50 font-sans text-sm font-medium transition-all uppercase tracking-widest cursor-pointer"
  >
    Como posso ajudar hoje?
  </motion.a>
</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}