import React from 'react'
import { FadeIn } from './ui/FadeIn'
import { Parallax } from './ui/Parallax'
export function USP() {
  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-dark">
      {/* Left: Graphic Design Background */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen relative">
        <img
          src="/images/ali3.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right: Real Estate Expertise */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen relative group">
        <div className="absolute inset-0 bg-royalDark/80 z-10 transition-opacity duration-700 group-hover:bg-royalDark/60"></div>
        <img
          src="/images/pic.jpeg"
          alt="Application"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12">
          <FadeIn>
            <span className="text-gold/70 font-sans tracking-[0.3em] text-xs uppercase">
              02. The Application
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h3 className="text-3xl md:text-5xl font-serif text-ivory mb-4">
              Real
              <br />
              Estate
            </h3>
            <p className="text-ivory/60 font-sans max-w-full">
              Market authority, negotiation, and strategic property positioning.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Center Overlay Statement */}
      {/* Large-screen parallax overlay */}
      <Parallax
        offset={30}
        className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[90%] max-w-3xl"
      >
        <div className="bg-dark/95 backdrop-blur-md p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold/30 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <FadeIn delay={0.4}>
            <p className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-6">
              Where Design Meets Real Estate
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-ivory leading-snug">
              "I don't just sell properties. I know how to present them,
              position them, and make them unforgettable."
            </h2>
          </FadeIn>
        </div>
      </Parallax>

      {/* Mobile-friendly centered card (non-absolute) */}
      <div className="lg:hidden w-full flex justify-center px-4 -mt-12 z-20">
        <div className="bg-dark/95 backdrop-blur-md p-6 sm:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.45)] border border-gold/30 text-center w-full max-w-xl">
          <div className="w-full h-1 mb-4 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <p className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-3">Where Design Meets Real Estate</p>
          <h2 className="text-base sm:text-lg font-serif text-ivory leading-snug">"I don't just sell properties. I know how to present them, position them, and make them unforgettable."</h2>
        </div>
      </div>
    </section>
  )
}
