import React from 'react'

export default function Footer({ contact }) {
  if (!contact) return null;

  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Onde Estamos</h3>
          <p>{contact.address || "Endereço não cadastrado"}</p>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-4">Fale Conosco</h3>
          <p className="mb-2">📞 {contact.phone || "(00) 0000-0000"}</p>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-4">Siga-nos</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {contact.socialLinks && contact.socialLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                Link {idx + 1} {/* Aqui poderia usar ícones se tiver biblioteca de ícones */}
              </a>
            ))}
            {!contact.socialLinks && <p>Sem redes sociais</p>}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12 border-t border-gray-800 pt-8 text-sm">
        &copy; {new Date().getFullYear()} Associação. Todos os direitos reservados.
      </div>
    </footer>
  )
}