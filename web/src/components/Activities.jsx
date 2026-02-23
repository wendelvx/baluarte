import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '../sanity'
import { PortableText } from '@portabletext/react'

// Versão Ultra-Light do carregamento de imagem
function SmartImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative w-full h-full overflow-hidden ${!isLoaded ? 'animate-pulse bg-[#F3EFE6]' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 object-cover`}
      />
    </div>
  )
}

export default function Activities({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3)
      else if (window.innerWidth >= 640) setItemsPerPage(2)
      else setItemsPerPage(1)
    }
    updatePerPage()
    window.addEventListener('resize', updatePerPage)
    return () => window.removeEventListener('resize', updatePerPage)
  }, [])

  const maxIndex = Math.max(0, projects.length - itemsPerPage)

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1)
    else setCurrentIndex(0)
  }

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
    else setCurrentIndex(maxIndex)
  }

  const getMovePercent = () => {
    if (itemsPerPage === 3) return `calc(-${currentIndex * 33.333}% - ${currentIndex * 1.66}rem)`
    if (itemsPerPage === 2) return `calc(-${currentIndex * 50}% - ${currentIndex * 1.25}rem)`
    return `calc(-${currentIndex * 100}% - ${currentIndex * 2.5}rem)`
  }

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <section id="activities" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-center md:text-left">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-baluarte-luz font-sans text-[10px] tracking-[0.5em] uppercase font-bold block mb-4">
              A Fé em Ação
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-baluarte-vida font-serif">
              Projetos que <span className="italic text-baluarte-luz">transformam o hoje.</span>
            </h2>
          </div>

          {projects.length > itemsPerPage && (
            <div className="flex gap-4 pb-2">
              <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-baluarte-luz/20 flex items-center justify-center text-baluarte-vida hover:bg-baluarte-luz hover:text-white transition-all shadow-sm">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="w-14 h-14 rounded-full border border-baluarte-luz/20 flex items-center justify-center text-baluarte-vida hover:bg-baluarte-luz hover:text-white transition-all shadow-sm">
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        <div className="relative touch-action-pan-y" style={{ touchAction: 'pan-y' }}>
          <motion.div 
            className="flex gap-10 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) nextSlide();
              else if (swipe > swipeConfidenceThreshold) prevSlide();
            }}
            animate={{ x: getMovePercent() }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                onClick={() => setSelectedProject(project)}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.66rem)] shrink-0 group relative h-[500px] rounded-[3rem] overflow-hidden bg-baluarte-vida shadow-xl select-none"
              >
                <SmartImage 
                  src={urlFor(project.mainImage).width(800).format('webp').url()} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full opacity-70 group-hover:opacity-50 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-baluarte-vida via-baluarte-vida/30 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-serif text-baluarte-luz mb-3">{project.title}</h3>
                  <p className="text-white/70 font-sans text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.summary}</p>
                  <div className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                    <div className="w-8 h-[1px] bg-baluarte-luz" /> Conhecer Propósito
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-baluarte-vida/95 backdrop-blur-md" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-baluarte-bg rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh]"
      >
        {/* BOTÃO X CORRIGIDO: Agora com fundo sólido e cor da marca para máxima visibilidade */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-[110] p-3 bg-baluarte-vida text-white rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90 border border-white/20"
          aria-label="Fechar"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <div className="w-full md:w-1/2 h-72 md:h-auto relative shrink-0">
          <SmartImage src={urlFor(project.mainImage).width(1000).format('webp').url()} alt={project.title} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-baluarte-bg via-baluarte-bg/20 to-transparent md:hidden" />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto bg-baluarte-bg">
          <div className="space-y-8">
            <header>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-baluarte-luz/10 text-baluarte-luz text-[10px] font-bold uppercase tracking-widest mb-4">
                <Info size={12} /> Impacto Real
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-baluarte-vida leading-tight">{project.title}</h2>
            </header>

            <div className="text-baluarte-text/80 font-sans text-base leading-relaxed">
              <p className="font-bold text-baluarte-vida mb-8 border-l-2 border-baluarte-luz pl-4 italic">{project.summary}</p>
              <div className="prose prose-baluarte max-w-none antialiased">
                <PortableText value={project.description} />
              </div>
            </div>

            <footer className="pt-8 border-t border-baluarte-luz/10">
              <button onClick={onClose} className="w-full px-8 py-5 rounded-full bg-baluarte-vida text-white font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-3">
                Apoiar este propósito <ArrowRight size={14} />
              </button>
            </footer>
          </div>
        </div>
      </motion.div>
    </div>
  )
}