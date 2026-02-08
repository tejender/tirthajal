'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, ChevronDown } from 'lucide-react'

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    { q: 'How do I reach Tirthan Valley?', a: 'Nearest airport is Kullu (Bhuntar), 50km away. From Delhi, it is a 12-hour scenic drive or overnight Volvo to Aut, then 1 hour to the cottage.' },
    { q: 'What is the best time to visit?', a: 'March-June for pleasant weather. September-November for clear views. December-February for snow.' },
    { q: 'Is the cottage pet-friendly?', a: 'Yes, the Forest Cabin welcomes pets. We have a resident dog Leo who loves company.' },
    { q: 'Do you have WiFi?', a: 'Yes, but it is satellite-based and suitable for emails, not video calls. We encourage digital detox.' }
  ]

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-xs font-medium tracking-widest text-stone-500 uppercase mb-4 block">Contact</span>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-stone-900 mb-8">Get in Touch</h1>
            <p className="text-stone-600 text-lg mb-12 leading-relaxed">Have questions about your stay? We would love to hear from you.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><MapPin className="w-5 h-5 text-stone-700" /></div>
                <div>
                  <h3 className="font-serif text-xl text-stone-900 mb-1">Location</h3>
                  <p className="text-stone-600">Village Gushaini, Tirthan Valley<br />Himachal Pradesh, India 175123</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><Phone className="w-5 h-5 text-stone-700" /></div>
                <div>
                  <h3 className="font-serif text-xl text-stone-900 mb-1">Phone</h3>
                  <p className="text-stone-600">+91 98765 43210<br />+91 98765 43211</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><Mail className="w-5 h-5 text-stone-700" /></div>
                <div>
                  <h3 className="font-serif text-xl text-stone-900 mb-1">Email</h3>
                  <p className="text-stone-600">info@tirthancottage.com<br />bookings@tirthancottage.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 map-container h-[300px] rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg z-10">
                  <MapPin className="w-8 h-8 text-stone-700 mx-auto mb-2" />
                  <p className="font-medium text-stone-900">Tirthan Valley</p>
                  <p className="text-sm text-stone-500">31.8276° N, 77.2166° E</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="font-serif text-3xl text-stone-900 mb-6">Send us a message</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-900 focus:outline-none transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-900 focus:outline-none transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-900 focus:outline-none transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-900 focus:outline-none transition-colors resize-none" placeholder="Tell us about your plans..."></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors">Send Message</button>
            </form>
          </div>
        </div>

        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-stone-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden">
                <button className="w-full p-6 flex justify-between items-center text-left" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <h3 className="font-medium text-stone-900">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && <div className="px-6 pb-6 text-stone-600 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}