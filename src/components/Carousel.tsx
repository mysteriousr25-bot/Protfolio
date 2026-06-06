import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import PropertyCard from './PropertyCard'
import './ui/carousel.css'

interface Property {
  id: number
  images: string[]
  title: string
  location: string
  price: string
  specs: string
}

interface CarouselHandle {
  next: () => void
  prev: () => void
}

export const Carousel = forwardRef(function Carousel(
  { items }: { items: Property[] },
  ref: React.Ref<CarouselHandle | null>
) {
  const [visibleCount, setVisibleCount] = useState(3)
  // slides constructed from visibleCount for cloning
  const clonesHead = items.slice(-visibleCount)
  const clonesTail = items.slice(0, visibleCount)
  const slides = [...clonesHead, ...items, ...clonesTail]

  const [index, setIndex] = useState(visibleCount) // start at first real slide
  const [isAnimating, setIsAnimating] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const slideSizeRef = useRef<number>(0)

  useImperativeHandle(ref, () => ({
    next: () => slideTo(index + 1),
    prev: () => slideTo(index - 1),
  }))

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') slideTo(index + 1)
      if (e.key === 'ArrowLeft') slideTo(index - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [index])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const handleTransitionEnd = () => {
      setIsAnimating(false)
      const total = slides.length
      if (index >= total - visibleCount) {
        // jumped to tail clones -> reset to real first
        const resetIndex = visibleCount
        setIndex(resetIndex)
        // snap without animation
        track.style.transition = 'none'
        track.style.transform = `translateX(-${resetIndex * slideSizeRef.current}px)`
        void track.offsetHeight
        track.style.transition = ''
      }
      if (index < visibleCount) {
        // jumped to head clones -> reset to real last
        const realLast = slides.length - visibleCount * 2
        setIndex(realLast)
        track.style.transition = 'none'
        track.style.transform = `translateX(-${realLast * slideSizeRef.current}px)`
        void track.offsetHeight
        track.style.transition = ''
      }
    }
    track.addEventListener('transitionend', handleTransitionEnd)
    return () => track.removeEventListener('transitionend', handleTransitionEnd)
  }, [index, slides.length])

  const slideTo = (nextIndex: number) => {
    if (isAnimating) return
    const track = trackRef.current
    if (!track || slideSizeRef.current === 0) return
    setIsAnimating(true)
    const translatePx = nextIndex * slideSizeRef.current
    track.style.transform = `translateX(-${translatePx}px)`
    setIndex(nextIndex)
  }

  // touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const threshold = 50
    if (dx < -threshold) slideTo(index + 1)
    else if (dx > threshold) slideTo(index - 1)
    touchStartX.current = null
  }

  // initialize transform
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const recompute = () => {
      const first = track.querySelector('.carousel-slide') as HTMLElement | null
      const style = getComputedStyle(track)
      const gap = parseFloat(style.gap || '0') || 0
      const container = track.parentElement as HTMLElement | null
      const visibleWidth = container ? container.clientWidth : track.clientWidth
      // compute visibleCount based on breakpoints
      const computeVisible = (w: number) => {
        if (w >= 1024) return 3
        if (w >= 768) return 2
        return 1
      }
      const newVisible = computeVisible(visibleWidth)
      if (newVisible !== visibleCount) {
        setVisibleCount(newVisible)
        setIndex(newVisible)
      }
      const slideWidth = (visibleWidth - gap * (newVisible - 1)) / newVisible
      slideSizeRef.current = slideWidth + gap
      track.style.setProperty('--carousel-gap', `${gap}px`)
      track.style.setProperty('--carousel-slide-width', `${slideWidth}px`)
      track.style.transform = `translateX(-${index * slideSizeRef.current}px)`
    }
    recompute()
    window.addEventListener('resize', recompute)
    return () => window.removeEventListener('resize', recompute)
  }, [])

  return (
    <div className="relative">
      <div className="overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Featured properties carousel">
        <div
          className="carousel-track flex gap-4 md:gap-6 lg:gap-8 transition-transform duration-700 ease-in-out"
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="list"
          aria-label="Featured properties carousel"
        >
          {slides.map((prop, i) => (
            <div key={`${prop.id}-${i}`} className="carousel-slide flex-shrink-0 w-full md:w-1/3" role="listitem">
              <PropertyCard prop={prop} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
        <button
          aria-label="Previous"
          className="bg-dark/60 text-ivory p-2 rounded-md hover:bg-dark/80"
          onClick={() => slideTo(index - 1)}
        >
          ‹
        </button>
        <button
          aria-label="Next"
          className="bg-dark/60 text-ivory p-2 rounded-md hover:bg-dark/80"
          onClick={() => slideTo(index + 1)}
        >
          ›
        </button>
      </div>
    </div>
  )
})

export default Carousel
