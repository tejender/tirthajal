'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.timeline-img').forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
            },
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white min-h-screen">

      {/* HERO */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">
              Our Story
            </h1>

            <div className="w-20 h-1 bg-[#F36E20] mx-auto rounded-full mb-6"></div>

            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              From a humble family cottage to a curated Himalayan retreat.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-24">

        {/* TIMELINE */}
        <div className="space-y-32">

          {/* 2015 */}
          <div className="grid md:grid-cols-2 gap-14 items-center reveal-text">

            <div>
              <span className="text-6xl font-serif font-bold text-[#F36E20]">
                2015
              </span>

              <h3 className="font-serif text-3xl text-stone-900 mt-6 mb-6">
                The Beginning
              </h3>

              <p className="text-stone-600 leading-relaxed text-lg">
                What started as a humble family cottage built by grandfather
                Thakur Singh in 1987 became our sanctuary away from Delhi’s chaos.
              </p>
            </div>

            <div className="timeline-img rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="History"
              />
            </div>

          </div>

          {/* 2019 */}
          <div className="grid md:grid-cols-2 gap-14 items-center reveal-text">

            <div className="timeline-img rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] md:order-1 order-2">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="Restoration"
              />
            </div>

            <div className="md:order-2 order-1">
              <span className="text-6xl font-serif font-bold text-[#F36E20]">
                2019
              </span>

              <h3 className="font-serif text-3xl text-stone-900 mt-6 mb-6">
                The Transformation
              </h3>

              <p className="text-stone-600 leading-relaxed text-lg">
                We restored the cottage using traditional Kath-Kuni techniques,
                ensuring modern comforts while preserving heritage and mountain identity.
              </p>
            </div>

          </div>

        </div>

        {/* VALUES */}
        <div className="mt-40 reveal-text">

          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-stone-900 mb-6">
              Our Values
            </h2>
            <div className="w-20 h-1 bg-[#F36E20] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">

            {[
              {
                title: 'Sustainability First',
                desc: 'We operate responsibly and minimize ecological impact.',
              },
              {
                title: 'Community Support',
                desc: 'We collaborate with local artisans and villagers.',
              },
              {
                title: 'Conscious Luxury',
                desc: 'Comfort without compromising authenticity.',
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-3xl text-center
                shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                transition duration-500"
              >
                <h3 className="font-serif text-2xl text-stone-900 mb-4">
                  {value.title}
                </h3>

                <div className="w-12 h-1 bg-[#F36E20] mx-auto mb-6 rounded-full"></div>

                <p className="text-stone-600 text-base leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  )
}
