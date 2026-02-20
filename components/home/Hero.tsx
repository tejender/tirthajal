'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo('.hero-subtitle', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .fromTo('.hero-title', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6')
        .fromTo('.hero-divider', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo('.hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
        .fromTo('.hero-cta', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')

      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      gsap.to('.scroll-indicator', {
        y: 10,
        opacity: 0.4,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop"
          alt="Tirthan Valley Mountains"
          className="w-full h-full object-cover scale-110"
        />

        {/* Cinematic + Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

        <div className="overflow-hidden mb-4">
          <p className="hero-subtitle font-serif italic text-xl md:text-2xl text-brand-hover tracking-wide">
            Welcome to the Himalayas
          </p>
        </div>

        <div className="overflow-hidden">
          <h1 className="hero-title font-serif text-5xl md:text-7xl lg:text-9xl font-light text-white tracking-tight leading-none">
            Tirthan Valley
          </h1>
        </div>

        {/* Accent Divider */}
        <div className="hero-divider w-24 h-[2px] bg-brand-primary mt-6 mb-6 origin-left rounded-full" />

        <div className="overflow-hidden">
          <p className="hero-desc text-stone-300 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            A secluded cottage retreat where the river sings and mountains whisper ancient tales.
          </p>
        </div>

        {/* CTA */}
        <div className="hero-cta mt-12">
          <Link
            href="/rooms"
            className="group inline-flex items-center gap-3 px-8 py-4 
            bg-brand-primary 
            hover:bg-brand-hover 
            text-white 
            rounded-full 
            shadow-brand
            transition-all duration-500"
          >
            <span className="text-sm font-medium tracking-wider">
              EXPLORE RETREAT
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 scroll-indicator">
        <div className="w-px h-16 bg-gradient-to-b from-brand-primary to-transparent" />
      </div>
    </section>
  )
}
