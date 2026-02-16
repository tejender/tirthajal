'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/rooms', label: 'Rooms' },
  {href:'b2b',label:'B2B'},
  { href: '/experiences', label: 'Experiences' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12',
        isScrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className={cn(
            'font-serif text-2xl md:text-3xl font-medium tracking-tight transition-colors',
            isScrolled || !isHome ? 'text-stone-900' : 'text-white'
          )}>
            Tirthan<span className="text-stone-500 italic">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={cn(
                'text-sm font-medium hover-underline transition-colors',
                isScrolled || !isHome ? 'text-stone-600 hover:text-stone-900' : 'text-white/90 hover:text-white'
              )}>
                {link.label}
              </Link>
            ))}
            <Link href="/rooms" className={cn(
              'px-6 py-3 text-sm font-medium rounded-full transition-colors',
              isScrolled || !isHome ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-white text-stone-900 hover:bg-stone-100'
            )}>
              Book Now
            </Link>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden relative z-50 p-2">
            {isMobileMenuOpen ? (
              <X className={cn('w-6 h-6', isScrolled || !isHome ? 'text-stone-900' : 'text-white')} />
            ) : (
              <Menu className={cn('w-6 h-6', isScrolled || !isHome ? 'text-stone-900' : 'text-white')} />
            )}
          </button>
        </div>
      </nav>

      <div className={cn(
        'fixed inset-0 bg-stone-100 z-40 flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-500',
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl text-stone-900">
            {link.label}
          </Link>
        ))}
        <Link href="/rooms" onClick={() => setIsMobileMenuOpen(false)} className="mt-8 px-8 py-4 bg-stone-900 text-white text-lg rounded-full">
          Book Now
        </Link>
      </div>
    </>
  )
} 