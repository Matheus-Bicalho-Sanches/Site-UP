'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4">
                <span className="font-semibold text-gray-500 text-lg">Seu Site</span>
              </Link>
            </div>
            
            {/* Menu Principal - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="py-4 px-2 text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/sobre" className="py-4 px-2 text-gray-500 hover:text-gray-900">Sobre</Link>
              <Link href="/servicos" className="py-4 px-2 text-gray-500 hover:text-gray-900">Serviços</Link>
              <Link href="/contato" className="py-4 px-2 text-gray-500 hover:text-gray-900">Contato</Link>
            </div>
          </div>

          {/* Menu Mobile - Botão */}
          <div className="md:hidden flex items-center">
            <button className="outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6 text-gray-500 hover:text-gray-900"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile - Conteúdo */}
      {isMenuOpen && (
        <div className="md:hidden">
          <Link href="/" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</Link>
          <Link href="/sobre" className="block py-2 px-4 text-sm hover:bg-gray-200">Sobre</Link>
          <Link href="/servicos" className="block py-2 px-4 text-sm hover:bg-gray-200">Serviços</Link>
          <Link href="/contato" className="block py-2 px-4 text-sm hover:bg-gray-200">Contato</Link>
        </div>
      )}
    </nav>
  )
} 