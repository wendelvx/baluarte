import React, { useState, useEffect } from 'react'
import { urlFor } from '../sanity'

export default function Hero({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [isHovered, setIsHovered] = useState(false);

  if (!images) {
    return (
      <div className="w-full h-[300px] md:h-[450px] bg-gray-200 flex items-center justify-center text-gray-500">
        Carregando...
      </div>
    );
  }

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered]); // Recria o timer sempre que o índice ou o estado de hover mudar

  return (
    <section
      id="hero"
      // Adicionamos os eventos de Mouse para controlar o pause
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[300px] md:h-[450px] bg-gray-200 group"
    >
      <div className="w-full h-full overflow-hidden relative">
        
        <div 
          className="w-full h-full flex transition-transform duration-700 ease-out" // Aumentei para 700ms para ficar mais suave
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div
              key={img._key || index}
              className="min-w-full h-full relative"
            >
              <img
                src={img?.asset ? urlFor(img).width(1280).height(600).url() : ''}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-4xl font-bold px-4 text-center max-w-4xl drop-shadow-lg select-none">
                  Juntos fazemos a diferença
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition cursor-pointer z-10 hidden group-hover:block" // group-hover:block faz a seta aparecer só quando passa o rato
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition cursor-pointer z-10 hidden group-hover:block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>

    </section>
  )
}