import React from 'react'
import { FadeIn } from './ui/FadeIn'
export function TheDifference() {
  return (
    <section
      id="expertise"
      className="py-32 bg-dark text-ivory relative border-t border-gold/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brown/20 to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-gold"></span>
                The Difference
              </h2>
              <h3 className="text-4xl md:text-6xl font-serif leading-tight mb-8 text-ivory">
                Why a Designer Became a Real Estate Professional.
              </h3>
            </FadeIn>
          </div>

          <div>
            <FadeIn delay={0.2}>
              <div className="space-y-6 text-ivory/70 font-sans text-lg leading-relaxed">
                <p>
                  Most real estate agents see a property as a transaction. As a
                  former graphic designer, I see it as a canvas.
                </p>
                <p>
                  I spent years mastering visual communication, branding, and
                  the psychology of presentation. I learned that how something
                  is presented directly dictates its perceived value.
                </p>
                <p>
                  When I transitioned into real estate, I realized the industry
                  was lacking this fundamental truth. Properties were being
                  marketed with generic photos and uninspired copy. I knew I
                  could do better. I apply high-end editorial design principles
                  to every listing, ensuring your property doesn't just enter
                  the market—it commands it.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-gold/20">
                <p className="font-serif text-2xl italic text-gold">
                  "Design is not just what it looks like. Design is how it works
                  in the market."
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
