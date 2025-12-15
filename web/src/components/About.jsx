import React from 'react'
import {
    BookOpen,
    Heart,
    Users,
    Stethoscope,
    GraduationCap
} from 'lucide-react'

export default function About() {
    return (
        <section
            id="about"
            className="relative py-20 bg-white overflow-hidden"
        >
            <div className="absolute top-20 right-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />

            <div className="relative max-w-5xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4">
                        Quem Somos
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Conheça a missão, a história e o propósito que movem nosso trabalho.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto text-lg text-slate-600 space-y-6 leading-relaxed mb-16">
                    <p>
                        A <strong className="text-slate-800">Missão Baluarte</strong> é uma ONG cristã
                        fundada em 2019 no sertão do Ceará, no Sítio Logradouro, zona rural de
                        Juazeiro do Norte.
                    </p>

                    <p>
                        Atuamos semanalmente no cuidado e desenvolvimento de centenas de crianças
                        e adolescentes, oferecendo apoio social, educacional, espiritual e humano,
                        sempre guiados pelo amor, pela fé e pela ação.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl font-semibold text-slate-800 text-center mb-10">
                        Nossas áreas de atuação
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card icon={<GraduationCap />} title="Educação">
                            Alfabetização, reforço escolar e oficinas pedagógicas.
                        </Card>

                        <Card icon={<Stethoscope />} title="Saúde">
                            Atendimento médico e psicológico para crianças e famílias.
                        </Card>

                        <Card icon={<Users />} title="Família e Comunidade">
                            Cursos para mães, encontros de jovens e ações comunitárias.
                        </Card>

                        <Card icon={<Heart />} title="Cuidado Integral">
                            Artes marciais, culinária, Balukids e atividades formativas.
                        </Card>

                        <Card icon={<BookOpen />} title="Ação Social e Fé">
                            Evangelismo, discipulado, almoço comunitário e Mercado Social.
                        </Card>
                        <Card icon={<HandsClapping />} title="Voluntariado e Impacto">
                            Contribua como voluntário em atividades educativas, sociais e de apoio à comunidade, transformando vidas no sertão.
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Card({ icon, title, children }) {
    return (
        <div
            className="
        bg-slate-50
        rounded-2xl
        p-6
        text-center
        shadow-sm
        ring-1 ring-slate-200
        hover:shadow-md
        transition
      "
        >
            <div className="flex justify-center mb-4 text-emerald-600">
                <div className="bg-white p-3 rounded-full ring-1 ring-slate-200">
                    {icon}
                </div>
            </div>

            <h4 className="text-lg font-semibold text-slate-800 mb-2">
                {title}
            </h4>

            <p className="text-slate-600 text-sm leading-relaxed">
                {children}
            </p>
        </div>
    )
}
