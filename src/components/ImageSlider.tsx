import React, { useEffect, useRef, useState } from 'react'

interface ImageSliderProps {
  images: string[]
  interval?: number
}

export function ImageSlider({ images, interval = 3000 }: ImageSliderProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (isPaused) return
    timeoutRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [index, isPaused, images.length, interval])

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-0" style={{ paddingBottom: '56.25%' }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}
      </div>

      {/* arrows */}
      <button
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-dark/60 text-ivory p-1 sm:p-2 rounded-md hover:bg-dark/80"
        onClick={prev}
      >
        ‹
      </button>
      <button
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-dark/60 text-ivory p-1 sm:p-2 rounded-md hover:bg-dark/80"
        onClick={next}
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to image ${i + 1}`}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-gold' : 'bg-ivory/40'}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
