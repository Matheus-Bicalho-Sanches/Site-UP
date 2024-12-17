'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detecta o scroll da página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12">
              <Image
                src={isScrolled ? "/images/up-logo-blue.png" : "/images/up-logo.png"}
                alt="UP Carteiras Administradas"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/sobre" 
              className={`transition ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-gray-300'
              }`}
            >
              Sobre
            </Link>
            <Link 
              href="/servicos" 
              className={`transition ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-gray-300'
              }`}
            >
              Serviços
            </Link>
            <Link 
              href="/contato" 
              className={`transition ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-gray-300'
              }`}
            >
              Contato
            </Link>
          </div>

          {/* Botão Menu Mobile */}
          <button
            className={`md:hidden transition ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                Home
              </Link>
              <Link
                href="/sobre"
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                Sobre
              </Link>
              <Link
                href="/servicos"
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                Serviços
              </Link>
              <Link
                href="/contato"
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              >
                Contato
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 