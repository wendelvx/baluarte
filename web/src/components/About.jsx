import React from 'react'

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Quem Somos</h2>
        <div className="text-lg text-gray-600 space-y-4">
          <p>
            Fundada em 2010, nossa Associação nasceu do sonho de transformar a comunidade local.
            Começamos com pequenos gestos e hoje atendemos mais de 200 famílias mensalmente.
          </p>
          <p>
            Nossa missão é promover a inclusão social através da educação, esporte e cultura,
            garantindo que todos tenham oportunidades iguais de crescimento.
          </p>
        </div>
      </div>
    </section>
  )
}