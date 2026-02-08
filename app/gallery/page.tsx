'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '@/lib/data'

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-medium tracking-widest text-stone-500 uppercase mb-4 block">Gallery</span>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-stone-900 mb-6">Visual Stories</h1>
        </div>

        <div className="columns-1 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="break-inside-avoid cursor-pointer" onClick={() => openLightbox(idx)}>
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full rounded-lg hover:opacity-90 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <ChevronRight className="w-8 h-8" />
          </button>
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full" onClick={closeLightbox}>
            <span className="text-2xl">×</span>
          </button>
          <img src={galleryImages[currentIndex]} alt="Gallery" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}