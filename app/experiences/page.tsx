'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, MapPin } from 'lucide-react'
import { experiences } from '@/lib/experiencesData'

gsap.registerPlugin(ScrollTrigger)

type Experience = {
  title: string
  image: string
  location: string
  duration: string
  difficulty: 'Easy' | 'Moderate' | 'Scenic' | 'Heritage'
  short: string
  overview: string
  highlights: string[]
  bestTime: string
  distance: string
  tip: string
}

export default function ExperiencesPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState<Experience | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      // Parallax hero
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            scrub: true
          }
        })
      }

      // Reveal cards
      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const badgeColor = (level: string) => {
    switch (level) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-900'
      case 'Moderate':
        return 'bg-amber-100 text-amber-900'
      case 'Scenic':
        return 'bg-sky-100 text-sky-900'
      case 'Heritage':
        return 'bg-purple-100 text-purple-900'
      default:
        return 'bg-stone-100 text-stone-900'
    }
  }

  return (
    <div ref={sectionRef} className="bg-stone-50">

      {/* HERO */}
      <section className="relative h-[75vh] overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">
              Himalayan Experiences
            </h1>

            {/* Accent Divider */}
            <div className="w-20 h-1 bg-[#F36E20] mx-auto rounded-full mb-6"></div>

            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Discover curated journeys around Jibhi & Tirthan Valley.
            </p>
          </div>
        </div>
      </section>


      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-2 gap-12">

        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="exp-card bg-white rounded-3xl overflow-hidden
            shadow-[0_10px_35px_rgba(0,0,0,0.08)]
            hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)]
            transition duration-500"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-stone-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F36E20]" />
                  {exp.location}
                </span>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${badgeColor(
                    exp.difficulty
                  )}`}
                >
                  {exp.difficulty}
                </span>
              </div>

              <h3 className="font-serif text-3xl text-stone-900 mb-4">
                {exp.title}
              </h3>

              <p className="text-stone-600 mb-6">{exp.short}</p>

              <button
                onClick={() => setSelected(exp)}
                className="px-6 py-3 
                bg-[#F36E20] text-white 
                rounded-full 
                hover:bg-[#D65E1A]
                transition duration-300"
              >
                Explore Guide
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full rounded-3xl overflow-y-auto max-h-[90vh] shadow-2xl relative">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-stone-600 hover:text-[#F36E20]"
            >
              <X />
            </button>

            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-72 object-cover"
            />

            <div className="p-10 space-y-6">
              <h2 className="font-serif text-4xl text-stone-900">
                {selected.title}
              </h2>

              <div className="w-12 h-1 bg-[#F36E20] rounded-full"></div>

              <p className="text-stone-600">{selected.overview}</p>

              <div>
                <h4 className="font-semibold mb-2 text-stone-900">Highlights</h4>
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  {selected.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-sm text-stone-700">
                <div><strong>Best Time:</strong> {selected.bestTime}</div>
                <div><strong>Distance:</strong> {selected.distance}</div>
              </div>

              <div className="bg-stone-100 p-6 rounded-xl border-l-4 border-[#F36E20]">
                <p className="text-stone-800">
                  🌿 <strong>Local Tip:</strong> {selected.tip}
                </p>
              </div>

              <p className="text-center text-stone-500 text-sm">
                Exclusive guidance available for Tirthajal Cottage guests.
              </p>
            </div>
          </div>
        </div>
      )}


      {/* CONTINUE YOUR JOURNEY */}
      <section className="bg-white py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Continue Your Himalayan Journey
            </h2>

            <div className="w-20 h-1 bg-[#F36E20] mx-auto rounded-full mb-6"></div>

            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Extend your trip to explore more mountain gems nearby.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              { name: 'Manali', image: 'https://images.unsplash.com/photo-1605538883669-825d2d5b1e36?auto=format&fit=crop&w=800&q=80', time: '3–4 hrs drive' },
              { name: 'Kasol', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80', time: '2.5 hrs drive' },
              { name: 'Tosh', image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80', time: '3 hrs drive' },
              { name: 'Kullu', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', time: '1.5 hrs drive' }
            ].map((place, index) => (
              <div
                key={index}
                className="group bg-stone-50 rounded-3xl overflow-hidden
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)]
                transition duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">
                    {place.name}
                  </h3>
                  <p className="text-stone-600 text-sm">
                    {place.time}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  )
}
