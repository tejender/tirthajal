'use client'

import { use, useEffect, useRef, useState } from 'react'
import { notFound } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { roomsData } from '@/lib/data'
import { Star, Users, Bed, Bath, Maximize, ChevronLeft, ChevronRight, Check, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function RoomDetailPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params)
  const room = roomsData.find((r) => r.id === roomId)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [showBookingBar, setShowBookingBar] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  if (!room) notFound()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-text', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })

      ScrollTrigger.create({
        trigger: '.booking-section',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => setShowBookingBar(self.progress > 0.1 && self.direction === 1)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const openLightbox = (src: string) => { setLightboxImage(src); setLightboxOpen(true); document.body.style.overflow = 'hidden' }
  const closeLightbox = () => { setLightboxOpen(false); document.body.style.overflow = '' }

  const otherRooms = roomsData.filter((r) => r.id !== room.id)

  return (
    <div ref={sectionRef} className="min-h-screen bg-white pt-20">
      <div className={cn('booking-bar fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 md:hidden z-50 flex justify-between items-center', showBookingBar && 'visible')}>
        <div><span className="text-stone-900 font-bold text-xl">₹{room.price.toLocaleString()}</span><span className="text-stone-500 text-sm">/night</span></div>
        <button className="px-6 py-3 bg-stone-900 text-white rounded-lg font-medium">Reserve</button>
      </div>

      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[500px] rounded-xl overflow-hidden mb-8">
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer" onClick={() => openLightbox(room.images[0])}>
            <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
          {room.images.slice(1, 4).map((img, idx) => (
            <div key={idx} className="relative group cursor-pointer hidden md:block" onClick={() => openLightbox(img)}>
              <img src={img} alt={`${room.name} ${idx + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
          <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur rounded-lg text-sm font-medium shadow-lg hover:bg-white transition-colors">
            Show all photos
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-stone-200 pb-8 reveal-text">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-2">{room.name}</h1>
                  <p className="text-stone-600 text-lg">{room.tagline}</p>
                </div>
                <div className="text-right hidden md:block">
                  <div className="flex items-center gap-1 mb-1"><Star className="w-5 h-5 fill-stone-900 text-stone-900" /><span className="font-bold text-lg">4.9</span></div>
                  <p className="text-stone-500 text-sm underline cursor-pointer">127 reviews</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-stone-600 mt-6">
                <span className="flex items-center gap-2"><Users className="w-5 h-5" />{room.capacity} guests</span>
                <span className="flex items-center gap-2"><Bed className="w-5 h-5" />{room.beds}</span>
                <span className="flex items-center gap-2"><Bath className="w-5 h-5" />{room.bathrooms} bath</span>
                <span className="flex items-center gap-2"><Maximize className="w-5 h-5" />{room.size}</span>
              </div>
            </div>

            <div className="border-b border-stone-200 pb-8 reveal-text">
              <h3 className="font-serif text-2xl text-stone-900 mb-6">Room Highlights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3"><Check className="w-6 h-6 text-stone-900 mt-0.5" /><span className="text-stone-700">{feature}</span></div>
                ))}
              </div>
            </div>

            <div className="border-b border-stone-200 pb-8 reveal-text">
              <h3 className="font-serif text-2xl text-stone-900 mb-4">About this space</h3>
              <p className="text-stone-600 leading-relaxed text-lg">{room.description}</p>
            </div>

            <div className="border-b border-stone-200 pb-8 reveal-text">
              <h3 className="font-serif text-2xl text-stone-900 mb-6">What this place offers</h3>
              <div className="grid md:grid-cols-2 gap-y-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-2 rounded-lg hover:bg-stone-50 transition-colors">
                    <span className="text-stone-400 text-xl">{amenity.icon}</span>
                    <span className="text-stone-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block booking-section">
            <div className="sticky top-28 bg-white border border-stone-200 rounded-2xl p-6 shadow-lg reveal-text">
              <div className="flex items-baseline justify-between mb-6">
                <div><span className="text-2xl font-bold text-stone-900">₹{room.price.toLocaleString()}</span><span className="text-stone-500">/night</span></div>
                <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 fill-stone-900 text-stone-900" /><span className="font-medium">4.9</span></div>
              </div>
              <div className="border border-stone-300 rounded-lg mb-4 overflow-hidden">
                <div className="grid grid-cols-2 border-b border-stone-300">
                  <div className="p-3 border-r border-stone-300"><label className="block text-xs font-bold text-stone-900 uppercase">Check-in</label><input type="date" className="w-full text-sm text-stone-600 outline-none bg-transparent" /></div>
                  <div className="p-3"><label className="block text-xs font-bold text-stone-900 uppercase">Check-out</label><input type="date" className="w-full text-sm text-stone-600 outline-none bg-transparent" /></div>
                </div>
                <div className="p-3"><label className="block text-xs font-bold text-stone-900 uppercase">Guests</label><select className="w-full text-sm text-stone-600 outline-none bg-transparent">{[...Array(room.capacity)].map((_, i) => <option key={i} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>)}</select></div>
              </div>
              <button className="w-full py-4 bg-stone-900 text-white rounded-lg font-medium text-lg hover:bg-stone-800 transition-colors mb-4">Reserve</button>
              <p className="text-center text-stone-500 text-sm mb-6">You wont be charged yet</p>
              <div className="space-y-3 text-sm border-b border-stone-200 pb-6 mb-6">
                <div className="flex justify-between"><span className="underline text-stone-600">₹{room.price.toLocaleString()} x 5 nights</span><span>₹{(room.price * 5).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="underline text-stone-600">Cleaning fee</span><span>₹800</span></div>
                <div className="flex justify-between"><span className="underline text-stone-600">Service fee</span><span>₹1,200</span></div>
              </div>
              <div className="flex justify-between font-bold text-lg"><span>Total before taxes</span><span>₹{(room.price * 5 + 2000).toLocaleString()}</span></div>
            </div>
          </div>
        </div>

        <div id="gallery" className="mt-16 pt-16 border-t border-stone-200 reveal-text">
          <h3 className="font-serif text-2xl text-stone-900 mb-6">Photo Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {room.images.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden cursor-pointer" onClick={() => openLightbox(img)}>
                <img src={img} alt={`${room.name} gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-stone-200 reveal-text">
          <h3 className="font-serif text-2xl text-stone-900 mb-6">Where youll be</h3>
          <div className="map-container h-[400px] rounded-xl mb-4 flex items-center justify-center relative">
            <div className="text-center bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg z-10">
              <MapPin className="w-8 h-8 text-stone-700 mx-auto mb-2" />
              <p className="font-medium text-stone-900">Tirthan Valley</p>
              <p className="text-sm text-stone-500">31.8276° N, 77.2166° E</p>
            </div>
          </div>
          <p className="text-stone-600 leading-relaxed">Located in the buffer zone of Great Himalayan National Park, a UNESCO World Heritage Site.</p>
        </div>

        <div className="mt-16 pt-16 border-t border-stone-200 pb-24 reveal-text">
          <h3 className="font-serif text-2xl text-stone-900 mb-6">Explore other rooms</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherRooms.map((r) => (
              <Link key={r.id} href={`/rooms/${r.id}`} className="flex gap-4 cursor-pointer group">
                <img src={r.images[0]} alt={r.name} className="w-32 h-32 rounded-lg object-cover" />
                <div>
                  <h4 className="font-serif text-lg text-stone-900 group-hover:text-stone-600 transition-colors">{r.name}</h4>
                  <p className="text-stone-500 text-sm mb-2">{r.tagline}</p>
                  <p className="text-stone-900 font-medium">₹{r.price.toLocaleString()}/night</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={closeLightbox}>
            <ChevronLeft className="w-8 h-8 rotate-45" />
          </button>
          <img src={lightboxImage} alt="Gallery" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}