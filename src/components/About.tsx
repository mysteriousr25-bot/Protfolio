import React from 'react'
import { FadeIn } from './ui/FadeIn'
import { Parallax } from './ui/Parallax'
export function About() {
  return (
    <section
      id="about"
      className="py-32 bg-espresso text-ivory relative overflow-hidden"
    >
      {/* Subtle background monogram */}
      <Parallax
        offset={80}
        className="hidden lg:block absolute -right-40 top-1/2 -translate-y-1/2 font-serif text-gold/[0.02] select-none pointer-events-none leading-none text-[20rem] lg:text-[40rem]"
      >
        AK
      </Parallax>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <div className="aspect-[4/5] w-full relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 to-transparent z-10"></div>
                <a href="/images/ali2.jpeg" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img
                    src="/images/ali2.jpeg"
                    alt="Ali Khalik working"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1'
                        t.src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                      }
                    }}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                  />
                </a>
                <div className="absolute inset-0 border border-gold/30 translate-x-4 translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <FadeIn>
              <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-gold"></span>
                Professional Bio
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-8 font-serif text-2xl md:text-3xl leading-snug text-ivory/90 mb-12">
                <p>
                  "With over a decade of experience blending creative vision and
                  market expertise, I bring a unique perspective to real estate.
                  My background in graphic design gives me an instinct for
                  space, aesthetics, and storytelling that most agents simply
                  don't have."
                </p>
                <p className="text-lg font-sans text-ivory/70 leading-relaxed max-w-2xl">
                  "I started my career crafting brand identities and visual
                  narratives. Today, I channel that same passion into helping
                  clients discover properties that truly feel like home — and
                  sellers showcase their spaces in the most compelling light."
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="pt-8 border-t border-gold/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-gold mb-2">
                    Personal Mission
                  </p>
                  <p className="font-serif text-lg text-ivory/80 italic">
                    "To elevate the standard of property presentation."
                  </p>
                </div>

                {/* Stylized Signature */}
                <div className="font-serif text-5xl text-gold/40 italic tracking-wider transform -rotate-2 drop-shadow-sm">
                  Ali Khalik
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
