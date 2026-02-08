'use client'

import { useState } from 'react'
import LightboxGallery from '@/components/layout/LightboxGallery'
import { galleryImages } from '@/lib/data'

export default function GalleryPage() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-medium tracking-widest text-stone-500 uppercase block">
            Gallery
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-stone-900">
            Visual Stories
          </h1>
        </div>

        <div className="columns-1 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="w-full rounded-lg cursor-pointer hover:opacity-90 transition"
              onClick={() => {
                setIndex(i)
                setOpen(true)
              }}
            />
          ))}
        </div>
      </div>

      <LightboxGallery
        images={galleryImages}
        initialIndex={index}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}
