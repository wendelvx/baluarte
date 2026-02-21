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
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-baluarte-luz font-sans text-xs tracking-[0.5em] uppercase mb-4 block font-bold">
              Curadoria de Propósito
            </motion.span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-baluarte-vida font-serif leading-tight">
              Sementes para um <br />
              <span className="italic text-baluarte-luz font-normal">futuro inesquecível.</span>
            </h2>
          </div>
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
  const images = product.gallery || [product.image]

  const nextImg = (e) => { e.stopPropagation(); setActiveImg((prev) => (prev + 1) % images.length); }
  const prevImg = (e) => { e.stopPropagation(); setActiveImg((prev) => (prev - 1 + images.length) % images.length); }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-baluarte-text/95 backdrop-blur-xl" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-7xl bg-baluarte-bg md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-[90vh]"
      >
        {/* BOTÃO FECHAR - Visível em qualquer fundo */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-[70] p-3 bg-baluarte-vida text-white rounded-full transition-all hover:scale-110 shadow-2xl border-2 border-white/20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* COLUNA ESQUERDA: Galeria Editorial */}
        <div className="w-full md:w-5/12 bg-[#F8F7F4] relative flex flex-col h-[40vh] md:h-auto border-b md:border-b-0 md:border-r border-baluarte-luz/10">
          <div className="flex-1 flex items-center justify-center p-12 overflow-hidden relative group">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeImg}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="relative cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              >
                <img src={images[activeImg]} className="max-w-full max-h-[25vh] md:max-h-[50vh] object-contain drop-shadow-2xl" alt={product.title} />
              </motion.div>
            </AnimatePresence>

            {/* Setas de Navegação */}
            {images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button onClick={prevImg} className="p-3 bg-white/90 text-baluarte-vida rounded-full pointer-events-auto shadow-xl hover:bg-baluarte-vida hover:text-white transition-all"><ChevronLeft size={20}/></button>
                <button onClick={nextImg} className="p-3 bg-white/90 text-baluarte-vida rounded-full pointer-events-auto shadow-xl hover:bg-baluarte-vida hover:text-white transition-all"><ChevronRight size={20}/></button>
              </div>
            )}
          </div>

          {/* Miniaturas de Navegação */}
          <div className="p-4 flex gap-3 justify-center bg-white/30 backdrop-blur-sm">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-12 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-baluarte-luz scale-105' : 'border-transparent opacity-40'}`}>
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA: Conteúdo e Dock de Checkout */}
        <div className="w-full md:w-7/12 flex flex-col h-[60vh] md:h-auto bg-baluarte-bg relative">
          
          {/* ÁREA DE SCROLL: Com padding extra na base para não overlapar o dock */}
          <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar pb-48 md:pb-40">
            <div className="max-w-2xl space-y-16">
              <header>
                <span className="text-baluarte-luz font-sans text-xs tracking-widest uppercase font-bold">{product.category}</span>
                <h2 className="text-4xl md:text-6xl font-serif text-baluarte-vida mt-2 mb-6 leading-tight">{product.title}</h2>
                <p className="text-baluarte-vida/60 font-serif italic text-xl md:text-2xl leading-relaxed">"{product.tagline}"</p>
              </header>

              <section className="space-y-6">
                <h4 className="text-baluarte-vida font-bold text-xs uppercase tracking-widest border-b border-baluarte-luz/20 pb-2">Manifesto do Material</h4>
                <p className="text-baluarte-text/80 font-sans text-lg leading-relaxed">{product.about}</p>
              </section>

              {/* Seção Customizada (Álbum / Atributos) */}
              {product.customSectionTitle && (
                 <section className="space-y-8">
                   <h4 className="text-baluarte-vida font-bold text-xs uppercase tracking-widest">{product.customSectionTitle}</h4>
                   <div className="grid gap-4">
                     {product.customSectionItems.map((item, i) => (
                       <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-baluarte-luz/5 shadow-sm">
                          <CheckCircle2 className="text-baluarte-luz shrink-0" size={20} />
                          <span className="text-baluarte-text/80 font-sans text-sm md:text-base leading-snug">{item}</span>
                       </div>
                     ))}
                   </div>
                 </section>
              )}

              {/* Benefícios Padrão */}
              {product.benefits && (
                <section className="grid gap-6">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex gap-5 p-6 bg-white rounded-3xl border border-baluarte-luz/5 shadow-sm">
                      <div className="w-10 h-10 bg-baluarte-bg rounded-xl flex items-center justify-center text-baluarte-luz shrink-0"><Heart size={18} /></div>
                      <div>
                        <p className="font-bold text-baluarte-vida text-lg">{b.label}</p>
                        <p className="text-baluarte-text/60 text-sm leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Bloco de Recursos */}
              <section className="bg-baluarte-vida text-white p-10 rounded-[3rem] relative shadow-2xl">
                <Rocket className="absolute -right-6 -top-6 w-32 h-32 opacity-10 rotate-12" />
                <h4 className="font-serif text-3xl mb-8">O que você encontra:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm opacity-90 border-b border-white/10 pb-4">
                      <CheckCircle2 size={18} className="text-baluarte-luz shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              {product.faq && (
                <section className="space-y-8">
                  <h4 className="text-baluarte-vida font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                     <HelpCircle size={18} className="text-baluarte-luz" /> Perguntas frequentes
                  </h4>
                  <div className="grid gap-4">
                    {product.faq.map((item, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-baluarte-luz/10">
                        <p className="font-bold text-baluarte-vida mb-2">? {item.q}</p>
                        <p className="text-sm text-baluarte-text/60 leading-relaxed italic">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* DOCK DE CHECKOUT: Fixo na base, com gradiente de proteção */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 border-t border-baluarte-luz/10 bg-white/95 backdrop-blur-xl z-20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-[10px] uppercase text-baluarte-text/40 tracking-widest font-bold mb-1">Investimento Social</p>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="text-4xl font-serif text-baluarte-vida">R$ {product.price}</span>
                </div>
                <p className="text-[10px] text-baluarte-luz font-bold uppercase mt-1">Acesso vitalício & atualizações</p>
              </div>
              
              <motion.a
                href={product.checkoutUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 bg-baluarte-vida text-white py-5 rounded-full flex items-center justify-center gap-4 font-bold tracking-widest uppercase text-[10px] md:text-xs shadow-2xl shadow-baluarte-vida/20 hover:bg-baluarte-vida/95 transition-all"
              >
                Quero meu material agora <ArrowRight size={16} />
              </motion.a>
            </div>
            <p className="text-center mt-4 text-[9px] text-baluarte-text/30 uppercase tracking-[0.4em] font-medium">
              Transação Protegida via Caktos • Download Imediato
            </p>
          </div>
        </div>
      </motion.div>

      {/* ZOOM OVERLAY (FULLSCREEN REAL) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-baluarte-text flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button className="absolute top-10 right-10 text-white hover:scale-110 transition-transform scale-150"><ZoomOut /></button>
            <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={images[activeImg]} className="max-w-full max-h-full object-contain shadow-2xl shadow-black" 
            />
            <p className="absolute bottom-10 text-white/30 text-xs tracking-widest uppercase italic">Pressione para retornar</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}