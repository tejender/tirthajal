'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { roomsData } from '@/lib/data'
import { ArrowRight, Users } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedRooms() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.section-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.room-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.rooms-grid', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 section-header">

          <div>
            <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase mb-4 block">
              Accommodations
            </span>

            <h2 className="font-serif text-4xl md:text-6xl font-light text-stone-900">
              Sanctuaries of Peace
            </h2>

            <div className="w-16 h-[2px] bg-brand-primary mt-6 rounded-full" />
          </div>

          <Link
            href="/rooms"
            className="mt-6 md:mt-0 inline-flex items-center gap-3 text-stone-900 font-medium group"
          >
            <span className="relative">
              View All Rooms
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-brand-primary transition-all duration-500 group-hover:w-full" />
            </span>
            <ArrowRight className="w-4 h-4 text-brand-primary transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* GRID */}
        <div className="rooms-grid grid md:grid-cols-3 gap-10">

          {roomsData.map((room, idx) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className={`group room-card transition duration-500 hover:-translate-y-2 ${
                idx === 1 ? 'md:mt-12' : ''
              }`}
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-6 shadow-premium">

                <Image
    src={room.images[0]}
    alt={room.name}
    fill
    className="object-cover transition-transform duration-700 group-hover:scale-110"
    sizes="(max-width: 768px) 100vw, 33vw"
  />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Capacity Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 
                  bg-white/90 backdrop-blur-md 
                  text-brand-primary text-xs font-semibold 
                  rounded-full 
                  border border-brand-primary/30
                  shadow-sm flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {room.capacity}
                </div>
              </div>

              {/* CONTENT */}
              <h3 className="font-serif text-2xl text-stone-900 mb-2 group-hover:text-brand-primary transition-colors">
                {room.name}
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {room.tagline}
              </p>

              <div className="flex items-center justify-between">

                <span className="text-stone-900 font-medium group-hover:text-brand-primary transition-colors">
                  ₹{room.price.toLocaleString()}/night
                </span>

                <span className="text-xs text-stone-500 uppercase tracking-wider inline-flex items-center gap-1 group-hover:text-brand-primary transition-colors">
                  View Details
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </span>

              </div>
            </Link>
          ))}
        </div>
      </div>
      
    </section>
  )
}
