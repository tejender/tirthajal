'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intro-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.intro-image',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.intro-image',
            start: 'top 80%',
          },
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
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">

          {/* TEXT SIDE */}
          <div className="space-y-8 intro-text">

            <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">
              The Story
            </span>

            <h2 className="font-serif text-4xl md:text-6xl font-light text-stone-900 leading-tight">
              Where time moves with the river’s rhythm
            </h2>

            {/* Accent Divider */}
            <div className="w-16 h-[2px] bg-brand-primary rounded-full" />

            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p className="text-lg">
                Nestled in the pristine Tirthan Valley of Himachal Pradesh, our cottage offers an escape from the digital noise into the analog embrace of nature.
              </p>
              <p>
                Built using traditional Kath-Kuni architecture — an ancient technique using interlocking wooden beams without nails.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-stone-900 font-medium group"
            >
              <span className="relative">
                Discover Our Philosophy
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-brand-primary transition-all duration-500 group-hover:w-full" />
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform text-brand-primary" />
            </Link>
          </div>

          {/* IMAGE SIDE */}
          <div className="relative">

            <div className="intro-image relative rounded-2xl overflow-hidden aspect-[4/5] shadow-premium">

              <Image
                 
                  src="/images/3.jpeg"
                  alt="Tirthan Valley Mountains"
                  fill
                  priority
                  className="object-cover"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Accent Frame */}
            <div className="absolute -bottom-10 -left-10 w-48 h-64 bg-brand-soft rounded-2xl -z-10 border border-brand-primary/20" />
          </div>

        </div>
      </div>
    </section>
  )
}
