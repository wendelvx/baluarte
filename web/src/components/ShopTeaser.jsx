import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, CheckCircle2, Sparkles, Rocket, ArrowRight, 
  HelpCircle, ChevronLeft, ChevronRight, ZoomOut
} from 'lucide-react'
import { urlFor } from '../sanity'

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
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1)
    } else {
      setCurrentIndex(0) 
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    } else {
      setCurrentIndex(maxIndex)
    }
  }

  const getStep = () => {
    if (itemsPerPage === 4) return 25
    if (itemsPerPage === 2) return 50
    return 100
  }

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
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-baluarte-luz/20 flex items-center justify-center text-baluarte-vida hover:bg-baluarte-luz hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-baluarte-luz/20 flex items-center justify-center text-baluarte-vida hover:bg-baluarte-luz hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <motion.div 
            className="flex gap-8"
            animate={{ 
              x: `calc(-${currentIndex * getStep()}% - ${currentIndex * 2}rem)` 
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {products.map((product) => (
              <div 
                key={product._id || product.title} 
                onClick={() => setSelectedProduct(product)} 
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] shrink-0 group cursor-pointer"
              >
                <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden mb-6 p-6 flex items-center justify-center border border-baluarte-luz/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  {product.mainImage && (
                    <img 
                      src={urlFor(product.mainImage).width(500).url()} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                      alt={product.title} 
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-baluarte-vida text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    R$ {product.price}
                  </div>
                </div>
                {/* Título Centralizado */}
                <h3 className="font-serif text-2xl text-baluarte-vida text-center">{product.title}</h3>
                {/* Categoria Centralizada para harmonia */}
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
  const images = product.gallery?.length > 0 ? product.gallery : [product.mainImage]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-baluarte-text/98 backdrop-blur-2xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-7xl bg-baluarte-bg md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-[85vh]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-[120] p-2 bg-baluarte-vida text-white rounded-full border border-white/10 hover:scale-110 shadow-xl transition-all"><X size={20} /></button>
        
        <div className="w-full md:w-5/12 bg-[#F8F7F4] flex flex-col h-[35vh] md:h-full shrink-0 border-b md:border-b-0 md:border-r border-baluarte-luz/10">
          <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                src={urlFor(images[activeImg]).width(800).url()} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl cursor-zoom-in" 
                onClick={() => setIsZoomed(true)} 
              />
            </AnimatePresence>
            {images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button onClick={(e) => { e.stopPropagation(); setActiveImg((prev) => (prev - 1 + images.length) % images.length) }} className="p-2 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-baluarte-vida hover:text-white transition-colors"><ChevronLeft size={18} /></button>
                <button onClick={(e) => { e.stopPropagation(); setActiveImg((prev) => (prev + 1) % images.length) }} className="p-2 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-baluarte-vida hover:text-white transition-colors"><ChevronRight size={18} /></button>
              </div>
            )}
          </div>
          <div className="p-3 flex gap-2 justify-center bg-white/50 border-t border-baluarte-luz/5 overflow-x-auto">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-10 h-14 shrink-0 rounded border-2 transition-all ${activeImg === i ? 'border-baluarte-luz scale-105 shadow-md' : 'border-transparent opacity-50'}`}>
                <img src={urlFor(img).width(100).url()} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col bg-baluarte-bg relative min-h-0">
          <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 scrollbar-hide md:scrollbar-default">
            <div className="space-y-12 pb-48">
              <header className="space-y-4">
                <span className="text-baluarte-luz font-sans text-[10px] tracking-widest uppercase font-bold">{product.category}</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-baluarte-vida leading-tight">{product.title}</h2>
                {product.tagline && <p className="text-baluarte-vida/60 font-serif italic text-lg mt-4 italic">"{product.tagline}"</p>}
              </header>
              <section className="space-y-4">
                <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest border-b border-baluarte-luz/10 pb-2">Sobre este material</h4>
                <p className="text-baluarte-text/80 font-sans text-base leading-relaxed">{product.about}</p>
              </section>
              {product.customSection?.items?.length > 0 && (
                <section className="space-y-6">
                  <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest">{product.customSection.title}</h4>
                  <div className="grid gap-3">
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
                  <h4 className="font-serif text-2xl mb-6 text-white text-left">O que inclui:</h4>
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
                className="flex-1 sm:flex-none px-6 md:px-10 bg-baluarte-vida text-white py-4 md:py-5 rounded-full flex items-center justify-center gap-3 font-bold uppercase text-[9px] md:text-xs shadow-xl transition-all"
              >
                Garantir Material <ArrowRight size={14} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isZoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-baluarte-text/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setIsZoomed(false)}>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} src={urlFor(images[activeImg]).url()} className="max-w-full max-h-full object-contain shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}