import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, CheckCircle2, Sparkles, Rocket, ArrowRight, 
  HelpCircle, ChevronLeft, ChevronRight, Heart, ZoomOut
} from 'lucide-react'

// Array de produtos com FAQ corrigido para o "30x Diversão"
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
      { label: "Facilita o trabalho", desc: "Economize tempo no preparo com material estruturado." }
    ],
    features: ["Aulas Semanais Completas", "Baseado na Bíblia", "Sugestões de Músicas", "Atividades Práticas"],
    faq: [
      { q: "Posso aplicar as 4 aulas em um mês?", a: "Sim! Cada aula foi desenvolvida para ser aplicada semanalmente, garantindo um aprendizado progressivo durante um mês completo." },
      { q: "E-book digital ou impresso?", a: "Você escolhe! Pode ser usado em tablets e celulares ou impresso para uso físico. Ambas as formas são funcionais." },
      { q: "Para qual faixa etária é indicado?", a: "Especialmente para crianças de 4 a 10 anos, com atividades adaptáveis." }
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
    about: "Um manual prático para ensinar os atributos exclusivos de Deus de forma clara e envolvente.",
    features: ["Explicação de Atributos", "Versículos Relacionados", "Atividades Criativas", "Orações Preparadas"],
    customSectionTitle: "O que você vai encontrar:",
    customSectionItems: [
      "Explicação dos atributos exclusivos de Deus",
      "Versículos bíblicos relacionados",
      "Atividades práticas e criativas"
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
    about: "Motive as crianças a decorarem versículos bíblicos! Uma ferramenta completa para premiar o aprendizado.",
    customSectionTitle: "Por que você vai amar este álbum?",
    customSectionItems: [
      "Incentiva memorização da Palavra",
      "Sistema de méritos divertido",
      "47 figurinhas exclusivas"
    ],
    features: ["47 Figurinhas Únicas", "Sistema de Mérito", "Arte Encantadora"]
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
    about: "30 brincadeiras com passo a passo detalhado para ministério infantil. Momentos inesquecíveis que estimulam cooperação.",
    features: ["30 Brincadeiras Completas", "Objetivos Definidos", "Download Imediato"],
    faq: [
      { q: "Como vou receber?", a: "Link enviado ao e-mail após a confirmação. Acesso imediato e vitalício." },
      { q: "Qual a faixa etária?", a: "Adaptável para crianças, adolescentes e jovens." },
      { q: "Tem garantia?", a: "Sim, garantimos a entrega e oferecemos suporte técnico total." }
    ]
  }
]

export default function ShopTeaser() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <section id="shop" className="py-24 md:py-32 bg-baluarte-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-baluarte-luz font-sans text-xs tracking-[0.5em] uppercase mb-4 block font-bold text-center md:text-left">
            Sementes de Amor
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-baluarte-vida font-serif leading-tight text-center md:text-left">
            Sua semente aqui, <br />
            <span className="italic text-baluarte-luz font-normal">vira o pão e o sorriso de uma criança.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden mb-6 p-6 flex items-center justify-center border border-baluarte-luz/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img src={product.image} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" alt={product.title} />
                <div className="absolute top-4 right-4 bg-baluarte-vida text-white text-[10px] font-bold px-3 py-1 rounded-full">R$ {product.price}</div>
              </div>
              <h3 className="font-serif text-2xl text-baluarte-vida text-center md:text-left">{product.title}</h3>
            </div>
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
  const [hasScrolled, setHasScrolled] = useState(false)
  const images = product.gallery || [product.image]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-baluarte-text/98 backdrop-blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-7xl bg-baluarte-bg md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-[85vh] lg:h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-[120] p-2 bg-baluarte-vida text-white rounded-full border border-white/10 hover:scale-110 shadow-xl transition-all"><X size={20} /></button>

        {/* Coluna Galeria - h-auto md:h-full garante que ela preencha o modal */}
        <div className="w-full md:w-5/12 bg-[#F8F7F4] flex flex-col h-[35vh] md:h-full shrink-0 border-b md:border-b-0 md:border-r border-baluarte-luz/10">
          <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImg} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                src={images[activeImg]} 
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
          <div className="p-3 flex gap-2 justify-center bg-white/50 border-t border-baluarte-luz/5">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-10 h-14 rounded border-2 ${activeImg === i ? 'border-baluarte-luz scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-100 transition-all'}`}><img src={img} className="w-full h-full object-cover" /></button>
            ))}
          </div>
        </div>

        {/* Coluna Conteúdo - min-h-0 é essencial para o scroll funcionar em Flex */}
        <div className="w-full md:w-7/12 flex flex-col bg-baluarte-bg relative min-h-0">
          
          <AnimatePresence>
            {!hasScrolled && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-4 left-1/2 -translate-x-1/2 z-30 md:hidden bg-baluarte-vida/90 text-white px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                <Sparkles size={10} className="text-baluarte-luz" /> Role para detalhes
              </motion.div>
            )}
          </AnimatePresence>

          <div 
            onScroll={(e) => { if (e.target.scrollTop > 20) setHasScrolled(true) }}
            className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 scrollbar-hide md:scrollbar-default"
          >
            {/* O padding-bottom pb-48 garante que o conteúdo nunca pare atrás do dock fixo */}
            <div className="space-y-12 pb-48 md:pb-56">
              <header className="space-y-4">
                <span className="text-baluarte-luz font-sans text-[10px] tracking-widest uppercase font-bold">{product.category}</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-baluarte-vida leading-tight">{product.title}</h2>
                <p className="text-baluarte-vida/60 font-serif italic text-lg mt-4 italic">"{product.tagline}"</p>
              </header>

              <section className="space-y-4">
                <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest border-b border-baluarte-luz/10 pb-2">Sobre este material</h4>
                <p className="text-baluarte-text/80 font-sans text-base leading-relaxed">{product.about}</p>
              </section>

              {product.customSectionTitle && (
                <section className="space-y-6">
                  <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest">{product.customSectionTitle}</h4>
                  <div className="grid gap-3">
                    {product.customSectionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-baluarte-luz/5 shadow-sm">
                        <CheckCircle2 className="text-baluarte-luz shrink-0 mt-0.5" size={16} />
                        <span className="text-baluarte-text/80 font-sans text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

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

              {product.faq && (
                <section className="space-y-6">
                  <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <HelpCircle size={16} className="text-baluarte-luz" /> Perguntas Frequentes
                  </h4>
                  <div className="grid gap-3">
                    {product.faq.map((item, i) => (
                      <div key={i} className="bg-white p-5 rounded-xl border border-baluarte-luz/10 shadow-sm">
                        <p className="font-bold text-baluarte-vida text-sm mb-2">? {item.q}</p>
                        <p className="text-[13px] text-baluarte-text/60 italic leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Dock de Checkout - Fixo no rodapé da coluna da direita */}
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

      {/* Zoom Overlay (Reintroduzido e Corrigido) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-baluarte-text/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setIsZoomed(false)}>
            <button className="absolute top-6 right-6 text-white scale-150 transition-transform hover:rotate-90"><ZoomOut /></button>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} src={images[activeImg]} className="max-w-full max-h-full object-contain shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}