'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Users,
  BedDouble,
  Utensils,
  IndianRupee,
  FileText,
  Phone,
  Calculator,
  X
} from 'lucide-react'
import B2BCalculator from '@/components/b2b/B2BCalculator'
import { b2bTariff } from '@/lib/b2bTariff'

gsap.registerPlugin(ScrollTrigger)

export default function B2BPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [showCalculator, setShowCalculator] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen bg-white pt-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Hero */}
        <div className="text-center mb-20 reveal-text">
          <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6">
            B2B Travel Partner Program
          </h1>
          <p className="text-stone-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Specially curated MAP (Breakfast + Dinner) group tariffs for
            travel agencies and tour operators at Tirthajal Cottage.
          </p>
        </div>

        {/* Property Overview */}
        <div className="mb-20 border-t border-stone-300 pt-16 reveal-text">
          <h2 className="font-serif text-3xl text-stone-900 mb-10">
            Property Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-stone-800 text-lg">
            <div>
              <p className="mb-4">• Total Inventory: <strong>5 Rooms</strong></p>
              <p className="mb-4">• 3 Standard Rooms (Attached Bathroom)</p>
              <p className="mb-4">• 2 Duplex Structures (1 Bathroom per Duplex)</p>
              <p className="mb-4">• Standard Capacity: <strong>14 Guests</strong></p>
              <p>• Maximum with Extra Bedding: <strong>19–20 Guests</strong></p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-stone-900" />
                <span>Ideal for 10+ Pax Groups</span>
              </div>
              <div className="flex items-center gap-3">
                <BedDouble className="w-6 h-6 text-stone-900" />
                <span>Double, Triple & Quad Sharing</span>
              </div>
              <div className="flex items-center gap-3">
                <Utensils className="w-6 h-6 text-stone-900" />
                <span>MAP Plan Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Tariff */}
<div className="mb-20 border-t border-stone-300 pt-16 reveal-text">
  <h2 className="font-serif text-3xl text-stone-900 mb-10">
   Tariffs
  </h2>

  {Object.entries(b2bTariff).map(([season, items]) => (
    <div key={season} className="mb-14">

      <h3 className="text-2xl font-semibold text-stone-900 mb-6 capitalize">
        {season === 'peak' ? 'Seasonal' : 'Off Season'}
      </h3>

      <div className="overflow-x-auto rounded-xl border border-stone-400">
        <table className="w-full text-left text-stone-900">
          <thead className="bg-stone-900 text-white">
            <tr>
              <th className="p-4">Room Type</th>
              <th className="p-4">Sharing Basis</th>
              <th className="p-4">Rate (MAP)</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {items.map((item, index) => (
              <tr
                key={index}
                className="border-t border-stone-300"
              >
                <td className="p-4 font-medium">
                  {item.roomType}
                </td>
                <td className="p-4">
                  {item.sharing}
                </td>
                <td className="p-4">
                  ₹ {item.rate.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

    </div>
  ))}
</div>


        

        {/* Policies */}
        <div className="mb-20 border-t border-stone-300 pt-16 reveal-text">
          <h2 className="font-serif text-3xl text-stone-900 mb-10">
            Payment & Cancellation Policy
          </h2>

          <div className="space-y-6 text-stone-800 text-lg">
            <div className="flex items-center gap-3">
              <IndianRupee className="w-6 h-6" />
              <span>30% Advance to confirm booking</span>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <span>Balance at check-in</span>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <span>Free cancellation up to 5 days before arrival</span>
            </div>
            <p className="text-stone-600 text-sm pt-4">
              Property not GST registered.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white max-w-3xl w-full rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowCalculator(false)}
              className="absolute top-4 right-4 text-stone-600 hover:text-stone-900"
            >
              <X />
            </button>

            <B2BCalculator />
          </div>
        </div>
      )}

      {/* Floating Revenue Button */}
<button
  onClick={() => setShowCalculator(true)}
  className="fixed bottom-6 right-6 z-40 bg-stone-900 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-stone-800 transition-all duration-300 flex items-center gap-3"
>
  <Calculator className="w-5 h-5" />
  <span className="hidden sm:inline font-medium">
    Group Revenue
  </span>
</button>

    </div>
  )
}
