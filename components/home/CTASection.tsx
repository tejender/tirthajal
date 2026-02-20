import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-stone-900 text-stone-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight">Begin Your Mountain Solitude</h2>
        <p className="text-stone-300 text-lg mb-12">Limited to 6 guests at a time to preserve the tranquility.</p>
        <Link href="/rooms" className="inline-block px-8 py-4 bg-white text-stone-900 rounded-full font-medium hover:bg-stone-200 transition-colors">
          Check Availability
        </Link>
      </div>

      
    </section>
  )
}