import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { urlFor } from '../sanity'

export default function Hero({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // AJUSTE DE RETENÇÃO: Agora o conteúdo fica 100% visível até 60% do scroll (0.6)
  // e termina de sumir apenas em 95% (0.95), evitando que o botão suma rápido demais.
  const opacityContent = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 1, 0])
  
  // Parallax mais sutil para não "expulsar" o texto da tela muito rápido
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [images.length])

  if (!images.length) return null

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      {/* Camada de Imagens (Fundo) */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={urlFor(images[currentIndex]).width(1920).auto('format').url()}
            className="absolute inset-0 w-full h-full object-cover blur-[1px] scale-105"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Scrims de Proteção Editorial */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-transparent to-baluarte-bg" />

      {/* Conteúdo Centralizado Responsivo */}
      <motion.div 
        style={{ opacity: opacityContent, y: yText }}
        className="relative z-20 w-full max-w-6xl px-6 flex flex-col items-center justify-center text-center mt-8 md:mt-0"
      >
        {/* Label Superior */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-baluarte-luz font-sans text-[10px] md:text-xs uppercase mb-4 md:mb-6 font-bold tracking-[0.4em] md:tracking-[0.6em]"
        >
          Um encontro que muda destinos
        </motion.span>

        {/* Título Principal */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 md:mb-8 drop-shadow-2xl">
          Ninguém nasce para <br /> 
          <span className="italic text-baluarte-luz font-normal">ser esquecido por Deus.</span>
        </h1>

        {/* Bloco de Texto (Box de Leitura) */}
        <div className="relative inline-block w-full max-w-3xl px-4 md:px-10 py-6 md:py-8 mb-8 md:mb-12">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] -z-10 border border-white/10" />
          
          <p className="font-sans text-white text-base md:text-xl lg:text-2xl leading-relaxed antialiased opacity-90">
            Cada criança é uma promessa sagrada que espera por alguém que a veja de verdade. 
            <span className="hidden sm:inline text-baluarte-luz font-medium"> A Missão Baluarte devolve </span> 
            o direito de pertencer, de sorrir e de ser amado.
          </p>
        </div>

        {/* CTA Premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full flex flex-col items-center"
        >
          <a
            href="#about"
            className="group relative bg-white text-baluarte-vida px-10 md:px-16 py-5 md:py-6 rounded-full transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 w-fit overflow-hidden hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-baluarte-luz w-0 group-hover:w-full transition-all duration-500 ease-out" />
            <span className="relative z-10 font-sans font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs group-hover:text-white transition-colors duration-500">
              Quero abraçar esta causa
            </span>
            <ArrowRight size={16} className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          
          <p className="font-sans text-white/40 text-[9px] md:text-[10px] mt-4 md:mt-6 uppercase tracking-[0.3em]">
            Onde o seu sim encontra a vida deles.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3">
         <span className="text-white/20 text-[9px] uppercase tracking-[0.4em]">Scroll</span>
         <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 via-baluarte-luz to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [-48, 48] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-white/40"
            />
         </div>
      </div>
    </section>
  )
}

function ArrowRight({ size = 16, className }) {
  return (
    <svg width={size} height={size} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}