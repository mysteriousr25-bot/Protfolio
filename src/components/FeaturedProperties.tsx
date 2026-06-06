import React, { useRef } from 'react'
import { FadeIn } from './ui/FadeIn'
import { ArrowRight } from 'lucide-react'
import Carousel from './Carousel'

export function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      images: [
        '/images/one.jpeg',
        '/images/one3.jpeg',
        '/images/one4.jpeg',
        '/images/one2.jpeg',
      ],
      title: 'E50 OPEN HOUSE',
      location: 'MAPLE 1',
      price: 'AED 6,175,000',
      specs: '5 Bed • 5 Bath • 2,980 Sq Ft',
    },
    {
      id: 2,
      images: [
        '/images/two.jpeg',
        '/images/two2.jpeg',
        '/images/two3.jpeg',
        '/images/two4.jpeg',
      ],
      title: 'PANORAMIC PARK',
      location: 'LIME GARDENS',
      price: 'AED 4,000,000',
      specs: '3 Bed • 3 Bath • 1,400 Sq Ft',
    },
    {
      id: 3,
      images: [
        '/images/three.jpeg',
        '/images/three2.jpeg',
        '/images/three3.jpeg',
        '/images/three4.jpeg',
        '/images/three5.jpeg',
      ],
      title: 'CLUB VILLA',
      location: 'GOLF VIEWS',
      price: 'AED 11,950,000',
      specs: '4 Bed • 4 Bath • 3,359 Sq Ft',
    },
    {
      id: 4,
      images: [
        '/images/four.jpeg',
        '/images/four2.jpeg',
        '/images/four3.jpeg',
        '/images/four4.jpeg',
         ],
      title: 'BURJ KHALIFA VIEW',
      location: 'AL QUOZ4, AL QUOZ',
      price: 'AED 15,000,000',
      specs: '7 Bed • 8 Bath • 10,000 Sq Ft',
    },
    {
      id: 5,
      images: [
        '/images/five.jpeg',
        '/images/five2.jpeg',
        '/images/five3.jpeg',
        '/images/five4.jpeg',
      ],
      title: 'PINEWOOD VILLAGE',
      location: 'JUMEIRAH GOLF ESTATES',
      price: 'AED 8,875,777',
      specs: '4 Bed • 5 Bath • 4,866 Sq Ft',
    },
    {
      id: 6,
      images: [
        '/images/six.jpeg',
         '/images/six2.jpeg',
         '/images/six3.jpeg',
         '/images/six4.jpeg',
        
        ],
      title: 'CALIDA',
      location: 'VICTORIA HEIGHTS',
      price: 'AED 17,995,000',
      specs: '5 Bed • 6 Bath • 6,067 Sq Ft',
    },
  ]
  const carouselRef = useRef<any>(null)

  const handleViewAll = () => {
    // trigger next on carousel
    if (carouselRef.current && carouselRef.current.next) carouselRef.current.next()
  }

  return (
    <section id="properties" className="py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <FadeIn>
            <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-gold"></span>
              Featured Properties
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-ivory">
              Proof of Expertise.
            </h3>
          </FadeIn>

          <FadeIn delay={0.2}>
            <button
              type="button"
              onClick={handleViewAll}
              className="group flex items-center gap-3 text-sm font-sans tracking-widest uppercase text-gold hover:text-ivory transition-colors"
            >
              View All Listings
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </FadeIn>
        </div>

        <Carousel ref={carouselRef} items={properties} />
      </div>
    </section>
  )
}
