'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BedDouble, Mountain, ImageIcon, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/rooms', label: 'Rooms', icon: BedDouble },
  { href: '/experiences', label: 'Explore', icon: Mountain },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/contact', label: 'Contact', icon: Phone },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollThreshold = 10

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current

      if (currentScrollY < 20) {
        setVisible(true)
      } else if (Math.abs(delta) < scrollThreshold) {
        return
      } else if (delta > 0) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide on room detail pages
  if (pathname.startsWith('/rooms/')) return null

  return (
    <div
      className={cn(
        'lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0 pointer-events-none'
      )}
    >
      <div className="relative mx-4 mb-4">

        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 rounded-3xl bg-[#F36E20]/10 blur-2xl" />

        <div
          className="
          relative
          bg-white/85 backdrop-blur-2xl
          border border-[#F36E20]/30
          rounded-3xl
          shadow-[0_15px_45px_rgba(0,0,0,0.12)]
          px-3 pt-2 pb-[calc(0.6rem+env(safe-area-inset-bottom))]
        "
        >
          <div className="flex justify-around items-center">

            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center gap-1 py-2 px-3"
                >
                  {/* Active Background Pill */}
                  {isActive && (
                    <div className="absolute -inset-2 bg-[#F36E20]/10 rounded-2xl transition-all duration-300" />
                  )}

                  <Icon
                    className={cn(
                      'relative w-5 h-5 transition-all duration-300',
                      isActive
                        ? 'text-[#F36E20] scale-110'
                        : 'text-stone-500'
                    )}
                  />

                  <span
                    className={cn(
                      'relative text-[11px] tracking-wide transition-colors duration-300',
                      isActive
                        ? 'text-[#F36E20] font-semibold'
                        : 'text-stone-500'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}
