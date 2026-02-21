import React from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, Heart, Users, Stethoscope, GraduationCap, Handshake 
} from 'lucide-react'

const atuacoes = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Educação",
    description: "Alfabetização e reforço que devolvem o direito de sonhar.",
    vision: "Cada letra aprendida é um muro que cai.",
    bgImage: "/images/education.webp" // Foto de mãos escrevendo ou livros
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Saúde",
    description: "Cuidado médico e psicológico que acolhe as dores da alma.",
    vision: "Curar o corpo para que o riso volte a ser livre.",
    bgImage: "/images/health.webp" // Foto de mãos segurando um coração ou estetoscópio
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Família",
    description: "Fortalecendo os laços das famílias do nosso sertão.",
    vision: "Ninguém caminha sozinho quando o amor é o guia.",
    bgImage: "/images/family.webp" // Foto de mãos segurando uma criança ou família em grupo
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Cuidado Integral",
    description: "Artes e esportes para formar cidadãos plenos e amados.",
    vision: "Onde o talento descobre que não tem fronteiras.",
    bgImage: "/images/fight.webp"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Ação Social",
    description: "O evangelismo que se traduz em dignidade e prato cheio.",
    vision: "A fé que alimenta o espírito e farta a mesa.",
    bgImage: "/images/social-action.webp" // Foto de pessoas alimentando outras ou comendo juntas
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Voluntariado",
    description: "Sua mão estendida é o pilar que sustenta essa obra.",
    vision: "Seja a ponte entre o impossível e o amanhã.",
    bgImage: "/images/volunteer.webp" // Foto de mãos se unindo ou pessoas trabalhando juntas
  }
]

export default function Manifesto() {
  return (
    <section id="about" className="py-24 md:py-32 bg-baluarte-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Título Comovente e Melancólico */}
        <div className="flex flex-col md:flex-row gap-12 mb-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2"
          >
            <span className="text-baluarte-luz font-sans text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Nossa Promessa</span>
            <h2 className="text-4xl md:text-6xl text-baluarte-vida font-serif leading-tight">
              Onde cada vida é um <br />
              <span className="italic text-baluarte-luz">sonho que escolhemos proteger.</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:w-1/2 md:mt-16 text-baluarte-text/70 text-lg leading-relaxed font-sans italic"
          >
            <p>
              "No silêncio do solo seco, ouvimos o chamado de quem ainda não tem voz. Não entregamos apenas serviços; oferecemos o chão firme para que os pés cansados possam, enfim, correr em direção ao amanhã."
            </p>
          </motion.div>
        </div>

        {/* Grid de Cards Refatorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {atuacoes.map((item, idx) => (
            <CardImpacto key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CardImpacto({ item }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Aumentando para h-[480px] para dar porte editorial
      className="group relative h-[480px] bg-white rounded-2xl overflow-hidden shadow-sm border border-baluarte-luz/10 cursor-default"
    >
      {/* 1. Frente: Informativo */}
      <div className="absolute inset-0 p-10 z-20 flex flex-col justify-between transition-all duration-700 group-hover:opacity-0 group-hover:scale-95 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-baluarte-bg flex items-center justify-center text-baluarte-vida border border-baluarte-luz/20">
          {item.icon}
        </div>
        <div>
          <h4 className="font-serif text-3xl text-baluarte-vida mb-3">{item.title}</h4>
          <p className="text-sm text-baluarte-text/60 leading-relaxed font-sans">
            {item.description}
          </p>
        </div>
      </div>

      {/* 2. Verso: Visual e Emocional */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 overflow-hidden z-10">
        
        {/* IMAGEM COM AJUSTE DE NITIDEZ */}
        <img 
          src={item.bgImage} 
          alt={item.title}
          className="
            absolute inset-0 w-full h-full 
            object-cover 
            transition-transform duration-[1.5s] ease-out
            scale-100 group-hover:scale-110
            brightness-[0.9] group-hover:brightness-100
          "
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        />

        {/* Gradiente de Proteção de Leitura */}
        <div className="absolute inset-0 bg-gradient-to-t from-baluarte-vida/95 via-baluarte-vida/40 to-transparent" />
        
        {/* Conteúdo do Verso */}
        <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center pb-16">
          <motion.div
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             className="w-16 h-[1px] bg-baluarte-luz mb-6"
          />
          <p className="text-white font-serif italic text-xl md:text-2xl leading-tight drop-shadow-lg antialiased">
            "{item.vision}"
          </p>
        </div>
      </div>
    </motion.div>
  )
}