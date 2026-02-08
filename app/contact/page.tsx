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
    <section className="pt-32 pb-24 px-6 md:px-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <span className="text-xs tracking-widest uppercase text-stone-500 block mb-4">
              Contact
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font- text-gray-400 mb-6">
              Get in Touch
            </h1>
            <p className="text-stone-600 text-lg mb-10">
              Have questions about your stay? We’d love to hear from you.
            </p>

            <div className="space-y-8">
              <InfoItem icon={<MapPin className="w-5 h-5 text-stone-700" />} title="Location">
                Village Gushaini, Tirthan Valley<br />
                Himachal Pradesh, India 175123
              </InfoItem>

              <InfoItem icon={<Phone className="w-5 h-5 text-stone-700" />} title="Phone">
                +91 98765 43210<br />
                +91 98765 43211
              </InfoItem>

              <InfoItem icon={<Mail className="w-5 h-5 text-stone-700" />} title="Email">
                info@tirthancottage.com<br />
                bookings@tirthancottage.com
              </InfoItem>
            </div>

            {/* MAP */}
           
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="font-serif text-3xl mb-6 text-gray-400">Send us a message</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
               <input type="hidden" name="formStart" value={formStart} />
              {/* Honeypot */}
              <input
                type="text"
                name="company"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                    <label className="block text-sm text-stone-600 mb-2">
                        First Name
                    </label>
                    <input
                        name="firstName"
                        required
                        className="input"
                        placeholder="John"
                    />
                    </div>

                    <div className="relative">
  <label className="block text-sm text-stone-600 mb-2">
    Last Name
  </label>
  <input
    name="lastName"
    required
    className="input"
    placeholder="Doe"
  />
</div>

</div>

             <div className="relative">
    <label className="block text-sm text-stone-600 mb-2">
        Email
    </label>
  <input
    name="email"
    required
    className="input"
    placeholder="john.doe@example.com"
  />
</div>
<div className='relative'>
<label className="block text-sm text-stone-600 mb-2">
    Message
  </label>
                <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your plans..."
                    className="input resize-none"
                />
</div>

              <button
  type="submit"
  disabled={loading}
  className="btn-primary"
>
  {loading ? 'Sending…' : 'Send Message'}
</button>


              {status === 'success' && (
                <p className="text-green-600 text-center animate-fadeIn">
                  ✅ Message sent! We’ll get back to you shortly.
                </p>
              )}

              {status === 'error' && (
                <p className="text-red-600 text-center animate-fadeIn">
                  ❌ Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

         <div className="mt-12 h-[300px] md:h-[400px] rounded-2xl relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.1447300226337!2d77.35649827589629!3d31.64655604089622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905adb614170d7d%3A0x66144aceb505330b!2sTirthajal%20Kuteer!5e1!3m2!1sen!2sin!4v1770536398460!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center text-stone-700">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden">
                <button
                  type="button"
                  className="w-full p-6 flex justify-between items-center text-left text-stone-600"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-6 text-stone-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
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

