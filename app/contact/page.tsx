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
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
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
      a: 'Yes, the Forest Cabin welcomes pets. We have a resident dog Leo who loves company.',
    },
    {
      q: 'Do you have WiFi?',
      a: 'Yes, but it is satellite-based and suitable for emails, not video calls. We encourage a digital detox.',
    },
  ]

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

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
        company: String(data.get('company') || ''), // honeypot
        formStart: Number(data.get('formStart') || 0),
      }),
    })

    setLoading(false)

    if (res.ok) {
  toast.success('Message sent! We’ll get back to you shortly 🌿')
  form.reset()
} else {
  toast.error('Failed to send message. Please try again.')
}

  }

  return (
    <section className="bg-white">

  {/* HERO BANNER */}
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
        <h2 className="font-serif text-4xl text-stone-900 mb-8">
          Visit Tirthajal Cottage
        </h2>

        <p className="text-stone-600 text-lg mb-12">
          Whether youre planning a weekend retreat, a group getaway,
          or a peaceful workcation — we’d love to host you.
        </p>

        <div className="space-y-10">

          <InfoItem icon={<MapPin className="w-5 h-5" />} title="Location">
            Village Gushaini, Tirthan Valley<br />
            Himachal Pradesh, India – 175123
          </InfoItem>

          <InfoItem icon={<Phone className="w-5 h-5" />} title="Phone">
            +91 98765 43210<br />
            +91 98765 43211
          </InfoItem>

          <InfoItem icon={<Mail className="w-5 h-5" />} title="Email">
            info@tirthajalcottage.com<br />
            bookings@tirthajalcottage.com
          </InfoItem>

        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="relative hidden lg:block">

        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-50 rounded-3xl" />

        <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-xl border border-stone-200">
          <h2 className="font-serif text-3xl text-stone-900 mb-8">
            Send us a Message
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
  <input type="hidden" name="formStart" value={formStart} />

  {/* Honeypot */}
  <input
    type="text"
    name="company"
    className="hidden"
    tabIndex={-1}
    autoComplete="off"
  />

  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-2">
        First Name
      </label>
      <input
        name="firstName"
        required
        placeholder="John"
        className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 transition"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-stone-700 mb-2">
        Last Name
      </label>
      <input
        name="lastName"
        required
        placeholder="Doe"
        className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 transition"
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium text-stone-700 mb-2">
      Email
    </label>
    <input
      name="email"
      required
      placeholder="john.doe@example.com"
      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 transition"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-stone-700 mb-2">
      Message
    </label>
    <textarea
      name="message"
      rows={4}
      required
      placeholder="Tell us about your plans..."
      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 transition resize-none"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-stone-900 text-white py-4 rounded-xl hover:bg-stone-800 transition font-medium disabled:opacity-60"
  >
    {loading ? 'Sending…' : 'Send Message'}
  </button>
</form>

        </div>
      </div>
    </div>

    {/* MAP */}
    <div className="mt-24 rounded-3xl overflow-hidden shadow-xl border border-stone-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.1447300226337!2d77.35649827589629!3d31.64655604089622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905adb614170d7d%3A0x66144aceb505330b!2sTirthajal%20Kuteer!5e1!3m2!1sen!2sin!4v1770536398460!5m2!1sen!2sin"
        className="w-full h-[400px] border-0"
        loading="lazy"
      />
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
            className="border border-stone-200 rounded-2xl bg-white shadow-sm"
          >
            <button
              type="button"
              className="w-full px-8 py-6 flex justify-between items-center text-left text-stone-800"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <span className="font-medium text-lg">{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === idx ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openFaq === idx && (
              <div className="px-8 pb-8 text-stone-600 text-base leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  </div>
  {/* Mobile Floating Button */}
<button
  onClick={() => setShowFormModal(true)}
  className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900 text-white px-8 py-4 rounded-full shadow-2xl hover:bg-stone-800 transition font-medium"
>
  Enquire Now
</button>

{/* Mobile Form Modal */}
{showFormModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

      <button
        onClick={() => setShowFormModal(false)}
        className="absolute top-4 right-4 text-stone-600 hover:text-stone-900"
      >
        ✕
      </button>

      <h2 className="font-serif text-2xl text-stone-900 mb-6">
        Send us a Message
      </h2>

      {/* Reuse Same Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="formStart" value={formStart} />
        <input type="text" name="company" className="hidden" />

        <div className="grid gap-6">
          <input
            name="firstName"
            required
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-xl border border-stone-300"
          />
          <input
            name="lastName"
            required
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-xl border border-stone-300"
          />
          <input
            name="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-stone-300"
          />
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Tell us about your plans..."
            className="w-full px-4 py-3 rounded-xl border border-stone-300 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-900 text-white py-4 rounded-xl hover:bg-stone-800 transition font-medium mt-6"
        >
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  </div>
)}

</section>

  )
}

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
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-stone-700">
        {icon}
      </div>

      <div>
        <h3 className="font-serif text-xl font-medium text-stone-900 mb-1">
          {title}
        </h3>
        <p className="text-stone-600 leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  )
}

