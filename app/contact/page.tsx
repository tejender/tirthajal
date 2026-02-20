'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import type { ReactNode, FormEvent } from 'react'
import { MapPin, Phone, Mail, ChevronDown } from 'lucide-react'

type FAQ = {
  q: string
  a: string
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formStart] = useState(() => Date.now())
  const [showFormModal, setShowFormModal] = useState(false)

  const faqs: FAQ[] = [
    {
      q: 'How do I reach Tirthan Valley?',
      a: 'Nearest airport is Kullu (Bhuntar), 50km away. From Delhi, it is a 12-hour scenic drive or overnight Volvo to Aut, then 1 hour to the cottage.',
    },
    {
      q: 'What is the best time to visit?',
      a: 'March–June for pleasant weather. September–November for clear views. December–February for snow.',
    },
    {
      q: 'Is the cottage pet-friendly?',
      a: 'Yes, the Forest Cabin welcomes pets.',
    },
    {
      q: 'Do you have WiFi?',
      a: 'Yes, but it is satellite-based and suitable for emails, not video calls.',
    },
  ]

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: String(data.get('firstName') || ''),
        lastName: String(data.get('lastName') || ''),
        email: String(data.get('email') || ''),
        message: String(data.get('message') || ''),
        company: String(data.get('company') || ''),
        formStart: Number(data.get('formStart') || 0),
      }),
    })

    setLoading(false)

    if (res.ok) {
      toast.success('Message sent! We’ll get back to you shortly 🌿')
      form.reset()
      setShowFormModal(false)
    } else {
      toast.error('Failed to send message.')
    }
  }

  return (
    <section className="bg-white">

      {/* HERO */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">
              Get in Touch
            </h1>

            <div className="w-20 h-1 bg-[#F36E20] mx-auto rounded-full mb-6"></div>

            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              We’re here to help you plan your perfect stay in Tirthan Valley.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">

        <div className="grid lg:grid-cols-2 gap-20">

          {/* LEFT INFO */}
          <div>
            <h2 className="font-serif text-4xl text-stone-900 mb-6">
              Visit Tirthajal Cottage
            </h2>

            <div className="w-16 h-1 bg-[#F36E20] rounded-full mb-10"></div>

            <p className="text-stone-600 text-lg mb-12">
              Whether youre planning a weekend retreat, a group getaway,
              or a peaceful workcation — we’d love to host you.
            </p>

            <div className="space-y-10">

              <InfoItem icon={<MapPin className="w-5 h-5 text-white" />} title="Location">
                Village Gushaini, Tirthan Valley<br />
                Himachal Pradesh, India – 175123
              </InfoItem>

              <InfoItem icon={<Phone className="w-5 h-5 text-white" />} title="Phone">
                +91 98765 43210<br />
                +91 98765 43211
              </InfoItem>

              <InfoItem icon={<Mail className="w-5 h-5 text-white" />} title="Email">
                info@tirthajalcottage.com<br />
                bookings@tirthajalcottage.com
              </InfoItem>

            </div>
          </div>

          {/* RIGHT FORM (Desktop Only) */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-3xl p-12 
            shadow-[0_15px_40px_rgba(0,0,0,0.08)] 
            border border-stone-200">

              <h2 className="font-serif text-3xl text-stone-900 mb-8">
                Send us a Message
              </h2>

              <ContactForm
                loading={loading}
                formStart={formStart}
                handleSubmit={handleSubmit}
              />

            </div>
          </div>

        </div>

        {/* FAQ */}
        <div className="mt-28 max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-stone-900 mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl transition 
                ${openFaq === idx
                  ? 'border-[#F36E20] shadow-md'
                  : 'border-stone-200'
                }`}
              >
                <button
                  type="button"
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-medium text-lg text-stone-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-[#F36E20]' : ''
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-8 pb-8 text-stone-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MOBILE FLOATING BUTTON */}
      <button
        onClick={() => setShowFormModal(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 
        bg-[#F36E20] text-white px-8 py-4 rounded-full shadow-2xl 
        hover:bg-[#D65E1A] transition font-medium"
      >
        Enquire Now
      </button>

      {/* MOBILE MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 text-stone-600 hover:text-[#F36E20]"
            >
              ✕
            </button>

            <h2 className="font-serif text-2xl text-stone-900 mb-6">
              Send us a Message
            </h2>

            <ContactForm
              loading={loading}
              formStart={formStart}
              handleSubmit={handleSubmit}
            />

          </div>
        </div>
      )}

    </section>
  )
}

/* ---------------- CONTACT FORM COMPONENT ---------------- */

function ContactForm({
  loading,
  formStart,
  handleSubmit,
}: {
  loading: boolean
  formStart: number
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#F36E20] focus:border-[#F36E20] transition"

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="formStart" value={formStart} />
      <input type="text" name="company" className="hidden" />

      <div className="grid md:grid-cols-2 gap-6">
        <input name="firstName" required placeholder="First Name" className={inputStyle} />
        <input name="lastName" required placeholder="Last Name" className={inputStyle} />
      </div>

      <input name="email" type="email" required placeholder="Email" className={inputStyle} />

      <textarea
        name="message"
        rows={4}
        required
        placeholder="Tell us about your plans..."
        className={`${inputStyle} resize-none`}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#F36E20] text-white py-4 rounded-xl
        hover:bg-[#D65E1A] transition font-medium disabled:opacity-60"
      >
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

/* ---------------- INFO ITEM ---------------- */

function InfoItem({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 bg-[#F36E20] rounded-full flex items-center justify-center shadow-md">
        {icon}
      </div>

      <div>
        <h3 className="font-serif text-xl text-stone-900 mb-1">
          {title}
        </h3>
        <p className="text-stone-600 leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  )
}
