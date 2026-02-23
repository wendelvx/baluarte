import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, CheckCircle2, Rocket, ArrowRight, 
  HelpCircle, ChevronLeft, ChevronRight, ZoomIn
} from 'lucide-react'
import { urlFor } from '../sanity'

// Versão Ultra-Light e Performática de carregamento
function SmartImage({ src, alt, className, objectFit = 'object-contain' }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative w-full h-full overflow-hidden ${!isLoaded ? 'animate-pulse bg-[#F3EFE6]' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${objectFit} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />
    </div>
  )
}

export default function ShopTeaser({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  if (!products || products.length === 0) return null

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(4)
      else if (window.innerWidth >= 640) setItemsPerPage(2)
      else setItemsPerPage(1)
    }
    updatePerPage()
    window.addEventListener('resize', updatePerPage)
    return () => window.removeEventListener('resize', updatePerPage)
  }, [])

  const maxIndex = Math.max(0, products.length - itemsPerPage)

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1)
    else setCurrentIndex(0) 
  }

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
    else setCurrentIndex(maxIndex)
  }

  const getStep = () => {
    if (itemsPerPage === 4) return 25
    if (itemsPerPage === 2) return 50
    return 100
  }

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <section id="shop" className="py-24 md:py-32 bg-baluarte-bg scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-baluarte-luz font-sans text-xs tracking-[0.5em] uppercase mb-4 block font-bold text-center md:text-left">
              Sementes de Amor
            </motion.span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-baluarte-vida font-serif leading-tight text-center md:text-left">
              Sua semente aqui, <br />
              <span className="italic text-baluarte-luz font-normal">muda a realidade de alguém.</span>
            </h2>
          </div>

          {products.length > itemsPerPage && (
            <div className="flex gap-4 pb-4">
              <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-baluarte-luz/20 flex items-center justify-center text-baluarte-vida hover:bg-baluarte-luz hover:text-white transition-all shadow-sm active:scale-90">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-baluarte-luz/20 flex items-center justify-center text-baluarte-vida hover:bg-baluarte-luz hover:text-white transition-all shadow-sm active:scale-90">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="relative touch-action-pan-y" style={{ touchAction: 'pan-y' }}>
          <motion.div 
            className="flex gap-8 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) nextSlide();
              else if (swipe > swipeConfidenceThreshold) prevSlide();
            }}
            animate={{ x: `calc(-${currentIndex * getStep()}% - ${currentIndex * 2}rem)` }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
          >
            {products.map((product) => (
              <div 
                key={product._id} 
                onClick={() => setSelectedProduct(product)} 
                onPointerDown={(e) => e.stopPropagation()}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] shrink-0 group cursor-pointer select-none"
              >
                <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden mb-6 p-6 flex items-center justify-center border border-baluarte-luz/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  <SmartImage 
                    src={urlFor(product.mainImage).width(500).format('webp').url()} 
                    alt={product.title}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-baluarte-vida text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-20">
                    R$ {product.price}
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-baluarte-vida text-center">{product.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-baluarte-luz font-bold text-center mt-2 opacity-60">
                  {product.category}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProductModal({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  
  // Capa + Galeria
  const images = [product.mainImage, ...(product.gallery || [])]

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-baluarte-text/98 backdrop-blur-2xl" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="relative w-full max-w-7xl bg-baluarte-bg md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-[85vh] z-[130]"
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }} 
          className="absolute top-4 right-4 z-[200] p-3 md:p-4 bg-baluarte-vida text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-white/20"
          style={{ backgroundColor: '#8B2635' }}
        >
          <X size={20} strokeWidth={3} />
        </button>
        
        {/* Lado da Imagem: Ajustado para não cortar */}
        <div className="w-full md:w-5/12 bg-[#F8F7F4] flex flex-col h-[45vh] md:h-full shrink-0 border-b md:border-b-0 md:border-r border-baluarte-luz/10">
          <div className="flex-1 flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeImg} 
                className="w-full h-full flex items-center justify-center cursor-zoom-in"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setIsZoomed(true)}
              >
                <div className="w-full h-full flex items-center justify-center p-2">
                  <SmartImage 
                    src={urlFor(images[activeImg]).width(1000).format('webp').url()} 
                    alt={product.title} 
                    className="max-h-full w-auto object-contain drop-shadow-xl"
                  />
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full text-baluarte-vida shadow-lg opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={18} />
                </div>
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
                <button onClick={(e) => { e.stopPropagation(); setActiveImg((prev) => (prev - 1 + images.length) % images.length) }} className="p-2 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-baluarte-vida hover:text-white transition-colors active:scale-90"><ChevronLeft size={18} /></button>
                <button onClick={(e) => { e.stopPropagation(); setActiveImg((prev) => (prev + 1) % images.length) }} className="p-2 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-baluarte-vida hover:text-white transition-colors active:scale-90"><ChevronRight size={18} /></button>
              </div>
            )}
          </div>
          
          <div className="p-3 flex gap-2 justify-center bg-white/30 border-t border-baluarte-luz/5 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-10 h-14 md:w-12 md:h-16 shrink-0 rounded-lg border-2 transition-all overflow-hidden ${activeImg === i ? 'border-baluarte-luz scale-105' : 'border-transparent opacity-50'}`}>
                <SmartImage src={urlFor(img).width(150).format('webp').url()} alt="mini" objectFit="object-cover" className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col bg-baluarte-bg relative min-h-0">
          <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 custom-scrollbar">
            <div className="space-y-10 pb-48">
              <header className="space-y-3">
                <span className="text-baluarte-luz font-sans text-[10px] tracking-widest uppercase font-bold">{product.category}</span>
                <h2 className="text-3xl md:text-5xl font-serif text-baluarte-vida leading-tight">{product.title}</h2>
                {product.tagline && <p className="text-baluarte-vida/60 font-serif italic text-lg mt-2">"{product.tagline}"</p>}
              </header>

              <section className="space-y-4">
                <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest border-b border-baluarte-luz/10 pb-2">Sobre este material</h4>
                <p className="text-baluarte-text/80 font-sans text-base leading-relaxed">{product.about}</p>
              </section>

              {product.customSection?.items?.length > 0 && (
                <section className="space-y-6">
                  <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest">{product.customSection.title}</h4>
                  <div className="grid gap-2">
                    {product.customSection.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-baluarte-luz/5 shadow-sm">
                        <CheckCircle2 className="text-baluarte-luz shrink-0 mt-0.5" size={16} />
                        <span className="text-baluarte-text/80 font-sans text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {product.features?.length > 0 && (
                <section className="bg-baluarte-vida text-white p-8 md:p-10 rounded-[2.5rem] relative shadow-xl overflow-hidden">
                  <Rocket className="absolute -right-4 -top-4 w-24 h-24 opacity-5 rotate-12" />
                  <h4 className="font-serif text-2xl mb-6 text-white">O que inclui:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm opacity-90 border-b border-white/5 pb-3">
                        <CheckCircle2 size={14} className="text-baluarte-luz" /> {f}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {product.faq?.length > 0 && (
                <section className="space-y-6">
                  <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <HelpCircle size={16} className="text-baluarte-luz" /> Perguntas Frequentes
                  </h4>
                  <div className="grid gap-3">
                    {product.faq.map((item, i) => (
                      <div key={i} className="bg-white p-5 rounded-xl border border-baluarte-luz/10 shadow-sm">
                        <p className="font-bold text-baluarte-vida text-sm mb-2">? {item.question}</p>
                        <p className="text-[13px] text-baluarte-text/60 italic leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-white/95 backdrop-blur-xl border-t border-baluarte-luz/10 z-[110]">
            <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
              <div className="shrink-0">
                <p className="text-[8px] md:text-[10px] uppercase text-baluarte-text/40 tracking-[0.2em] font-bold">Investimento Social</p>
                <span className="text-2xl md:text-4xl font-serif text-baluarte-vida">R$ {product.price}</span>
              </div>
              <motion.a
                href={product.checkoutUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none px-8 md:px-10 bg-baluarte-vida text-white py-4 md:py-5 rounded-full flex items-center justify-center gap-3 font-bold uppercase text-[10px] md:text-xs shadow-xl transition-all"
              >
                Garantir Material <ArrowRight size={14} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* OVERLAY DE ZOOM - AJUSTADO PARA SER INSTANTÂNEO E NÃO CORTAR */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }} // Transição ultra rápida
            className="fixed inset-0 z-[300] bg-baluarte-text/98 flex items-center justify-center p-4 md:p-12 cursor-zoom-out" 
            onClick={() => setIsZoomed(false)}
          >
            <motion.div 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }} // Movimento snappy
              className="w-full h-full flex items-center justify-center relative"
            >
               <img 
                 src={urlFor(images[activeImg]).width(1600).url()} 
                 alt="zoom" 
                 className="max-w-full max-h-full object-contain shadow-2xl rounded-lg" 
               />
               <button className="absolute top-0 right-0 -mt-10 text-white/60 hover:text-white flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-colors">
                 Clique para fechar <X size={14} />
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}