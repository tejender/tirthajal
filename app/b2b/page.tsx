'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Calculator,
  X,
  Download
} from 'lucide-react'
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

      // Parallax Hero
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

      // Image Reveal
      gsap.from('.reveal-img', {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      })

      // Stats Counter
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

  return (
    <div ref={sectionRef} className="bg-white relative">

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
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">
              B2B Travel Partner Program
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Structured group tariffs and optimized allocation for agencies.
            </p>
          </div>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">

        {/* STATS */}
        <section ref={statsRef} className="grid md:grid-cols-4 gap-10 text-center mb-24">
          <div>
            <h3 className="text-4xl font-bold counter" data-target="21">0</h3>
            <p className="text-stone-600">Max Capacity</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold counter" data-target="5">0</h3>
            <p className="text-stone-600">Total Rooms</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold counter" data-target="2">0</h3>
            <p className="text-stone-600">Duplex Units</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold counter" data-target="3">0</h3>
            <p className="text-stone-600">Standard Rooms</p>
          </div>
        </section>


        {/* GALLERY */}
        <section className="grid md:grid-cols-3 gap-8 mb-24">
          <img
            className="rounded-xl shadow-lg reveal-img"
            src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80"
            alt="Room"
          />
          <img
            className="rounded-xl shadow-lg reveal-img"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Duplex"
          />
          <img
            className="rounded-xl shadow-lg reveal-img"
            src="https://images.unsplash.com/photo-1551776235-dde6d482980c?auto=format&fit=crop&w=800&q=80"
            alt="Dining"
          />
        </section>


        <section className="mb-28">
  <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
    B2B MAP Tariffs
  </h2>

  {Object.entries(b2bTariff).map(([season, items]) => (
    <div key={season} className="mb-16">

      {/* Season Heading */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-stone-900 capitalize">
          {season === 'peak' ? 'Peak Season' : 'Off Season'}
        </h3>
        <span className="text-sm text-stone-600 bg-stone-100 px-4 py-1 rounded-full">
          MAP Plan (Per Person / Per Night)
        </span>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">

        <table className="w-full text-left border-collapse">

          {/* Header */}
          <thead>
            <tr className="bg-gradient-to-r from-stone-900 to-stone-700 text-white">
              <th className="px-6 py-5 text-sm font-semibold tracking-wide">
                Room Type
              </th>
              <th className="px-6 py-5 text-sm font-semibold tracking-wide">
                Sharing Basis
              </th>
              <th className="px-6 py-5 text-sm font-semibold tracking-wide text-right">
                Rate (₹)
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors duration-200 ${
                  index % 2 === 0
                    ? 'bg-white'
                    : 'bg-stone-50'
                } hover:bg-stone-100`}
              >
                <td className="px-6 py-5 font-medium text-stone-900">
                  {item.roomType}
                </td>

                <td className="px-6 py-5 text-stone-700">
                  {item.sharing}
                </td>

                <td className="px-6 py-5 font-semibold text-stone-900 text-right">
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
<section className="mb-28">
  <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
    Operational Guidelines
  </h2>

  <div className="grid md:grid-cols-2 gap-10">

    <div className="bg-stone-50 p-8 rounded-2xl shadow-sm border border-stone-200">
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

    <div className="bg-stone-50 p-8 rounded-2xl shadow-sm border border-stone-200">
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
<section className="mb-28 bg-gradient-to-r from-stone-100 to-stone-50 rounded-3xl p-12 shadow-inner">
  <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
    Payment & Cancellation Terms
  </h2>

  <div className="grid md:grid-cols-3 gap-10 text-stone-800">

    <div>
      <h4 className="font-semibold text-lg mb-4">Advance Policy</h4>
      <p>30% advance required to confirm group booking.</p>
    </div>

    <div>
      <h4 className="font-semibold text-lg mb-4">Balance Payment</h4>
      <p>Remaining 70% payable at check-in.</p>
    </div>

    <div>
      <h4 className="font-semibold text-lg mb-4">Cancellation</h4>
      <p>Free cancellation up to 5 days before arrival. Within 5 days – advance non-refundable.</p>
    </div>

  </div>

  <p className="text-center text-stone-600 mt-10 text-sm">
    Rates valid until March 31, 2026. Subject to revision without prior notice.
  </p>
</section>
<section className="mb-28">
  <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
    Driver & Tour Leader Policy
  </h2>

  <div className="grid md:grid-cols-2 gap-10">

    <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
      <h3 className="text-xl font-semibold mb-4 text-stone-900">
        Driver Accommodation
      </h3>
      <p className="text-stone-700">
        One driver accommodation complimentary (without MAP). Additional drivers chargeable.
      </p>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
      <h3 className="text-xl font-semibold mb-4 text-stone-900">
        Tour Leader
      </h3>
      <p className="text-stone-700">
        Leaders are counted as regular guests. Separate room reduces overall group capacity.
      </p>
    </div>

  </div>
</section>

<section className="mb-28 bg-stone-900 text-white rounded-3xl p-14">
  <h2 className="font-serif text-4xl text-center mb-16">
    Optional Group Add-Ons
  </h2>

  <div className="grid md:grid-cols-3 gap-10 text-center">

    <div>
      <h4 className="font-semibold mb-3 text-lg">Bonfire Evening</h4>
      <p className="opacity-80 text-sm">
        Private bonfire setup with seating arrangement.
      </p>
    </div>

    <div>
      <h4 className="font-semibold mb-3 text-lg">Packed Lunch</h4>
      <p className="opacity-80 text-sm">
        Ideal for GHNP treks & sightseeing days.
      </p>
    </div>

    <div>
      <h4 className="font-semibold mb-3 text-lg">Local Sightseeing Assistance</h4>
      <p className="opacity-80 text-sm">
        Assistance with transport & local guides.
      </p>
    </div>

  </div>
</section>

<section className="mb-28">
  <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
    Conduct & Safety Guidelines
  </h2>

  <div className="bg-stone-50 p-10 rounded-2xl border border-stone-200 text-stone-700 space-y-4">
    <p>• Any damage to property will be chargeable.</p>
    <p>• Noise restrictions apply after 10:00 PM.</p>
    <p>• Illegal activities strictly prohibited.</p>
    <p>• Property not responsible for road blockages, natural calamities, or force majeure situations.</p>
  </div>
</section>

<section className="mb-20 text-center">
  <h2 className="font-serif text-4xl text-stone-900 mb-10">
    Dedicated B2B Contact
  </h2>

  <div className="bg-stone-100 rounded-2xl p-12 shadow-md inline-block">
    <p className="text-lg text-stone-800 mb-4">
      For contract rates, seasonal blocking or large group tie-ups:
    </p>

    <p className="text-xl font-semibold text-stone-900">
      +91 XXXXX XXXXX
    </p>

    <p className="text-stone-600 mt-2">
      b2b@tirthajalcottage.com
    </p>
  </div>
</section>



      </div>

      {/* CALCULATOR MODAL */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white max-w-4xl w-full rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
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
        className="fixed bottom-6 right-6 z-40 bg-stone-900 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-stone-800 transition flex items-center gap-3"
      >
        <Calculator className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">
          Group Revenue
        </span>
      </button>

    </div>
  )
}
