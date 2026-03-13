import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartHandshake, Sparkles, X, Copy, CheckCircle, 
  ArrowRight, Utensils, HandHeart 
} from 'lucide-react'

export default function VolunteerCall({ flows }) {
  const [showPixModal, setShowPixModal] = useState(false)
  const [copied, setCopied] = useState(false)

  // Função para copiar a chave PIX
  const copyPixKey = () => {
    if (flows?.pixKey) {
      navigator.clipboard.writeText(flows.pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <section id="volunteer" className="relative py-0 bg-baluarte-bg overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[700px]">
        
        {/* Lado Esquerdo: Imagem de Impacto */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:w-1/2 relative h-[450px] md:h-auto overflow-hidden"
        >
          <img 
            src="/images/volunteercall.webp" 
            alt="O brilho do propósito"
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-baluarte-vida/20 to-transparent" />
        </motion.div>

        {/* Lado Direito: O Convite */}
        <div className="md:w-1/2 flex items-center justify-center p-10 md:p-24 bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-lg text-center md:text-left"
          >
            <div className="flex justify-center md:justify-start mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-baluarte-luz/20 blur-xl rounded-full" />
                <div className="relative bg-white p-4 rounded-full shadow-sm border border-baluarte-luz/20">
                  <HeartHandshake className="w-8 h-8 text-baluarte-vida" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-baluarte-vida mb-8 leading-[1.1]">
              Missão Baluarte. <br />
              <span className="italic text-baluarte-luz">Chamados para transformar vidas.</span>
            </h2>

            <div className="space-y-6 text-lg text-baluarte-text/80 font-sans leading-relaxed mb-12">
              <p>
                A distância entre o desespero e a esperança é apenas um par de mãos dispostas. 
                <span className="text-baluarte-vida font-medium ml-1">Buscamos humanidade para sustentar milagres.</span>
              </p>
              <p className="italic border-l-2 border-baluarte-luz/30 pl-4 py-1 text-base">
                Seja através de recursos, alimentos ou do seu tempo: você é a resposta que o sertão espera.
              </p>
            </div>

            {/* AÇÕES DE IMPACTO */}
            <div className="flex flex-col gap-4">
              <motion.a
                href={flows?.volunteerFormUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="group flex items-center justify-between p-6 bg-baluarte-vida text-white rounded-3xl shadow-xl shadow-baluarte-vida/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <HandHeart className="w-6 h-6 text-baluarte-luz" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Quero Servir</p>
                    <p className="font-serif text-lg">Seja Voluntário</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
              </motion.a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowPixModal(true)}
                  className="flex items-center gap-4 p-5 bg-baluarte-bg rounded-2xl border border-baluarte-luz/10 hover:border-baluarte-luz transition-all text-left"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
                    <Sparkles className="w-5 h-5 text-baluarte-luz" />
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-baluarte-vida/60">Via PIX</p>
                    <p className="font-serif text-baluarte-vida">Doação Financeira</p>
                  </div>
                </button>

                <a
                  href={flows?.foodFormUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-baluarte-bg rounded-2xl border border-baluarte-luz/10 hover:border-baluarte-luz transition-all text-left"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
                    <Utensils className="w-5 h-5 text-baluarte-luz" />
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-baluarte-vida/60">Sustento</p>
                    <p className="font-serif text-baluarte-vida">Doar Alimentos</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODAL PIX PREMIUM */}
      <AnimatePresence>
        {showPixModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowPixModal(false)}
              className="absolute inset-0 bg-baluarte-vida/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[3rem] p-10 md:p-12 text-center shadow-2xl"
            >
              <button onClick={() => setShowPixModal(false)} className="absolute top-8 right-8 text-baluarte-vida/30 hover:text-baluarte-vida transition-colors">
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-baluarte-bg rounded-full flex items-center justify-center mx-auto mb-8 border border-baluarte-luz/20">
                <Sparkles className="w-10 h-10 text-baluarte-luz" />
              </div>

              <h3 className="text-3xl font-serif text-baluarte-vida mb-4">Sua semente de amor</h3>
              <p className="text-baluarte-text/60 font-sans text-sm leading-relaxed mb-8">
                Utilize a chave e-mail abaixo para realizar sua doação. Cada valor se transforma em dignidade no sertão.
              </p>

              {/* Box da Chave PIX */}
              <div className="relative group cursor-pointer" onClick={copyPixKey}>
                <div className={`p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center gap-2 ${copied ? 'border-emerald-500 bg-emerald-50' : 'border-baluarte-luz/30 bg-baluarte-bg hover:border-baluarte-luz'}`}>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-baluarte-vida/40">Chave E-mail</span>
                  <span className="font-sans text-lg md:text-xl text-baluarte-vida font-bold break-all">
                    {flows?.pixKey || "Carregando..."}
                  </span>
                  
                  <div className="flex items-center gap-2 mt-2">
                    {copied ? (
                      <><CheckCircle size={14} className="text-emerald-500" /> <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Copiado com sucesso</span></>
                    ) : (
                      <><Copy size={14} className="text-baluarte-luz" /> <span className="text-[10px] text-baluarte-vida/40 font-bold uppercase tracking-widest">Toque para copiar</span></>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-baluarte-vida/30 font-bold">
                Associação Missão Baluarte
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}