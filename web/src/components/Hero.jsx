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

  // Ajuste de Opacidade: Começa a sumir um pouco antes para um efeito mais limpo
  const opacityContent = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0])
  
  // AJUSTE DE MOVIMENTO: Agora o texto SOBE (-100) em vez de cair. 
  // Isso evita que o botão "vaze" para a seção de baixo.
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

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
      className="relative w-full h-[95vh] md:h-screen overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      {/* Camada de Imagens */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={urlFor(images[currentIndex]).width(1920).auto('format').url()}
            className="absolute inset-0 w-full h-full object-cover blur-[1px] scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Scrims de Proteção */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-baluarte-bg" />

      {/* Conteúdo Centralizado */}
      <motion.div 
        style={{ opacity: opacityContent, y: yText }}
        // AJUSTE DE POSIÇÃO: pt-32 garante que o texto comece abaixo do Header
        className="relative z-20 text-center px-6 max-w-5xl pt-32 md:pt-40"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-block text-baluarte-luz font-sans text-xs uppercase mb-8 font-bold tracking-[0.5em]"
        >
          Um encontro que muda destinos
        </motion.span>

        <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-10 drop-shadow-2xl">
          Ninguém nasce para <br /> 
          <span className="italic text-baluarte-luz">ser esquecido por Deus.</span>
        </h1>

        <div className="relative inline-block px-8 py-6 mb-12">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xl rounded-3xl -z-10 border border-white/10" />
          
          <p className="font-sans text-white text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed antialiased opacity-95">
            Cada criança é uma promessa sagrada que espera, em silêncio, por alguém que a veja de verdade. 
            <span className="text-baluarte-luz font-medium"> A Missão Baluarte não entrega apenas ajuda; </span> 
            nós devolvemos o direito de pertencer, de sorrir e de ser amado.
          </p>
        </div>

        {/* CTA Premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <a
            href="#about"
            className="group relative bg-white text-baluarte-vida px-16 py-6 rounded-full transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center gap-4 w-fit mx-auto overflow-hidden hover:scale-105"
          >
            <div className="absolute inset-0 bg-baluarte-luz w-0 group-hover:w-full transition-all duration-500 ease-out" />
            <span className="relative z-10 font-sans font-bold tracking-[0.2em] uppercase text-xs group-hover:text-white transition-colors duration-500">
              Eu quero abraçar esta causa
            </span>
          </a>
          <p className="font-sans text-white/40 text-[10px] mt-6 uppercase tracking-[0.3em]">Onde o seu sim encontra a vida deles.</p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
         <div className="w-[1px] h-14 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-56, 56] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-baluarte-luz"
            />
         </div>
      </div>
    </section>
  )
}