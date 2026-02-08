'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.intro-text', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
      
      gsap.fromTo('.intro-image', { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: '.intro-image', start: 'top 80%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-8 intro-text">
            <span className="text-xs font-medium tracking-widest text-stone-500 uppercase">The Story</span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-stone-900 leading-tight">
              Where time moves with the rivers rhythm
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p className="text-lg">
                Nestled in the pristine Tirthan Valley of Himachal Pradesh, our cottage offers an escape from the digital noise into the analog embrace of nature.
              </p>
              <p>
                Built using traditional Kath-Kuni architecture—an ancient technique using interlocking wooden beams without nails.
              </p>
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 text-stone-900 font-medium hover-underline group">
              <span>Discover Our Philosophy</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="intro-image rounded-lg overflow-hidden aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop" 
                alt="Cottage Interior" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-64 bg-stone-200 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}