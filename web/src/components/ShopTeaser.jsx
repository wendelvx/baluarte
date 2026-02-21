import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, CheckCircle2, Sparkles, Rocket, ArrowRight, 
  HelpCircle, ChevronLeft, ChevronRight, Heart, ZoomOut
} from 'lucide-react'

// Dados dos produtos mantidos e FAQ do 30x corrigido
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
      { q: "Para qual faixa etária é indicado?", a: "Especialmente para crianças de 4 a 10 anos, com atividades adaptáveis conforme a maturidade de cada grupo." }
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
      { label: "Aulas Dinâmicas", desc: "Conteúdo interativo já pronto para usar." }
    ],
    features: ["Explicação de Atributos", "Versículos Relacionados", "Atividades Criativas", "Orações Preparadas"],
    customSectionTitle: "O que você vai encontrar:",
    customSectionItems: [
      "Explicação dos atributos exclusivos de Deus",
      "Versículos bíblicos relacionados a cada atributo",
      "Atividades práticas e criativas",
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
    features: ["30 Brincadeiras Completas", "Objetivos Definidos", "Dicas e Variações", "Download Imediato"],
    faq: [
      { q: "Como vou receber o ebook?", a: "Após a confirmação do pagamento, você receberá um e-mail com o link para download do PDF. O acesso é imediato e vitalício." },
      { q: "As brincadeiras são adequadas para qual faixa etária?", a: "O ebook contém brincadeiras adaptáveis para crianças, adolescentes e jovens. Cada atividade inclui dicas de adaptação." },
      { q: "Preciso de materiais especiais?", a: "A maioria das brincadeiras utiliza materiais simples e fáceis de encontrar. Cada atividade lista o que é necessário." },
      { q: "Posso usar em eventos comerciais?", a: "O ebook é para uso pessoal em ministérios e eventos cristãos. Não é permitido revender ou redistribuir o conteúdo." },
      { q: "Tem garantia?", a: "Sim! Garantimos a entrega conforme descrito. Em caso de problemas técnicos, oferecemos suporte total." },
      { q: "As brincadeiras têm mensagens cristãs?", a: "Sim, todas as atividades estimulam valores como cooperação e união, ideais para o ambiente de igreja." }
    ]
  }
]

