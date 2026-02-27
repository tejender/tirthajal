'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BedDouble, Mountain, ImageIcon, Phone } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/rooms', label: 'Rooms', icon: BedDouble },
  { href: '/experiences', label: 'Explore', icon: Mountain },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/contact', label: 'Contact', icon: Phone },
]

export default function MobileBottomNav() {
  const pathname = usePathname()


  if (pathname.startsWith('/rooms/')) return null

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">

      <div className="
        bg-white/95 backdrop-blur-md 
        border-t border-orange-300
        shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
        px-2 pt-1 pb-[calc(0.5rem+env(safe-area-inset-bottom))]
      ">

        <div className="flex justify-around items-center ">

          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 py-1 px-3"
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-brand-primary' : 'text-stone-500'
                  }`}
                />
                <span
                  className={`text-xs  tetransition-colors ${
                    isActive ? 'text-brand-primary' : 'text-stone-500'
                  }`}
                >
                  {item.label}
                </span>

            
                
              </Link>
            )
          })}

        </div>
      </div>
    </div>
  )
}
