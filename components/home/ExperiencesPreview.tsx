'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiencesData } from '@/lib/data'
import { Compass, Map, ChefHat, Stars } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const icons = [Compass, Map, ChefHat, Stars]

export default function ExperiencesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-header',
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
        '.exp-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-grid', start: 'top 85%' },
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
        <div className="text-center max-w-3xl mx-auto mb-20 exp-header">
          <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase mb-4 block">
            Experiences
          </span>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-stone-900 mb-6">
            Curated Moments
          </h2>

          <div className="w-16 h-[2px] bg-brand-primary mx-auto mb-6 rounded-full" />

          <p className="text-stone-600 text-lg">
            Beyond accommodation, we offer immersive experiences connecting you with the valley’s culture.
          </p>
        </div>

        {/* GRID */}
        <div className="exp-grid grid md:grid-cols-4 gap-8">

          {experiencesData.map((exp, idx) => {
            const Icon = icons[idx % icons.length]

            return (
              <div
  key={idx}
  className={`exp-card group 
  bg-white 
  rounded-2xl 
  p-8 
  border border-stone-200
  shadow-[0_8px_30px_rgba(0,0,0,0.06)]
  -translate-y-[2px]
  transition-all duration-500
  hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]
  hover:scale-[1.02]
  ${
    idx % 2 === 1 ? 'md:mt-8' : ''
  }`}
>


                {/* ICON */}
                <div className="w-12 h-12 bg-brand-soft rounded-full flex items-center justify-center mb-6 transition duration-500 group-hover:bg-brand-primary">
                  <Icon className="w-6 h-6 text-brand-primary transition duration-500 group-hover:text-white" />
                </div>

                {/* TITLE */}
                <h3 className="font-serif text-xl text-stone-900 mb-3 group-hover:text-brand-primary transition-colors">
                  {exp.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* META */}
                <div className="flex items-center justify-between text-xs">

                  <span className="text-stone-500 uppercase tracking-wider">
                    {exp.duration}
                  </span>

                  <span className="font-medium text-stone-900 group-hover:text-brand-primary transition-colors">
                    ₹{exp.price}
                  </span>

                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="relative">
  <svg
    className="absolute bottom-0 left-0 w-full text-stone-50"
    viewBox="0 0 1440 120"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0,64L80,74.7C160,85,320,107,480,112C640,117,800,107,960,96C1120,85,1280,75,1360,69.3L1440,64V120H0Z" />
  </svg>
</div>

    </section>
  )
}
