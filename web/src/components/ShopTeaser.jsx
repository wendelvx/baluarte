import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, CheckCircle2, Sparkles, Smartphone,
  BookOpen, Trophy, Rocket, ArrowRight, HelpCircle,
  ChevronLeft, ChevronRight, Heart, ZoomIn, ZoomOut
} from 'lucide-react'

const products = [
  {
    id: 1,
    title: "Conhecendo Deus",
    category: "Manual de Discipulado",
    price: "9,99",
    image: "/images/shop-conhecendo-deus.webp",
    gallery: ["/images/shop-conhecendo-deus.webp", "/images/shop-conhecendo-deus-int.webp", "/images/shop-conhecendo-deus-activity.webp"],
    checkoutUrl: "https://pay.cakto.com.br/36cwo2t_592855",
    tagline: "Guiando os pequenos no caminho da Verdade.",
    about: "Um manual prático inspirado pelo Espírito Santo para transformar corações desde cedo. Ensine as crianças a conhecerem a Deus de forma clara, divertida e verdadeira!",
    benefits: [
      { label: "Ensino pronto para usar", desc: "Material completo para aplicar sem complicação." },
      { label: "Facilita o trabalho", desc: "Economize tempo no preparo com material estruturado." },
      { label: "Discipulado infantil", desc: "Ajuda a formar a próxima geração de cristãos." }
    ],
    features: ["Aulas Semanais Completas", "Baseado na Bíblia", "Sugestões de Músicas", "Atividades Práticas"],
    faq: [
      { q: "Posso aplicar as 4 aulas em um mês?", a: "Sim! Cada aula foi desenvolvida para ser aplicada semanalmente, garantindo um aprendizado progressivo durante um mês completo." },
      { q: "E-book digital ou impresso?", a: "Você escolhe! Pode ser usado em tablets e celulares ou impresso para uso físico. Ambas as formas são funcionais." },
      { q: "Para qual faixa etária é indicado?", a: "Especialmente para crianças de 4 a 10 anos, com atividades adaptáveis conforme a maturidade de cada grupo." },
      { q: "Preciso ter experiência?", a: "Não é necessário! O e-book traz orientações claras e práticas passo a passo para iniciantes." }
    ]
  },
  {
    id: 2,
    title: "Atributos de Deus",
    category: "E-book Teológico Infantil",
    price: "14,99",
    image: "/images/shop-atributos.webp",
    gallery: ["/images/shop-atributos.webp", "/images/shop-atributos-int.webp", "/images/shop-atributos-activity.webp"],
    checkoutUrl: "https://pay.cakto.com.br/bpww2oc_594093",
    tagline: "Quem Deus é? Ensine com profundidade e amor.",
    about: "Um manual prático e inspirador para ensinar os atributos exclusivos de Deus de forma clara e envolvente, despertando nos pequenos um coração sensível à Sua presença.",
    benefits: [
      { label: "Claro e Acessível", desc: "Ensine sobre Deus de forma simples às crianças." },
      { label: "Aulas Dinâmicas", desc: "Conteúdo interativo já pronto para usar." },
      { label: "Propósito Real", desc: "Inspiração para discipular com amor e verdade." }
    ],
    features: ["Explicação de Atributos", "Versículos Relacionados", "Atividades Criativas", "Orações Preparadas"],
    customSectionTitle: "O que você vai encontrar:",
    customSectionItems: [
      "Explicação dos atributos exclusivos de Deus",
      "Versículos bíblicos relacionados a cada atributo",
      "Atividades práticas e criativas",
      "Sugestões de músicas infantis cristãs",
      "Oração preparada para cada aula"
    ]
  },
  {
    id: 3,
    title: "Álbum de Figurinhas",
    category: "Ferramenta de Memorização",
    price: "7,99",
    image: "/images/shop-album.webp",
    gallery: ["/images/shop-album.webp", "/images/shop-album-int.webp", "/images/shop-album-activity.webp"],
    checkoutUrl: "https://pay.caktos.com.br/album-figurinhas",
    tagline: "Onde decorar a Palavra vira uma grande aventura.",
    about: "Motive as crianças a decorarem versículos bíblicos! Uma ferramenta completa para premiar o aprendizado e tornar o estudo da Bíblia divertido e memorável.",
    customSectionTitle: "Por que você vai amar este álbum?",
    customSectionItems: [
      "Incentiva memorização: Motiva as crianças a decorarem a Palavra de Deus",
      "Recompensa motivadora: Sistema de méritos divertido para o aprendizado",
      "Organiza o estudo: Estrutura interativa e prática para professores",
      "Facilita o trabalho: Ferramenta pronta para o Ministério Infantil",
      "47 figurinhas exclusivas: Para colecionar e distribuir como mérito",
      "Aprendizado divertido: Torna o estudo envolvente e memorável"
    ],
    features: ["47 Figurinhas Únicas", "Sistema de Mérito", "Arte Encantadora", "Fácil Impressão"]
  },
  {
    id: 4,
    title: "30x Diversão",
    category: "Guia de Dinâmicas",
    price: "9,99",
    image: "/images/shop-30x.webp",
    gallery: ["/images/shop-30x.webp", "/images/shop-30x-int.webp"],
    checkoutUrl: "https://pay.cakto.com.br/iox3x6i_589772",
    tagline: "A alegria que une, o Reino que cresce.",
    about: "30 brincadeiras com passo a passo detalhado para eventos cristãos e ministério infantil. Momentos inesquecíveis que estimulam cooperação e diversão.",
    benefits: [
      { label: "Dinâmicas Prontas", desc: "Para crianças, adolescentes e jovens." },
      { label: "Estimula Cooperação", desc: "Fomenta a criatividade e o trabalho em grupo." },
      { label: "Conteúdo Organizado", desc: "Passo a passo com dicas extras e penalidades." }
    ],
    features: ["30 Brincadeiras Completas", "Objetivos Definidos", "Dicas e Variações", "Download Imediato"],
    faq: [{ q: "Como recebo?", a: "O link de download é enviado ao seu e-mail após a confirmação." }]
  }
]

