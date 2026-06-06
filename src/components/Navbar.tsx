import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const navLinks = [
    {
      name: 'Expertise',
      href: '#expertise',
    },
    {
      name: 'Why Me',
      href: '#why',
    },
    {
      name: 'Properties',
      href: '#properties',
    },
    {
      name: 'Portfolio',
      href: '#portfolio',
    },
    {
      name: 'About',
      href: '#about',
    },
  ]
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-dark/95 backdrop-blur-md py-4 shadow-lg border-b border-gold/10' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-shadow duration-300">
            <span className="text-dark font-serif font-bold text-lg tracking-tighter">
              AK
            </span>
          </div>
          <span className="hidden sm:block text-xl font-serif font-semibold tracking-widest text-ivory group-hover:text-gold transition-colors duration-300">
            ALI KHALIK
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-sans tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 border border-gold text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-dark transition-colors duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Work With Me
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gold"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="absolute top-full left-0 right-0 bg-espresso border-t border-gold/10 shadow-2xl md:hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-serif tracking-wider text-ivory hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block text-center px-6 py-3 bg-gold text-dark font-sans tracking-widest uppercase text-sm mt-4 font-semibold"
              >
                Work With Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
