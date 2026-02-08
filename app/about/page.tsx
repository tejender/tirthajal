'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-text', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
      gsap.fromTo('.timeline-img', { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: '.timeline-img', start: 'top 80%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pt-32 pb-24 px-6 md:px-12 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 reveal-text">
          <span className="text-xs font-medium tracking-widest text-stone-500 uppercase mb-4 block">About Us</span>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-stone-900 mb-6">Our Story</h1>
          <p className="text-xl text-stone-600 max-w-3xl">From a familys vacation home to a boutique retreat.</p>
        </div>

        <div className="space-y-24">
          <div className="grid md:grid-cols-2 gap-12 items-center reveal-text">
            <div className="order-2 md:order-1">
              <span className="text-6xl font-serif text-stone-200 font-bold">2015</span>
              <h3 className="font-serif text-2xl text-stone-900 mt-4 mb-4">The Beginning</h3>
              <p className="text-stone-600 leading-relaxed">What started as a humble family cottage built by grandfather Thakur Singh in 1987, became our sanctuary away from Delhis chaos.</p>
            </div>
            <div className="order-1 md:order-2 timeline-img rounded-lg overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="History" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center reveal-text">
            <div className="timeline-img rounded-lg overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Restoration" />
            </div>
            <div>
              <span className="text-6xl font-serif text-stone-200 font-bold">2019</span>
              <h3 className="font-serif text-2xl text-stone-900 mt-4 mb-4">The Transformation</h3>
              <p className="text-stone-600 leading-relaxed mb-4">We restored the cottage using traditional Kath-Kuni techniques, ensuring modern comforts while preserving heritage.</p>
            </div>
          </div>
        </div>

        <div className="mt-32 reveal-text">
          <h2 className="font-serif text-4xl text-stone-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Sustainability First', 'Community Support', 'Conscious Luxury'].map((value, idx) => (
              <div key={idx} className="text-center p-8 bg-white rounded-2xl hover-lift">
                <h3 className="font-serif text-xl text-stone-900 mb-3">{value}</h3>
                <p className="text-stone-600 text-sm">Committed to preserving the Himalayas for future generations.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}