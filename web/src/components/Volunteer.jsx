import React from 'react'
import { HeartHandshake } from 'lucide-react'

export default function Volunteer() {
  return (
    <section
      id="volunteer"
      className="
        relative py-20
        bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50
        overflow-hidden
      "
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-sm ring-1 ring-slate-200">
            <HeartHandshake className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-6">
          Faça parte dessa história
        </h2>

        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Precisamos de pessoas que acreditam em cuidado, solidariedade e transformação.
          Seja doando seu tempo, seu talento ou seu apoio, cada gesto faz diferença.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://forms.gle/yuMwqqs8FewUsqRJ8"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              bg-emerald-600 text-white
              font-medium
              py-3 px-8
              rounded-full
              shadow-md
              hover:bg-emerald-700
              transition
            "
          >
            Quero ser voluntário
          </a>

          <a
            href="https://bio.site/missaobaluarte"
            className="
              inline-flex items-center justify-center
              py-3 px-8
              rounded-full
              font-medium
              text-slate-700
              bg-white
              ring-1 ring-slate-300
              hover:bg-slate-50
              transition
            "
          >
            Saber mais
          </a>
        </div>
      </div>
    </section>
  )
}
