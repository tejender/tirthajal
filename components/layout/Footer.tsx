import Link from 'next/link'
import { Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 px-6 md:px-12 border-t border-stone-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="font-serif text-3xl font-medium text-stone-200 mb-6 block">
            Tirthan<span className="text-stone-600">.</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm mb-6">
            A boutique mountain retreat in the heart of the Great Himalayan National Park buffer zone.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-stone-800 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-stone-800 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-stone-800 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-stone-200 font-medium mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-stone-200 transition-colors">Our Story</Link></li>
            <li><Link href="/rooms" className="hover:text-stone-200 transition-colors">Rooms</Link></li>
            <li><Link href="/experiences" className="hover:text-stone-200 transition-colors">Experiences</Link></li>
            <li><Link href="/gallery" className="hover:text-stone-200 transition-colors">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-stone-200 font-medium mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>Village Gushaini, Tirthan Valley</li>
            <li>Himachal Pradesh, India 175123</li>
            <li className="pt-2">info@tirthancottage.com</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>&copy; {new Date().getFullYear()} Tirthan Valley Cottage. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-stone-200 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-stone-200 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}