export default function ShopTeaser() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <section id="shop" className="py-24 md:py-32 bg-baluarte-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
  <div className="max-w-2xl text-center md:text-left">
    <motion.span 
      initial={{ opacity: 0, y: 10 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      className="text-baluarte-luz font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4 block font-bold"
    >
      Sementes de Amor
    </motion.span>
    <h2 className="text-4xl md:text-6xl lg:text-7xl text-baluarte-vida font-serif leading-tight">
      Materiais que preparam as suas mãos, <br />
      <span className="italic text-baluarte-luz font-normal">e abraçam o coração deles.</span>
    </h2>
  </div>

  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    className="max-w-md text-center md:text-right"
  >
    <p className="text-baluarte-text/70 text-lg leading-relaxed font-sans italic border-r-0 md:border-r-2 border-baluarte-luz/20 pr-0 md:pr-6 mb-4">
      "Ao escolher um material, você não apenas enriquece o seu ministério, mas se torna o milagre na vida de uma criança. <span className="text-baluarte-vida font-bold">Cada página que você usa aqui, vira um sorriso que floresce lá no sertão.</span>"
    </p>
    <p className="text-[10px] uppercase tracking-[0.2em] text-baluarte-luz font-bold">
      O valor de cada material sustenta o nosso Mercado Social
    </p>
  </motion.div>
</div>
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
              <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden mb-6 p-6 flex items-center justify-center border border-baluarte-luz/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img src={product.image} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl" alt={product.title} />
                <div className="absolute top-4 right-4 bg-baluarte-vida text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">R$ {product.price}</div>
                <div className="absolute inset-0 bg-baluarte-vida/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2 px-2 text-center md:text-left">
                <p className="text-[10px] uppercase tracking-widest text-baluarte-luz font-bold">{product.category}</p>
                <h3 className="font-serif text-2xl text-baluarte-vida group-hover:text-baluarte-luz transition-colors leading-tight">{product.title}</h3>
              </div>
            </motion.div>
          ))}
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
  const [hasScrolled, setHasScrolled] = useState(false) // Estado para o scroll hint
  const images = product.gallery || [product.image]

  const nextImg = (e) => { e.stopPropagation(); setActiveImg((prev) => (prev + 1) % images.length); }
  const prevImg = (e) => { e.stopPropagation(); setActiveImg((prev) => (prev - 1 + images.length) % images.length); }

  // Função para esconder o hint de scroll ao mover
  const handleScroll = (e) => {
    if (e.target.scrollTop > 20) setHasScrolled(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-baluarte-text/98 backdrop-blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
        className="relative w-full max-w-7xl bg-baluarte-bg md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[95vh] md:h-[85vh] lg:h-[90vh]"
      >
        {/* BOTÃO FECHAR - Mais discreto no mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-baluarte-vida text-white rounded-full transition-all hover:scale-110 shadow-2xl border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* COLUNA ESQUERDA: Galeria (Altura reduzida no mobile para sobrar texto) */}
        <div className="w-full md:w-1/2 lg:w-5/12 bg-[#F8F7F4] relative flex flex-col h-[35vh] md:h-auto border-b md:border-b-0 md:border-r border-baluarte-luz/10">
          <div className="flex-1 flex items-center justify-center p-8 md:p-12 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="relative cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              >
                <img src={images[activeImg]} className="max-w-full max-h-[25vh] md:max-h-[55vh] object-contain drop-shadow-2xl" alt={product.title} />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button onClick={prevImg} className="p-2 bg-white/90 text-baluarte-vida rounded-full pointer-events-auto shadow-lg hover:bg-baluarte-vida hover:text-white transition-all"><ChevronLeft size={18} /></button>
                <button onClick={nextImg} className="p-2 bg-white/90 text-baluarte-vida rounded-full pointer-events-auto shadow-lg hover:bg-baluarte-vida hover:text-white transition-all"><ChevronRight size={18} /></button>
              </div>
            )}
          </div>
          
          <div className="p-3 flex gap-2 justify-center bg-white/50 backdrop-blur-sm border-t border-baluarte-luz/5">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-10 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-baluarte-luz scale-105 shadow-md' : 'border-transparent opacity-40'}`}>
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA: Conteúdo */}
        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col flex-1 bg-baluarte-bg relative min-h-0">
          
          {/* INDICADOR DE SCROLL (Mobile Only) */}
          <AnimatePresence>
            {!hasScrolled && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30 md:hidden bg-baluarte-vida/90 text-white px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 shadow-xl backdrop-blur-sm"
              >
                <Sparkles size={10} className="text-baluarte-luz" /> Role para detalhes
              </motion.div>
            )}
          </AnimatePresence>

          {/* ÁREA DE SCROLL */}
          <div 
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 custom-scrollbar pb-32 md:pb-40"
          >
            <div className="space-y-12 md:space-y-16">
              <header>
                <span className="text-baluarte-luz font-sans text-[10px] tracking-widest uppercase font-bold">{product.category}</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-baluarte-vida mt-2 mb-4 leading-tight">{product.title}</h2>
                <p className="text-baluarte-vida/60 font-serif italic text-lg md:text-xl leading-relaxed">"{product.tagline}"</p>
              </header>

              <section className="space-y-4">
                <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest border-b border-baluarte-luz/10 pb-2">Sobre este material</h4>
                <p className="text-baluarte-text/80 font-sans text-base md:text-lg leading-relaxed">{product.about}</p>
              </section>

              {/* Seção Customizada */}
              {product.customSectionTitle && (
                <section className="space-y-6">
                  <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest">{product.customSectionTitle}</h4>
                  <div className="grid gap-3">
                    {product.customSectionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-baluarte-luz/5">
                        <CheckCircle2 className="text-baluarte-luz shrink-0 mt-0.5" size={16} />
                        <span className="text-baluarte-text/80 font-sans text-sm md:text-base leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Benefícios */}
              {product.benefits && (
                <section className="grid gap-4">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-baluarte-luz/5">
                      <div className="w-8 h-8 bg-baluarte-bg rounded-lg flex items-center justify-center text-baluarte-luz shrink-0"><Heart size={14} /></div>
                      <div>
                        <p className="font-bold text-baluarte-vida text-sm md:text-base">{b.label}</p>
                        <p className="text-baluarte-text/60 text-[13px] leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Bloco de Recursos (Escuro) */}
              <section className="bg-baluarte-vida text-white p-8 md:p-10 rounded-[2.5rem] relative shadow-xl overflow-hidden">
                <Rocket className="absolute -right-4 -top-4 w-24 h-24 opacity-5 rotate-12" />
                <h4 className="font-serif text-2xl mb-6">O que inclui:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm opacity-90 border-b border-white/5 pb-3">
                      <CheckCircle2 size={14} className="text-baluarte-luz shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              {product.faq && (
                <section className="space-y-6">
                  <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <HelpCircle size={16} className="text-baluarte-luz" /> Dúvidas comuns
                  </h4>
                  <div className="grid gap-3">
                    {product.faq.map((item, i) => (
                      <div key={i} className="bg-[#F8F7F4] p-5 rounded-xl border border-baluarte-luz/5">
                        <p className="font-bold text-baluarte-vida text-sm mb-1">{item.q}</p>
                        <p className="text-[13px] text-baluarte-text/60 italic">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* DOCK DE CHECKOUT REFORMULADO */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-white/95 backdrop-blur-2xl border-t border-baluarte-luz/10 z-50">
            {/* Gradiente de proteção para o texto não sumir bruscamente */}
            <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
              <div>
                <p className="text-[8px] md:text-[10px] uppercase text-baluarte-text/40 tracking-[0.2em] font-bold">Investimento</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl md:text-4xl font-serif text-baluarte-vida">R$ {product.price}</span>
                </div>
              </div>

              <motion.a
                href={product.checkoutUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none px-6 md:px-10 bg-baluarte-vida text-white py-4 md:py-5 rounded-full flex items-center justify-center gap-3 font-bold tracking-widest uppercase text-[9px] md:text-xs shadow-xl transition-all"
              >
                Garantir Material <ArrowRight size={14} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ZOOM OVERLAY */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-baluarte-text/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button className="absolute top-6 right-6 text-white scale-150"><ZoomOut /></button>
            <motion.img
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={images[activeImg]} className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}