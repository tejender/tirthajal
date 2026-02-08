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
      gsap.fromTo('.exp-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })

      gsap.fromTo('.exp-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-grid', start: 'top 80%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 exp-header">
          <span className="text-xs font-medium tracking-widest text-stone-500 uppercase mb-4 block">Experiences</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-stone-900 mb-6">Curated Moments</h2>
          <p className="text-stone-600 text-lg">Beyond accommodation, we offer immersive experiences connecting you with the valleys culture.</p>
        </div>

        <div className="exp-grid grid md:grid-cols-4 gap-6">
          {experiencesData.map((exp, idx) => {
            const Icon = icons[idx % icons.length]
            return (
              <div key={idx} className={`exp-card group hover-lift bg-white rounded-2xl p-8 ${idx % 2 === 1 ? 'md:mt-8' : ''}`}>
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">{exp.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{exp.description}</p>
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>{exp.duration}</span>
                  <span className="font-medium text-stone-900">₹{exp.price}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}