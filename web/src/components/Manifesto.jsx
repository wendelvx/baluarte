import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, Heart, Users, Stethoscope, GraduationCap, Handshake, Sparkles,
  Target, Compass, ShieldCheck 
} from 'lucide-react'

const atuacoes = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Educação",
    description: "Alfabetização e reforço que devolvem o direito de sonhar.",
    vision: "Cada letra aprendida é um muro que cai.",
    bgImage: "/images/education.webp"
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Saúde",
    description: "Cuidado médico e psicológico que acolhe as dores da alma.",
    vision: "Curar o corpo para que o riso volte a ser livre.",
    bgImage: "/images/health.webp"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Família",
    description: "Fortalecendo os laços das famílias do nosso sertão.",
    vision: "Ninguém caminha sozinho quando o amor é o guia.",
    bgImage: "/images/family.webp"
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
    bgImage: "/images/social-action.webp"
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Voluntariado",
    description: "Sua mão estendida é o pilar que sustenta essa obra.",
    vision: "Seja a ponte entre o impossível e o amanhã.",
    bgImage: "/images/volunteer.webp"
  }
]

export default function Manifesto({ essence }) {
  const essenceIcons = {
    mission: <Target className="w-8 h-8" />,
    vision: <Compass className="w-8 h-8" />,
    values: <ShieldCheck className="w-8 h-8" />
  }

  return (
    <section id="about" className="py-24 md:py-32 bg-baluarte-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* 1. Cabeçalho Narrative */}
        <div className="flex flex-col md:flex-row gap-12 mb-20 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:w-1/2"
          >
            <span className="text-baluarte-luz font-sans text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Nossa Essência</span>
            <h2 className="text-4xl md:text-6xl text-baluarte-vida font-serif leading-tight">
              Onde cada vida é um <br />
              <span className="italic text-baluarte-luz">propósito que escolhemos proteger.</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:w-1/2 md:mt-16 text-baluarte-text/70 text-lg leading-relaxed font-sans italic border-l border-baluarte-luz/20 pl-6"
          >
            <p>
              "No bater de cada pequeno coração, protegemos a vida e a pureza de cada criança que abraçamos. <br />
              <span className="text-baluarte-vida font-bold">Propósitos sagrados que florescem para o amanhã.</span>"
            </p>
          </motion.div>
        </div>

        {/* 2. SEÇÃO: Missão, Visão e Valores REFORMULADA */}
        {essence && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
            {Object.entries(essence).map(([key, value]) => (
              <div 
                key={key} 
                className="flex flex-col items-center text-center p-10 md:p-12 bg-white/60 rounded-[2.5rem] border border-baluarte-luz/10 shadow-sm transition-all hover:shadow-md"
              >
                <div className="text-baluarte-luz mb-8 bg-baluarte-bg p-4 rounded-2xl shadow-inner">
                  {essenceIcons[key]}
                </div>
                
                <div className="w-full">
                  <h4 className="font-serif text-3xl text-baluarte-vida capitalize mb-6">
                    {key === 'mission' ? 'Missão' : key === 'vision' ? 'Visão' : 'Valores'}
                  </h4>

                  {/* SOLUÇÃO ELEGANTE PARA VALORES: Grade Simétrica com Marcadores */}
                  {key === 'values' ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-w-[280px] mx-auto">
                      {value.split(/[ ,;]+/).filter(v => v.length > 0).map((val, i) => (
                        <div key={i} className="flex items-center gap-2 group">
                          {/* Marcador Minimalista */}
                          <div className="w-1.5 h-1.5 rotate-45 bg-baluarte-luz rounded-[1px] shrink-0" />
                          <span className="text-[11px] md:text-xs uppercase tracking-wider text-baluarte-vida font-sans font-bold text-left leading-none">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm md:text-base text-baluarte-text/70 leading-relaxed font-sans font-medium">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Título dos Pilares */}
        <div className="mb-12 text-center md:text-left">
           <span className="text-baluarte-luz font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block">Nossas Frentes</span>
           <h3 className="text-3xl font-serif text-baluarte-vida">Pilares de Atuação</h3>
        </div>

        {/* Grid de Cards Interativos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {atuacoes.map((item, idx) => (
            <CardImpacto key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CardImpacto({ item, index }) {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={() => setIsTapped(!isTapped)}
      className="group relative h-[440px] md:h-[480px] bg-white rounded-3xl overflow-hidden shadow-sm border border-baluarte-luz/10 cursor-pointer touch-manipulation"
    >
      <AnimatePresence mode="wait">
        {!isTapped ? (
          <motion.div 
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 p-10 flex flex-col justify-between z-20"
          >
            <div className="w-14 h-14 rounded-2xl bg-baluarte-bg flex items-center justify-center text-baluarte-vida border border-baluarte-luz/20 shadow-inner">
              {item.icon}
            </div>
            <div>
              <h4 className="font-serif text-3xl text-baluarte-vida mb-4">{item.title}</h4>
              <p className="text-base text-baluarte-text/60 leading-relaxed font-sans mb-8">{item.description}</p>
              <div className="flex items-center gap-2 text-baluarte-luz md:hidden">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Toque para sentir</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="back"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-30"
          >
            <img src={item.bgImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-baluarte-vida/95 via-baluarte-vida/40 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center pb-16">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="w-16 h-[1px] bg-baluarte-luz mb-6" />
              <p className="text-white font-serif italic text-2xl md:text-3xl leading-tight drop-shadow-xl antialiased">"{item.vision}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-40 pointer-events-none">
        <img src={item.bgImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-baluarte-vida/95 via-baluarte-vida/40 to-transparent" />
        <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center pb-16">
          <div className="w-16 h-[1px] bg-baluarte-luz mb-6" />
          <p className="text-white font-serif italic text-2xl md:text-3xl leading-tight">"{item.vision}"</p>
        </div>
      </div>
    </motion.div>
  )
}