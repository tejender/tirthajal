'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { roomsData } from '@/lib/data'
import { ChevronLeft, ChevronRight, BedDoubleIcon, BathIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function RoomsPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-header', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.utils.toArray<HTMLElement>('.room-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-28 px-6 md:px-12 bg-white overflow-hidden"
    >
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none 
        bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] 
        bg-[length:22px_22px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-20 page-header">
          <span className="text-xs font-semibold tracking-widest text-[#F36E20] uppercase mb-4 block">
            Accommodations
          </span>

          <h1 className="font-serif text-5xl md:text-7xl font-light text-stone-900">
            Choose Your Sanctuary
          </h1>

          <div className="w-24 h-[3px] bg-[#F36E20] rounded-full mt-6 mb-6"></div>

          <p className="text-stone-600 text-lg max-w-2xl">
            Three unique spaces, each offering distinct views and experiences.
            All include breakfast and evening tea.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {roomsData.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>

      {/* Section Divider Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="#F9FAFB"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,64L80,74.7C160,85,320,107,480,112C640,117,800,107,960,96C1120,85,1280,75,1360,69.3L1440,64V120H0Z" />
        </svg>
      </div>
    </section>
  )
}

function RoomCard({ room }: { room: typeof roomsData[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const enter = () => {
      gsap.to(el, {
        y: -8,
        scale: 1.02,
        boxShadow: '0 18px 45px rgba(243,110,32,0.18)',
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const leave = () => {
      gsap.to(el, {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 35px rgba(0,0,0,0.08)',
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)

    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <Link
      ref={cardRef}
      href={`/rooms/${room.id}`}
      className="room-card group block rounded-2xl border border-stone-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-500"
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-stone-100">
        {room.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${room.name}`}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}

        {/* Badge */}
        <div className="absolute top-4 right-4 px-4 py-1.5 
          bg-gradient-to-r from-[#F36E20] to-[#FDAF16]
          text-white text-xs font-semibold
          rounded-full
          shadow-lg shadow-[#F36E20]/40">
          Up to {room.capacity} Guests
        </div>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {room.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCurrentSlide(idx)
              }}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                idx === currentSlide
                  ? 'bg-[#F36E20] w-6'
                  : 'bg-white/70 w-2'
              )}
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-3">
        <h3 className="font-serif text-xl text-stone-900">
          {room.name}
        </h3>

        <p className="text-stone-500 text-sm">
          {room.tagline}
        </p>

        <p className="text-stone-500 text-sm flex items-center gap-2">
          <BedDoubleIcon size={14} />
          {room.beds}
          <span className="mx-1">•</span>
          <BathIcon size={14} />
          {room.bathrooms} bath
        </p>

        <div className="flex items-baseline gap-1 pt-3">
          <span className="text-2xl font-bold text-[#F36E20]">
            ₹{room.price.toLocaleString()}
          </span>
          <span className="text-stone-500 text-sm">/night</span>
        </div>
      </div>
    </Link>
  )
}
