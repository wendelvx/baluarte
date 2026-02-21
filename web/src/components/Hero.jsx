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

  // AJUSTE 1: Texto agora fica visível até 80% do scroll, sumindo suavemente no final
  const opacityContent = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 1, 0])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]) // Movimento sutil de subida
  
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
      {/* 1. Camada de Imagens */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={urlFor(images[currentIndex]).width(1920).auto('format').url()}
            className="absolute inset-0 w-full h-full object-cover blur-[1px] scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        </AnimatePresence>
      </motion.div>

      {/* AJUSTE 2: Scrim Reforçado para tirar o excesso de branco */}
      {/* Escurece a imagem como um todo */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      
      {/* Gradiente de Topo (Preto para Transparente) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
      
      {/* Gradiente de Base (Transparente para a cor de fundo, mas começando bem embaixo) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-baluarte-bg via-baluarte-bg/20 to-transparent" />

      {/* 3. Conteúdo */}
      <motion.div 
        style={{ opacity: opacityContent, y: yText }}
        className="relative z-20 text-center px-6 max-w-4xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-baluarte-luz font-sans text-xs tracking-[0.5em] uppercase mb-10 font-bold"
        >
          Sertão do Ceará
        </motion.span>

        <h1 className="font-serif text-4xl md:text-7xl text-white leading-[1.15] mb-8 drop-shadow-2xl">
          No chão que a seca partiu, <br /> 
          <span className="italic text-baluarte-luz">somos o abraço que devolve a cor.</span>
        </h1>

        <div className="relative inline-block px-4 py-2 mb-12">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-xl -z-10" />
          <p className="text-white font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed antialiased">
            Acolhendo sonhos que o tempo tentou esquecer, através da fé, 
            do cuidado e da beleza da transformação humana.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a
            href="#about"
            className="group relative bg-baluarte-luz hover:bg-white text-baluarte-vida px-12 py-5 rounded-full transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 w-fit mx-auto"
          >
            <span className="font-bold tracking-[0.2em] uppercase text-xs">
              Conheça nossa essência
            </span>
            <div className="w-2 h-2 rounded-full bg-baluarte-vida animate-pulse" />
          </a>
        </motion.div>
      </motion.div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
         <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-48, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-baluarte-luz"
            />
         </div>
      </div>
    </section>
  )
}