'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isContactPage = pathname === '/contato';

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
      isScrolled || isContactPage ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={`relative w-32 h-12 transition-opacity duration-300 ${
              isContactPage || isScrolled ? 'opacity-100' : 'opacity-0'
            }`}>
              <Image
                src={isScrolled || isContactPage ? "/images/up-logo-blue.png" : "/images/up-logo-white.png"}
                alt="UP Carteiras Administradas"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Menu de Navegação */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${
                isScrolled || isContactPage 
                  ? 'text-gray-900 hover:text-cyan-500' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Início
            </Link>
            <Link
              href="/contato"
              className={`px-6 py-2 rounded-md transition-colors ${
                isScrolled || isContactPage
                  ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              Entre em contato conosco
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 