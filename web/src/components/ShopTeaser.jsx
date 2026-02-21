import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'

const mockedProducts = [
  {
    id: 1,
    title: "O Despertar do Sertão",
    category: "Livro Físico",
    price: "R$ 45,90",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974", // Foto de livro estilo lifestyle
    tag: "Destaque"
  },
  {
    id: 2,
    title: "Esperança em Solo Árido",
    category: "E-book / Devocional",
    price: "R$ 24,90",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1996",
    tag: "Digital"
  },
  {
    id: 3,
    title: "Caderno de Propósitos",
    category: "Papelaria",
    price: "R$ 35,00",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1974",
    tag: "Social"
  }
]

export default function ShopTeaser() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-baluarte-luz font-sans text-xs tracking-[0.3em] uppercase mb-4 block"
            >
              Curadoria Baluarte
            </motion.span>
            <h2 className="text-4xl md:text-5xl text-baluarte-vida font-serif leading-tight">
              Leve a palavra, <br />
              <span className="italic">mude uma realidade.</span>
            </h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-baluarte-text/60 font-sans max-w-xs text-sm leading-relaxed"
          >
            Cada item em nossa loja é um convite para espalhar esperança. 100% do lucro é destinado ao Mercado Social da nossa missão.
          </motion.p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {mockedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Container da Imagem */}
              <div className="relative aspect-[4/5] overflow-hidden bg-baluarte-bg mb-6 rounded-sm">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Badge de Impacto Social */}
                <div className="absolute top-4 right-4">
                  <span className="bg-baluarte-luz text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    100% Social
                  </span>
                </div>
              </div>

              {/* Info do Produto */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-baluarte-luz mb-1 font-bold">
                    {product.category}
                  </p>
                  <h3 className="font-serif text-xl text-baluarte-vida group-hover:text-baluarte-luz transition-colors">
                    {product.title}
                  </h3>
                </div>
                <p className="font-sans text-baluarte-text/80 font-medium">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA para Loja Completa */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <a 
            href="/loja" 
            className="inline-flex items-center gap-3 text-baluarte-vida font-serif text-xl group hover:gap-5 transition-all"
          >
            Visitar nossa boutique de fé
            <ArrowRight className="w-6 h-6 text-baluarte-luz" />
          </a>
          <div className="h-[1px] w-40 bg-baluarte-luz/30 mx-auto mt-2" />
        </motion.div>

      </div>
    </section>
  )
}