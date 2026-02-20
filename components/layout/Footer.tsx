import Link from 'next/link'
import { Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] text-stone-400 pt-24 pb-16 px-6 md:px-12 overflow-hidden">

      {/* Subtle Orange Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#F36E20]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-4 gap-16">

        {/* BRAND BLOCK */}
        <div className="md:col-span-2">

          <Link
            href="/"
            className="font-serif text-4xl font-medium text-white mb-6 block tracking-tight"
          >
            Tirthan<span className="text-[#F36E20]">.</span>
          </Link>

          <p className="text-sm leading-relaxed max-w-sm mb-8 text-stone-400">
            A boutique mountain retreat in the heart of the Great Himalayan
            National Park buffer zone.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[Instagram, Twitter, Facebook].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="group w-12 h-12 rounded-full 
                bg-stone-900 border border-stone-800
                flex items-center justify-center 
                transition-all duration-300
                hover:bg-gradient-to-br hover:from-[#F36E20] hover:to-[#FF8A3D]
                hover:border-transparent hover:shadow-lg hover:shadow-[#F36E20]/30"
              >
                <Icon className="w-5 h-5 text-stone-300 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
            Explore
          </h4>

          <ul className="space-y-4 text-sm">
            {[
              { label: 'Our Story', href: '/about' },
              { label: 'Rooms', href: '/rooms' },
              { label: 'Experiences', href: '/experiences' },
              { label: 'Gallery', href: '/gallery' },
            ].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="relative group transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#F36E20] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
            Contact
          </h4>

          <ul className="space-y-4 text-sm text-stone-400">
            <li>Village Gushaini, Tirthan Valley</li>
            <li>Himachal Pradesh, India 175123</li>
            <li className="pt-2 hover:text-white transition-colors">
              info@tirthajalcottage.com
            </li>
            <li className="hover:text-white transition-colors">
              +91 98765 43210
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Divider with Orange Accent */}
      <div className="relative max-w-7xl mx-auto mt-20 pt-10 border-t border-stone-800">

        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#F36E20] to-transparent opacity-70"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 mt-8">

          <p>
            © {new Date().getFullYear()} Tirthajal Cottage. All rights reserved.
          </p>

          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>

        </div>
      </div>

    </footer>
  )
}
