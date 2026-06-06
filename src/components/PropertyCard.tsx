import React from 'react'
import { TiltCard } from './ui/TiltCard'
import ImageSlider from './ImageSlider'

interface Property {
  id: number
  images: string[]
  title: string
  location: string
  price: string
  specs: string
}

export function PropertyCard({ prop }: { prop: Property }) {
  return (
    <TiltCard>
      <div className="group cursor-pointer bg-espresso border border-gold/10 hover:border-gold/30 transition-shadow duration-500 rounded-lg shadow-2xl transform-gpu hover:-translate-y-1 hover:shadow-2xl">
        <div className="overflow-hidden rounded-t-lg">
          <ImageSlider images={prop.images} />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-xl sm:text-2xl font-serif text-ivory group-hover:text-gold transition-colors break-words">
              {prop.title}
            </h4>
            <span className="text-gold font-sans text-sm tracking-wider">{prop.price}</span>
          </div>

          <p className="text-ivory/60 font-sans text-sm mb-1">{prop.location}</p>
          <p className="text-gold/50 font-sans text-xs tracking-widest uppercase">{prop.specs}</p>
        </div>
      </div>
    </TiltCard>
  )
}

export default PropertyCard
