'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/#skills', label: 'Skills' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-lg shadow-medium' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
              <span className="text-white font-bold text-lg">GL</span>
            </div>
            <span className={'font-bold text-xl transition-colors duration-300 text-gray-800'}>
              Grzegorz Lisowski
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={'font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-primary-600'}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact-form"
              className="bg-gradient-primary text-white px-6 py-2 rounded-full font-medium shadow-soft hover:shadow-glow transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact-form"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mx-4 mt-4 bg-gradient-primary text-white px-6 py-3 rounded-full font-medium text-center shadow-soft"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
