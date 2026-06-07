import React from 'react'
import { FadeIn } from './ui/FadeIn'
import { TiltCard } from './ui/TiltCard'
export function CreativePortfolio() {
  const works = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Brand Identity',
      title: 'The Oakhaven Estate',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Editorial Design',
      title: 'Property Lookbook 2023',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Digital Campaign',
      title: 'Skyline Penthouses',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Marketing Collateral',
      title: 'Luxury Market Report',
    },
  ]
  return (
    <section
      id="portfolio"
      className="py-32 bg-espresso text-ivory border-t border-gold/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <FadeIn>
            <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-gold"></span>
              Creative Portfolio
              <span className="w-8 h-px bg-gold"></span>
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif leading-tight mb-6 text-ivory">
              The Foundation of Visual Skills.
            </h3>
            <p className="text-ivory/60 font-sans text-sm leading-relaxed">
              A selection of design work that informs my approach to real estate
              marketing. Clean typography, striking imagery, and cohesive
              branding.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {works.map((work, index) => (
            <FadeIn key={work.id} delay={0.1 * index}>
              <TiltCard>
                <div className="group relative overflow-hidden aspect-[4/3] cursor-pointer border border-gold/10 hover:border-gold/40 transition-colors duration-500 rounded-sm">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

                  <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold font-sans text-xs tracking-widest uppercase mb-2 font-semibold">
                      {work.category}
                    </p>
                    <h4 className="text-2xl font-serif text-ivory">
                      {work.title}
                    </h4>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
