import React from 'react'

export default function Volunteer() {
  return (
    <section id="volunteer" className="py-16 bg-blue-50 text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Faça Parte Dessa História</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Precisamos de pessoas como você! Seja doando seu tempo, talento ou recursos, 
          sua ajuda é fundamental para continuarmos nosso trabalho.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="https://wa.me/5599999999999" // Substituir pelo link real
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Falar no WhatsApp
          </a>
          {/* Opcional: Botão secundário */}
          {/* <button className="border-2 border-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition">
            Preencher Formulário
          </button> */}
        </div>
      </div>
    </section>
  )
}