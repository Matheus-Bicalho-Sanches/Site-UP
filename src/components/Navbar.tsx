'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-12">
              <Image
                src="/images/up-logo.png"
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
              className="text-gray-600 hover:text-cyan-500 transition-colors"
            >
              Início
            </Link>
            <Link
              href="/contato"
              className="text-gray-600 hover:text-cyan-500 transition-colors"
            >
              Contato
            </Link>
            <Link
              href="/contato"
              className="bg-cyan-500 text-white px-6 py-2 rounded-md hover:bg-cyan-600 transition-colors"
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