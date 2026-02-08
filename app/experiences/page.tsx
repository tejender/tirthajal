'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { experiencesData } from '@/lib/data'
import { Compass, Map, ChefHat, Stars } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const icons = [Compass, Map, ChefHat, Stars]

export default function ExperiencesPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pt-32 pb-24 px-6 md:px-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-medium tracking-widest text-stone-500 uppercase mb-4 block">Experiences</span>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-stone-900 mb-6">Immersive Journeys</h1>
          <p className="text-stone-600 text-lg">Curated activities designed to connect you deeply with the Himalayas.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {experiencesData.map((exp, idx) => {
            const Icon = icons[idx % icons.length]
            return (
              <div key={idx} className="exp-card group bg-white rounded-2xl overflow-hidden hover-lift">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-3xl text-stone-900">{exp.title}</h3>
                    <span className="px-4 py-1 bg-stone-100 rounded-full text-sm font-medium text-stone-700">{exp.duration}</span>
                  </div>
                  <p className="text-stone-600 mb-6 leading-relaxed">{exp.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                    <div><span className="text-2xl font-bold text-stone-900">₹{exp.price}</span><span className="text-stone-500 text-sm">/person</span></div>
                    <button className="px-6 py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors">Book Experience</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-24 bg-stone-900 rounded-3xl p-8 md:p-16 text-center text-white">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Create Your Own Adventure</h2>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto mb-8">Want something specific? We organize custom treks, photography tours, and meditation retreats.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-stone-900 rounded-full font-medium hover:bg-stone-100 transition-colors">Get in Touch</Link>
        </div>
      </div>
    </section>
  )
}