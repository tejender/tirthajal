'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { roomsData } from '@/lib/data'
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function RoomsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef<HTMLDivElement>(null)

  const filters = ['All', '2 Guests', '4 Guests', 'River View', 'Mountain View']

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-header', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      gsap.fromTo('.room-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.rooms-grid', start: 'top 85%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 page-header">
          <span className="text-xs font-medium tracking-widest text-stone-500 uppercase mb-4 block">Accommodations</span>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-stone-900 mb-6">Choose Your Sanctuary</h1>
          <p className="text-stone-600 text-lg max-w-2xl">Three unique spaces, each offering distinct views and experiences. All include breakfast and evening tea.</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12 sticky top-24 bg-white/95 backdrop-blur-sm py-4 z-30 border-b border-stone-100">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-6 py-2 rounded-full border text-sm font-medium transition-all',
                activeFilter === filter ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-600 hover:border-stone-900 hover:text-stone-900'
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="rooms-grid grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {roomsData.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        <div className="mt-24">
          <h2 className="font-serif text-3xl text-stone-900 mb-8">Compare Accommodations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="py-4 pr-4 font-medium text-stone-900">Feature</th>
                  {roomsData.map((r) => <th key={r.id} className="py-4 px-4 font-serif text-lg text-stone-900">{r.name}</th>)}
                </tr>
              </thead>
              <tbody className="text-sm text-stone-600">
                <tr className="border-b border-stone-100"><td className="py-4 pr-4 font-medium">Size</td>{roomsData.map((r) => <td key={r.id} className="py-4 px-4">{r.size}</td>)}</tr>
                <tr className="border-b border-stone-100"><td className="py-4 pr-4 font-medium">Max Guests</td>{roomsData.map((r) => <td key={r.id} className="py-4 px-4">{r.capacity}</td>)}</tr>
                <tr className="border-b border-stone-100"><td className="py-4 pr-4 font-medium">Bed Type</td>{roomsData.map((r) => <td key={r.id} className="py-4 px-4">{r.beds}</td>)}</tr>
                <tr><td className="py-4 pr-4 font-medium">Price/Night</td>{roomsData.map((r) => <td key={r.id} className="py-4 px-4 font-semibold text-stone-900">₹{r.price.toLocaleString()}</td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function RoomCard({ room }: { room: typeof roomsData[0] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentSlide((prev) => (prev + 1) % room.images.length)
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentSlide((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  return (
    <Link href={`/rooms/${room.id}`} className="room-card group block">
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-stone-100">
        <div className="relative h-full">
          {room.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${room.name} ${idx + 1}`} className={cn('absolute inset-0 w-full h-full object-cover transition-opacity duration-500', idx === currentSlide ? 'opacity-100' : 'opacity-0')} />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {room.images.map((_, idx) => (
            <button key={idx} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentSlide(idx); }} className={cn('w-1.5 h-1.5 rounded-full transition-all', idx === currentSlide ? 'bg-white w-4' : 'bg-white/50')} />
          ))}
        </div>

        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4" />
        </button>

        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform">
          <Heart className="w-6 h-6 text-white drop-shadow-md" />
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-lg font-medium text-stone-900">{room.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-stone-900 text-stone-900" />
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>
        <p className="text-stone-500 text-sm">{room.tagline}</p>
        <p className="text-stone-500 text-sm">{room.beds} · {room.bathrooms} bath</p>
        <div className="flex items-baseline gap-1 pt-2">
          <span className="text-2xl font-bold text-stone-900">₹{room.price.toLocaleString()}</span>
          <span className="text-stone-500 text-sm">/night</span>
        </div>
      </div>
    </Link>
  )
}