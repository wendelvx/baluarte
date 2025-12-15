import React, { useEffect, useRef, useState } from 'react'
import { urlFor } from '../sanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Hero({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [loaded, setLoaded] = useState({})

  const startX = useRef(0)
  const endX = useRef(0)
  const heroRef = useRef(null)

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  if (!images.length) {
    return (
      <div className="w-full h-[260px] md:h-[420px] bg-slate-100 flex items-center justify-center animate-pulse text-slate-500">
        Carregando galeria...
      </div>
    )
  }

  const nextSlide = () => {
    setIsPaused(true)
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setIsPaused(true)
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    if (isPaused || !isVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused, isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    )

    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches[0].clientX
    const diff = startX.current - endX.current

    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide()
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-slate-100"
      onMouseEnter={() => !isTouchDevice && setIsPaused(true)}
      onMouseLeave={() => !isTouchDevice && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => {
          const dimensions = img?.asset?.metadata?.dimensions
          const isVertical =
            dimensions && dimensions.height > dimensions.width

          const isLoaded = loaded[index]

          return (
            <div
              key={img._key || index}
              className="min-w-full h-[260px] md:h-[420px] relative bg-slate-200"
            >
              {isVertical && (
                <img
                  src={urlFor(img)
                    .width(1600)
                    .fit('crop')
                    .auto('format')
                    .quality(35)
                    .url()}
                  aria-hidden
                  className={`
                    hidden md:block
                    absolute inset-0
                    w-full h-full
                    object-cover
                    blur-xl scale-105
                    transition-opacity duration-700
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                  `}
                />
              )}

              <img
                src={urlFor(img)
                  .width(1400)
                  .fit('max')
                  .auto('format')
                  .quality(80)
                  .url()}
                alt={img.caption || `Slide ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                onLoad={() =>
                  setLoaded((prev) => ({ ...prev, [index]: true }))
                }
                className={`
                  relative z-10
                  w-full h-full
                  object-contain object-center
                  transition-opacity duration-700
                  ${isLoaded ? 'opacity-100' : 'opacity-0'}
                `}
              />

              {img.caption && (
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-900/55 via-slate-900/25 to-transparent flex items-end justify-center pb-6">
                  <p className="text-white text-sm md:text-xl font-medium px-6 max-w-4xl text-center leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="w-5 h-5 text-slate-700" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsPaused(true)
              setCurrentIndex(index)
            }}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${currentIndex === index
                ? 'w-6 bg-slate-500'
                : 'w-2 bg-slate-300 hover:bg-slate-400'}
            `}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
