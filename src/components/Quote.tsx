import React from 'react'
import { FadeIn } from './ui/FadeIn'
import { Parallax } from './ui/Parallax'
export function Quote() {
  return (
    <section className="py-40 bg-royalDark relative overflow-hidden flex items-center justify-center">
      {/* Background subtle accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-royal to-royalDark opacity-50"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gold"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gold"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-ivory leading-tight drop-shadow-lg">
            "Great design captures attention. <br className="hidden md:block" />
            <span className="text-gold italic">
              Great real estate creates opportunity.
            </span>{' '}
            <br className="hidden md:block" />I believe in delivering both."
          </h2>

          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="w-12 h-px bg-gold/50"></div>
            <span className="text-gold font-sans tracking-[0.3em] text-xs uppercase font-semibold">
              Ali Khalik
            </span>
            <div className="w-12 h-px bg-gold/50"></div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
