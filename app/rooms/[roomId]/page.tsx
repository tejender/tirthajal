'use client'

import { use, useEffect, useRef, useState } from 'react'
import { notFound } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { roomsData } from '@/lib/data'
import {
  Star,
  Users,
  Bed,
  Bath,
  Maximize,

  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {
  const { roomId } = use(params)
  const room = roomsData.find((r) => r.id === roomId)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
 const [showBookingBar, setShowBookingBar] = useState(true)


  const sectionRef = useRef<HTMLDivElement>(null)

  if (!room) notFound()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      })

     
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
  let lastScrollY = window.scrollY
  let timeout: ReturnType<typeof setTimeout> | null = null

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY < lastScrollY) {
      // scrolling UP → hide
      setShowBookingBar(false)
    } else {
      // scrolling DOWN → show
      setShowBookingBar(true)
    }

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      setShowBookingBar(true)
    }, 150)

    lastScrollY = currentScrollY
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])


  const openLightbox = (src: string) => {
    setLightboxImage(src)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const otherRooms = roomsData.filter((r) => r.id !== room.id)

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-white pt-20 overflow-hidden"
    >
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none 
        bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] 
        bg-[length:22px_22px]" />

      <div className="relative z-10">

        {/* MOBILE BOOKING BAR */}
        <div
          className={cn(
            'fixed bottom-0 left-0 right-0 md:hidden z-50 px-6 py-4 backdrop-blur-xl bg-white/90 border-t border-stone-200 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] transition-all duration-300',
            showBookingBar ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[#F36E20] font-bold text-xl">
                ₹{room.price.toLocaleString()}
              </span>
              <span className="text-stone-500 text-sm">/night</span>
            </div>

            <button className="px-6 py-3 rounded-full 
              bg-gradient-to-r from-[#F36E20] to-[#FDAF16]
              text-white font-semibold shadow-lg shadow-[#F36E20]/30
              hover:scale-105 transition">
              Reserve
            </button>
          </div>
        </div>

        <div className="px-4 md:px-8 max-w-7xl mx-auto">

          {/* GALLERY */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 
            rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] mb-12">
            <div
              className="md:col-span-2 md:row-span-2 relative group cursor-pointer"
              onClick={() => openLightbox(room.images[0])}
            >
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {room.images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                className="hidden md:block relative cursor-pointer"
                onClick={() => openLightbox(img)}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-3 gap-14">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-12">

              {/* TITLE */}
              <div className="border-b border-stone-200 pb-10 reveal-text">
                <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-3">
                  {room.name}
                </h1>

                <p className="text-stone-600 text-lg">
                  {room.tagline}
                </p>

                <div className="flex flex-wrap gap-6 text-stone-600 mt-6">
                  <span className="flex items-center gap-2">
                    <Users size={18} />
                    {room.capacity} guests
                  </span>
                  <span className="flex items-center gap-2">
                    <Bed size={18} />
                    {room.beds}
                  </span>
                  <span className="flex items-center gap-2">
                    <Bath size={18} />
                    {room.bathrooms} bath
                  </span>
                  <span className="flex items-center gap-2">
                    <Maximize size={18} />
                    {room.size}
                  </span>
                </div>
              </div>

              {/* HIGHLIGHTS */}
              <div className="border-b border-stone-200 pb-10 reveal-text">
                <h3 className="font-serif text-2xl text-stone-900 mb-6">
                  Room Highlights
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {room.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[#F36E20] mt-0.5" />
                      <span className="text-stone-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="border-b border-stone-200 pb-10 reveal-text">
                <h3 className="font-serif text-2xl text-stone-900 mb-4">
                  About this space
                </h3>
                <p className="text-stone-600 leading-relaxed text-lg">
                  {room.description}
                </p>
              </div>
            </div>

            {/* BOOKING CARD */}
            <div className="hidden lg:block booking-section">
              <div className="hidden lg:block booking-section">
  <div className="sticky top-28 bg-white border border-stone-200 rounded-3xl p-8 
    shadow-[0_15px_45px_rgba(0,0,0,0.08)] reveal-text">

    {/* Price + Rating */}
    <div className="flex items-baseline justify-between mb-6">
      <div>
        <span className="text-2xl font-bold text-[#F36E20]">
          ₹{room.price.toLocaleString()}
        </span>
        <span className="text-stone-500">/night</span>
      </div>

      <div className="flex items-center gap-1 text-sm">
        <Star className="w-4 h-4 fill-[#F36E20] text-[#F36E20]" />
        <span className="font-medium">4.9</span>
      </div>
    </div>

    {/* Booking Form */}
    <div className="border border-stone-300 rounded-2xl overflow-hidden mb-6">

      <div className="grid grid-cols-2 border-b border-stone-300">
        <div className="p-4 border-r border-stone-300">
          <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
            Check-in
          </label>
          <input
            type="date"
            className="w-full text-sm text-stone-800 outline-none bg-transparent"
          />
        </div>

        <div className="p-4">
          <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
            Check-out
          </label>
          <input
            type="date"
            className="w-full text-sm text-stone-800 outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="p-4">
        <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
          Guests
        </label>
        <select className="w-full text-sm text-stone-800 outline-none bg-transparent">
          {[...Array(room.capacity)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} guest{i > 0 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Reserve Button */}
    <button className="w-full py-4 
      bg-gradient-to-r from-[#F36E20] to-[#FDAF16]
      text-white rounded-full font-semibold text-lg 
      shadow-lg shadow-[#F36E20]/30
      hover:scale-[1.02] transition-all duration-300 mb-4">
      Reserve
    </button>

    <p className="text-center text-stone-500 text-sm">
      You won’t be charged yet
    </p>

    {/* Pricing Breakdown */}
    <div className="mt-6 pt-6 border-t border-stone-200 text-sm space-y-3">
      <div className="flex justify-between">
        <span className="text-stone-600">
          ₹{room.price.toLocaleString()} x 5 nights
        </span>
        <span>
          ₹{(room.price * 5).toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-stone-600">Cleaning fee</span>
        <span>₹800</span>
      </div>

      <div className="flex justify-between">
        <span className="text-stone-600">Service fee</span>
        <span>₹1,200</span>
      </div>

      <div className="flex justify-between font-semibold pt-3 border-t border-stone-200">
        <span>Total before taxes</span>
        <span>
          ₹{(room.price * 5 + 2000).toLocaleString()}
        </span>
      </div>
    </div>

  </div>
</div>

            </div>
          </div>

          {/* OTHER ROOMS */}
          <div className="mt-20 pt-16 border-t border-stone-200 pb-24 reveal-text">
            <h3 className="font-serif text-2xl text-stone-900 mb-8">
              Explore other rooms
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {otherRooms.map((r) => (
                <Link
                  key={r.id}
                  href={`/rooms/${r.id}`}
                  className="flex gap-5 p-5 rounded-2xl border border-stone-200 
                  shadow-[0_8px_25px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                  hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={r.images[0]}
                    alt={r.name}
                    className="w-32 h-32 rounded-xl object-cover"
                  />

                  <div>
                    <h4 className="font-serif text-lg text-stone-900">
                      {r.name}
                    </h4>
                    <p className="text-stone-500 text-sm mb-2">
                      {r.tagline}
                    </p>
                    <p className="text-[#F36E20] font-medium">
                      ₹{r.price.toLocaleString()}/night
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* LIGHTBOX */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <img
              src={lightboxImage}
              alt="Gallery"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  )
}