export default function ShopTeaser() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <section id="shop" className="py-24 md:py-32 bg-baluarte-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-baluarte-luz font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4 block font-bold">
              Sementes de Amor
            </motion.span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-baluarte-vida font-serif leading-tight">
              Materiais que preparam as suas mãos, <br />
              <span className="italic text-baluarte-luz font-normal">e abraçam o coração deles.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden mb-6 p-6 flex items-center justify-center border border-baluarte-luz/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img src={product.image} className="w-full h-full object-contain transition-transform group-hover:scale-105" alt={product.title} />
                <div className="absolute top-4 right-4 bg-baluarte-vida text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">R$ {product.price}</div>
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
  const images = product.gallery || [product.image]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden">
      {/* Overlay Escuro */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-baluarte-text/98 backdrop-blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
        className="relative w-full max-w-7xl bg-baluarte-bg md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-[85vh] lg:h-[90vh]"
      >
        {/* Botão Fechar - Flutuante e Seguro */}
        <button onClick={onClose} className="absolute top-6 right-6 z-[120] p-2.5 bg-baluarte-vida text-white rounded-full border border-white/10 hover:scale-110 transition-transform shadow-xl">
          <X size={22} />
        </button>

        {/* COLUNA ESQUERDA: Galeria (Layout Fixo) */}
        <div className="w-full md:w-5/12 bg-[#F8F7F4] flex flex-col h-[40vh] md:h-full shrink-0 border-b md:border-b-0 md:border-r border-baluarte-luz/10">
          <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={images[activeImg]} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
            </AnimatePresence>
            {images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)} className="p-2 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-baluarte-vida hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                <button onClick={() => setActiveImg((prev) => (prev + 1) % images.length)} className="p-2 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-baluarte-vida hover:text-white transition-colors"><ChevronRight size={20} /></button>
              </div>
            )}
          </div>
          <div className="p-4 flex gap-2 justify-center bg-white/50 border-t border-baluarte-luz/5">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-12 h-16 rounded border-2 transition-all ${activeImg === i ? 'border-baluarte-luz scale-105' : 'border-transparent opacity-40 hover:opacity-70'}`}><img src={img} className="w-full h-full object-cover" /></button>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA: Conteúdo (Scroll Blindado) */}
        <div className="w-full md:w-7/12 flex flex-col bg-baluarte-bg relative h-[60vh] md:h-full min-h-0">
          
          {/* ÁREA DE SCROLL INDEPENDENTE */}
          <div className="flex-1 overflow-y-auto p-6 md:p-16 lg:p-20 scrollbar-hide md:scrollbar-default">
            
            {/* O padding-bottom aqui garante que o conteúdo suba acima do botão fixo */}
            <div className="space-y-16 pb-40 md:pb-48">
              
              <header className="space-y-4">
                <span className="text-baluarte-luz font-sans text-[10px] tracking-widest uppercase font-bold">{product.category}</span>
                <h2 className="text-4xl md:text-6xl font-serif text-baluarte-vida leading-tight">{product.title}</h2>
                <p className="text-baluarte-vida/60 font-serif italic text-xl">"{product.tagline}"</p>
              </header>

              <section className="space-y-6">
                <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest border-b border-baluarte-luz/10 pb-2">Propósito do Material</h4>
                <p className="text-baluarte-text/80 font-sans text-lg leading-relaxed">{product.about}</p>
              </section>

              {product.customSectionTitle && (
                <section className="space-y-8">
                  <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest">{product.customSectionTitle}</h4>
                  <div className="grid gap-4">
                    {product.customSectionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-baluarte-luz/5 shadow-sm">
                        <CheckCircle2 className="text-baluarte-luz shrink-0 mt-0.5" size={18} />
                        <span className="text-baluarte-text/80 font-sans text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="bg-baluarte-vida text-white p-10 rounded-[3rem] relative shadow-xl overflow-hidden">
                <Rocket className="absolute -right-4 -top-4 w-32 h-32 opacity-5 rotate-12" />
                <h4 className="font-serif text-3xl mb-8">O que inclui:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm opacity-90 border-b border-white/10 pb-3">
                      <CheckCircle2 size={16} className="text-baluarte-luz" /> {f}
                    </div>
                  ))}
                </div>
              </section>

              {product.faq && (
                <section className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-baluarte-luz/10 pb-4">
                    <HelpCircle size={20} className="text-baluarte-luz" />
                    <h4 className="text-baluarte-vida font-bold text-[10px] uppercase tracking-widest">Dúvidas Frequentes</h4>
                  </div>
                  <div className="grid gap-5">
                    {product.faq.map((item, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-baluarte-luz/5 shadow-sm">
                        <p className="font-bold text-baluarte-vida text-base mb-2">? {item.q}</p>
                        <p className="text-sm text-baluarte-text/60 italic leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* DOCK DE CHECKOUT: Fixo no rodapé da coluna de conteúdo */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-white/95 backdrop-blur-xl border-t border-baluarte-luz/10 z-[110]">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase text-baluarte-text/40 tracking-[0.2em] font-bold">Investimento Social</p>
                <span className="text-3xl md:text-4xl font-serif text-baluarte-vida">R$ {product.price}</span>
              </div>
              <motion.a
                href={product.checkoutUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none px-10 bg-baluarte-vida text-white py-5 rounded-full flex items-center justify-center gap-4 font-bold uppercase text-[10px] md:text-xs shadow-2xl transition-all"
              >
                Garantir Material <ArrowRight size={16} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}