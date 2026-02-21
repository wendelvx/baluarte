import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, CheckCircle2, Sparkles, Smartphone, 
  BookOpen, Trophy, Rocket, ArrowRight, HelpCircle,
  ChevronLeft, ChevronRight, Heart
} from 'lucide-react'

// DATA: Estrutura completa com o conteúdo real do Lovable
const products = [
  {
    id: 1,
    title: "Conhecendo Deus",
    category: "Manual de Discipulado",
    image: "/images/shop-conhecendo-deus.webp", // Capa
    gallery: ["/images/shop-conhecendo-deus.webp", "/images/shop-conhecendo-deus-int.webp","/images/shop-conhecendo-deus-activity.webp"], // Imagens internas
    checkoutUrl: "https://pay.caktos.com.br/conhecendo-deus",
    tagline: "Porque conhecer o Pai é o primeiro passo para voar.",
    about: "O ebook 'Conhecendo Deus' é um manual prático inspirado pelo Espírito Santo para transformar corações desde cedo. Com 30 páginas, contém atividades, dinâmicas e orações que tornam o ensino bíblico claro e inesquecível.",
    benefits: [
      { label: "Ensino pronto para usar", desc: "Material completo para aplicar sem complicações." },
      { label: "Fundamentação Bíblica", desc: "Todo o conteúdo é alicerçado na Palavra de Deus." },
      { label: "Formação de Valores", desc: "Discipulado que molda a próxima geração." }
    ],
    features: [
      "4 Aulas completas e semanais",
      "Sugestões de músicas cristãs",
      "Pode ser impresso para uso físico",
      "Acesso imediato pelo celular"
    ],
    faq: [
      { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação, o link é enviado para o seu e-mail." },
      { q: "O material serve para qual idade?", a: "Ideal para crianças de 4 a 10 anos." }
    ]
  },
  {
    id: 2,
    title: "Atributos de Deus",
    category: "E-book Teológico",
    image: "/images/shop-atributos.webp",
    gallery: ["/images/shop-atributos.webp", "/images/shop-atributos-int.webp","/images/shop-atributos-activity.webp"],
    checkoutUrl: "https://pay.caktos.com.br/atributos-de-deus",
    tagline: "Ensinando quem Ele é, com a profundidade que eles merecem.",
    about: "Um guia cuidadosamente criado para professores e evangelistas. Ensina os atributos exclusivos de Deus de forma acessível, despertando nos pequenos discípulos um coração sensível à Sua presença.",
    benefits: [
      { label: "Clareza Teológica", desc: "Conceitos profundos explicados de forma simples." },
      { label: "Aulas Interativas", desc: "Material prático e aplicável ao ministério." },
      { label: "Propósito Real", desc: "Ensino focado em transformar gerações." }
    ],
    features: [
      "Explicação clara de cada Atributo",
      "Versículos bíblicos relacionados",
      "Atividades práticas e criativas",
      "Oração específica para cada aula"
    ],
    faq: [
      { q: "O e-book é vitalício?", a: "Sim, uma vez adquirido, ele é seu para sempre." }
    ]
  },
  {
    id: 3,
    title: "Álbum de Figurinhas",
    category: "Ferramenta Lúdica",
    image: "/images/shop-album.webp",
    gallery: ["/images/shop-album.webp", "/images/shop-album-int.webp"],
    checkoutUrl: "https://pay.caktos.com.br/album-figurinhas",
    tagline: "Onde cada versículo guardado no peito vira uma conquista.",
    about: "Transforme a memorização de versículos em uma aventura. O Álbum de Figurinhas permite premiar as crianças pelo aprendizado bíblico, tornando o estudo da Palavra envolvente e memorável.",
    benefits: [
      { label: "Incentivo Lúdico", desc: "Motive as crianças através do colecionismo." },
      { label: "Sistema de Mérito", desc: "Recompense o esforço no aprendizado bíblico." },
      { label: "Engajamento Total", desc: "Facilita o trabalho do professor em sala." }
    ],
    features: [
      "47 Figurinhas exclusivas",
      "Estrutura prática para líderes",
      "Motive a memorização de versículos",
      "Design focado no universo infantil"
    ],
    faq: [
      { q: "Quantas figurinhas vêm?", a: "O arquivo contém 47 figurinhas prontas para impressão." }
    ]
  },
  {
    id: 4,
    title: "30x Diversão",
    category: "Guia de Dinâmicas",
    image: "/images/shop-30x.webp",
    gallery: ["/images/shop-30x.webp", "/images/shop-30x-int.webp"],
    checkoutUrl: "https://pay.caktos.com.br/30x-diversao",
    tagline: "A alegria que ensina, a união que permanece.",
    about: "Descubra 30 brincadeiras prontas para eventos cristãos e ministério infantil. Passo a passo detalhado, penalidades criativas e dicas para estimular a cooperação em grupo.",
    benefits: [
      { label: "Dinâmicas Prontas", desc: "Passo a passo completo e fácil de seguir." },
      { label: "Para Todos os Grupos", desc: "Variações para crianças e adolescentes." },
      { label: "Baixo Custo, Alto Valor", desc: "Investimento único com impacto eterno." }
    ],
    features: [
      "30 Brincadeiras detalhadas",
      "Objetivos e lições definidos",
      "Penalidades criativas e seguras",
      "Acesso em qualquer dispositivo"
    ],
    faq: [
      { q: "Vem em PDF?", a: "Sim, download imediato em PDF de alta qualidade." }
    ]
  }
]

export default function ShopTeaser() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <section id="shop" className="py-24 md:py-32 bg-baluarte-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header de Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-baluarte-luz font-sans text-xs tracking-[0.5em] uppercase mb-4 block font-bold"
            >
              Curadoria de Propósito
            </motion.span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-baluarte-vida font-serif leading-tight">
              Sementes para um <br />
              <span className="italic text-baluarte-luz font-normal">futuro inesquecível.</span>
            </h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-xs text-baluarte-text/60 font-sans italic text-lg leading-relaxed border-l-2 border-baluarte-luz/20 pl-6">
            "Ao equipar seu ministério, você sustenta a proteção de centenas de crianças."
          </motion.p>
        </div>

        {/* Grid de Cards Editorial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer"
            >
              {/* Card Image: Contain para não cortar a capa */}
              <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden mb-6 p-6 flex items-center justify-center border border-baluarte-luz/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={product.image} 
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl" 
                  alt={product.title}
                />
                <div className="absolute inset-0 bg-baluarte-vida/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Overlay de Ação */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                   <div className="bg-baluarte-vida text-white text-[10px] font-bold uppercase tracking-widest text-center py-3 rounded-full shadow-xl">
                      Ver detalhes do material
                   </div>
                </div>
              </div>

              <div className="space-y-2 text-center md:text-left">
                <p className="text-[10px] uppercase tracking-widest text-baluarte-luz font-bold">{product.category}</p>
                <h3 className="font-serif text-2xl text-baluarte-vida group-hover:text-baluarte-luz transition-colors">
                  {product.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes (Landing Page Interna) */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProductModal({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  const images = product.gallery || [product.image]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-baluarte-text/95 backdrop-blur-xl"
      />

      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="relative w-full max-w-7xl bg-baluarte-bg md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-[90vh]"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-4 bg-white/10 hover:bg-baluarte-vida text-white rounded-full transition-all backdrop-blur-md">
          <X className="w-6 h-6" />
        </button>

        {/* Lado Esquerdo: Galeria de Fotos Internas */}
        <div className="md:w-1/2 bg-[#F3F3F3] relative flex flex-col items-center justify-center p-8 md:p-20">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={images[activeImg]}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full h-auto max-h-[60vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              alt={product.title}
            />
          </AnimatePresence>

          {/* Miniaturas de Preview */}
          <div className="absolute bottom-12 flex gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-14 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImg === i ? 'border-baluarte-luz scale-110' : 'border-transparent opacity-40'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          {images.length > 1 && (
             <div className="absolute top-1/2 inset-x-4 flex justify-between pointer-events-none">
                <button onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)} className="p-2 bg-white/20 hover:bg-white rounded-full text-baluarte-vida pointer-events-auto transition-all"><ChevronLeft /></button>
                <button onClick={() => setActiveImg((activeImg + 1) % images.length)} className="p-2 bg-white/20 hover:bg-white rounded-full text-baluarte-vida pointer-events-auto transition-all"><ChevronRight /></button>
             </div>
          )}
        </div>

        {/* Lado Direito: Conteúdo e Convite à Ação */}
        <div className="md:w-1/2 overflow-y-auto bg-white/40 backdrop-blur-sm p-8 md:p-20 custom-scrollbar">
          <div className="max-w-2xl pb-20">
            <span className="text-baluarte-luz font-sans text-xs tracking-[0.4em] uppercase mb-4 block font-bold">{product.category}</span>
            <h2 className="text-4xl md:text-6xl font-serif text-baluarte-vida mb-4 leading-tight">{product.title}</h2>
            <p className="text-baluarte-vida/60 font-serif italic text-2xl mb-12">"{product.tagline}"</p>

            <div className="space-y-16">
              {/* Seção Sobre */}
              <section>
                <h4 className="text-baluarte-vida font-bold text-xs uppercase tracking-[0.3em] border-b border-baluarte-luz/20 pb-3 mb-6">Manifesto do Material</h4>
                <p className="text-baluarte-text/80 font-sans text-lg leading-relaxed">{product.about}</p>
              </section>

              {/* Grid de Benefícios */}
              <section className="grid grid-cols-1 gap-6">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-white rounded-3xl border border-baluarte-luz/5 shadow-sm">
                    <div className="w-12 h-12 bg-baluarte-bg rounded-2xl flex items-center justify-center text-baluarte-luz shrink-0">
                      <Heart size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-baluarte-vida text-lg mb-1">{b.label}</p>
                      <p className="text-baluarte-text/60 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* Bloco: O que você recebe */}
              <section className="bg-baluarte-vida text-white p-10 rounded-[3rem] shadow-2xl relative">
                <Rocket className="absolute -top-6 -right-6 w-32 h-32 text-white/5 rotate-12" />
                <h4 className="font-serif text-3xl mb-8">Conteúdo Rico e Prático</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm opacity-90 border-b border-white/10 pb-4">
                      <CheckCircle2 className="text-baluarte-luz w-5 h-5 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ Final */}
              <section className="space-y-8">
                <h4 className="text-baluarte-vida font-bold text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> Dúvidas frequentes
                </h4>
                <div className="space-y-4">
                  {product.faq.map((item, i) => (
                    <div key={i} className="bg-baluarte-bg/50 p-6 rounded-2xl border border-baluarte-luz/10">
                      <p className="font-bold text-baluarte-vida mb-2">? {item.q}</p>
                      <p className="text-sm text-baluarte-text/60 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* CTA Sticky Footer (Preço Oculto) */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl -mx-8 md:-mx-20 px-8 md:px-20 py-8 border-t border-baluarte-luz/10 mt-12 z-20">
              <motion.a
                href={product.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-baluarte-vida text-white py-6 rounded-full flex items-center justify-center gap-4 font-bold tracking-[0.2em] uppercase text-xs shadow-2xl hover:bg-baluarte-vida/95 transition-all"
              >
                Eu quero meu material agora
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <p className="text-center mt-4 text-[10px] text-baluarte-text/30 uppercase tracking-[0.4em] font-bold">
                100% da arrecadação sustenta a nossa missão.
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}