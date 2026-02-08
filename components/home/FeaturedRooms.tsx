'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { roomsData } from '@/lib/data'
import { ArrowRight, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedRooms() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.section-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })

      gsap.fromTo('.room-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.rooms-grid', start: 'top 80%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 section-header">
          <div>
            <span className="text-xs font-medium tracking-widest text-stone-500 uppercase mb-4 block">Accommodations</span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-stone-900">Sanctuaries of Peace</h2>
          </div>
          <Link href="/rooms" className="mt-4 md:mt-0 text-stone-900 font-medium hover-underline inline-flex items-center gap-2 group">
            View All Rooms
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="rooms-grid grid md:grid-cols-3 gap-8">
          {roomsData.map((room, idx) => (
            <Link key={room.id} href={`/rooms/${room.id}`} className={`group room-card ${idx === 1 ? 'md:mt-12' : ''}`}>
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-6">
                <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {room.capacity}
                </div>
              </div>
              
              <h3 className="font-serif text-2xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">{room.name}</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">{room.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="text-stone-900 font-medium">₹{room.price.toLocaleString()}/night</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                  View Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}