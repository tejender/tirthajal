'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calculator, X } from 'lucide-react'
import B2BCalculator from '@/components/b2b/B2BCalculator'
import { b2bTariff } from '@/lib/b2bTariff'

gsap.registerPlugin(ScrollTrigger)

export default function B2BPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const statsRef = useRef<HTMLDivElement | null>(null)
  const [showCalculator, setShowCalculator] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      // Hero Parallax
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

      // Reveal animation
      gsap.from('.reveal', {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      })

      // Counter animation
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll<HTMLElement>('.counter')
        counters.forEach((counter) => {
          const target = Number(counter.dataset.target)
          gsap.fromTo(
            counter,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 80%'
              }
            }
          )
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cardStyle =
    "bg-white rounded-2xl border border-stone-200 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition duration-500"

  return (
    <div ref={sectionRef} className="bg-white">

      {/* HERO */}
      <section className="relative h-[80vh] overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl tracking-tight mb-6">
              B2B Travel Partner Program
            </h1>
            <div className="w-20 h-1 bg-white/70 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Structured group tariffs and operational clarity for agencies.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-28">

        {/* STATS */}
        <section ref={statsRef} className="grid md:grid-cols-4 gap-8 mb-28 reveal">
          {[
            { value: 21, label: 'Max Capacity' },
            { value: 5, label: 'Total Rooms' },
            { value: 2, label: 'Duplex Units' },
            { value: 3, label: 'Standard Rooms' }
          ].map((item, i) => (
            <div key={i} className={cardStyle + " p-10 text-center"}>
              <h3
                className="text-5xl font-bold text-[#F36E20] counter"
                data-target={item.value}
              >
                0
              </h3>
              <p className="text-stone-600 mt-3 text-sm tracking-wide uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </section>

        {/* TARIFFS */}
        <section className="mb-28 reveal">
          <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
            B2B MAP Tariffs
          </h2>

          {Object.entries(b2bTariff).map(([season, items]) => (
            <div key={season} className="mb-16">

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold text-stone-900 capitalize">
                  {season === 'peak' ? 'Peak Season' : 'Off Season'}
                </h3>
                <span className="text-sm text-stone-600 bg-stone-100 px-4 py-1 rounded-full">
                  Per Person / Per Night (MAP)
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-[0_12px_40px_rgba(0,0,0,0.07)]">

                <table className="w-full text-left border-collapse">

                  <thead className="bg-stone-900 text-white">
                    <tr>
                      <th className="px-6 py-5 text-sm font-semibold">Room Type</th>
                      <th className="px-6 py-5 text-sm font-semibold">Sharing Basis</th>
                      <th className="px-6 py-5 text-sm font-semibold text-right">Rate (₹)</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, index) => (
                      <tr
                        key={index}
                        className={`transition-all duration-300
                        ${index % 2 === 0 ? 'bg-white' : 'bg-stone-50'}
                        hover:bg-[#F36E20]/5`}
                      >
                        <td className="px-6 py-5 font-medium text-stone-900">
                          {item.roomType}
                        </td>
                        <td className="px-6 py-5 text-stone-700">
                          {item.sharing}
                        </td>
                        <td className="px-6 py-5 font-semibold text-[#F36E20] text-right">
                          ₹ {item.rate.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          ))}
        </section>

        {/* OPERATIONAL GUIDELINES */}
        <section className="mb-28 reveal">
          <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
            Operational Guidelines
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div className={cardStyle + " p-8"}>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">
                Check-in & Check-out
              </h3>
              <ul className="space-y-2 text-stone-700">
                <li>• Standard Check-in: 12:00 PM</li>
                <li>• Standard Check-out: 11:00 AM</li>
                <li>• Early check-in subject to availability</li>
                <li>• Late check-out chargeable</li>
              </ul>
            </div>

            <div className={cardStyle + " p-8"}>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">
                Room Allocation Policy
              </h3>
              <ul className="space-y-2 text-stone-700">
                <li>• Allocation subject to availability</li>
                <li>• Final layout based on operational feasibility</li>
                <li>• Duplex includes single shared bathroom</li>
                <li>• Leader room counted as regular occupancy</li>
              </ul>
            </div>

          </div>
        </section>

        {/* DRIVER & TOUR LEADER */}
        <section className="mb-28 reveal">
          <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
            Driver & Tour Leader Policy
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div className={cardStyle + " p-8"}>
              <h3 className="text-xl font-semibold mb-4 text-stone-900">
                Driver Accommodation
              </h3>
              <p className="text-stone-700">
                One driver accommodation complimentary (without MAP).
                Additional drivers chargeable.
              </p>
            </div>

            <div className={cardStyle + " p-8"}>
              <h3 className="text-xl font-semibold mb-4 text-stone-900">
                Tour Leader
              </h3>
              <p className="text-stone-700">
                Leaders counted as regular guests. Separate room reduces
                overall group capacity.
              </p>
            </div>

          </div>
        </section>

        {/* ADD-ONS */}
        <section className="mb-28 reveal">
          <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
            Optional Group Add-Ons
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {[
              { title: 'Bonfire Evening', desc: 'Private bonfire with seating.' },
              { title: 'Packed Lunch', desc: 'Ideal for GHNP & sightseeing.' },
              { title: 'Local Sightseeing Assistance', desc: 'Transport & guide coordination.' }
            ].map((item, i) => (
              <div key={i} className={cardStyle + " p-8 text-center"}>
                <h4 className="font-semibold mb-3 text-lg text-stone-900">
                  {item.title}
                </h4>
                <p className="text-stone-700 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* SAFETY */}
        <section className="mb-28 reveal">
          <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
            Conduct & Safety Guidelines
          </h2>

          <div className={cardStyle + " p-10 text-stone-700 space-y-4"}>
            <p>• Any damage to property will be chargeable.</p>
            <p>• Noise restrictions apply after 10:00 PM.</p>
            <p>• Illegal activities strictly prohibited.</p>
            <p>• Property not responsible for road blockages or force majeure situations.</p>
          </div>
        </section>

      </div>

      {/* MODAL */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white max-w-4xl w-full rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowCalculator(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>
            <B2BCalculator />
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setShowCalculator(true)}
        className="fixed bottom-6 right-6 z-40 
        bg-gradient-to-r from-[#F36E20] to-[#FDAF16]
        text-white px-6 py-4 rounded-full
        shadow-xl shadow-[#F36E20]/30
        hover:scale-105 transition-all duration-300
        flex items-center gap-3"
      >
        <Calculator className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">
          Group Revenue
        </span>
      </button>

    </div>
  )
}
