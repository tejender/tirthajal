'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type LightboxGalleryProps = {
  images: string[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export default function LightboxGallery({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const SWIPE_THRESHOLD = 60

  const next = () =>
    setCurrentIndex((i) => (i + 1) % images.length)

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + images.length) % images.length)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current

    if (distance > SWIPE_THRESHOLD) next()
    if (distance < -SWIPE_THRESHOLD) prev()

    touchStartX.current = null
    touchEndX.current = null
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/10"
        onClick={onClose}
      >
        <X className="w-7 h-7" />
      </button>

      {/* Left */}
      <button
        className="hidden md:flex absolute left-4 md:left-10 text-white p-3 rounded-full hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
      >
        <ChevronLeft className="w-9 h-9" />
      </button>

      {/* Right */}
      <button
        className="hidden md:flex absolute right-4 md:right-10 text-white p-3 rounded-full hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
      >
        <ChevronRight className="w-9 h-9" />
      </button>

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="Gallery image"
        className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg select-none"
        draggable={false}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
