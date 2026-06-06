import React from 'react'
import { FadeIn } from './ui/FadeIn'
export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Ali didn't just list our home; he rebranded it. The marketing materials looked like they belonged in Architectural Digest. We sold for 15% over asking within a week.",
      name: 'Sarah & James Thornton',
      role: 'Sellers, Beverly Hills',
      metric: 'Sold 15% Over Asking',
    },
    {
      quote:
        'His eye for design completely changed how buyers saw our property. He suggested minor aesthetic tweaks that yielded massive returns. A true professional.',
      name: 'Marcus Chen',
      role: 'Property Developer',
      metric: 'Record Neighborhood Price',
    },
  ]
  return (
    <section className="py-32 bg-dark border-t border-gold/10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-16 text-center flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-gold"></span>
            Client Success
            <span className="w-8 h-px bg-gold"></span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {testimonials.map((test, index) => (
            <FadeIn key={index} delay={0.2 * index} className="relative">
              <div className="absolute -top-10 -left-6 text-8xl font-serif text-gold/10 select-none">
                "
              </div>

              <p className="font-serif text-2xl md:text-3xl text-ivory leading-snug mb-8 relative z-10">
                {test.quote}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gold/20">
                <div>
                  <p className="font-sans font-semibold text-sm text-ivory uppercase tracking-wider">
                    {test.name}
                  </p>
                  <p className="font-sans text-xs text-gold/70 uppercase tracking-widest mt-1">
                    {test.role}
                  </p>
                </div>
                <div className="bg-gold/10 border border-gold/30 text-gold text-xs font-sans uppercase tracking-widest px-4 py-2 self-start sm:self-auto rounded-sm">
                  {test.metric}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
