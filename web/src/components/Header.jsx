import React, { useState } from 'react'
import { urlFor } from '../sanity' // Mantém o urlFor, remove o client

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
)
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
)

export default function Header({ logo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Quem Somos', href: '#about' },
    { name: 'Voluntariado', href: '#volunteer' },
    { name: 'Contato', href: '#footer' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            {logo ? (
              <img 
                src={urlFor(logo).url()} 
                alt="Logo da Associação" 
                className="h-10 w-auto object-contain" 
              />
            ) : (
              <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Associação</h1>
            )}
          </div>
          
          <nav className="hidden md:flex space-x-8">
             {menuLinks.map((link) => (
               <a key={link.name} href={link.href} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">{link.name}</a>
             ))}
          </nav>
          <div className="md:hidden flex items-center">
             <button onClick={toggleMenu} type="button" className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
               <span className="sr-only">Abrir menu principal</span>
               {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
             </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg border-t border-gray-200 transition transform origin-top">
           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {menuLinks.map((link) => (
               <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium">{link.name}</a>
             ))}
           </div>
        </div>
      )}
    </header>
  )
}