import React from 'react'
import { FadeIn } from './ui/FadeIn'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { Parallax } from './ui/Parallax'
import { TiltCard } from './ui/TiltCard'
export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-dark">
      {/* Background subtle accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-espresso to-transparent hidden lg:block opacity-50"></div>

      {/* Large background monogram */}
      <Parallax
        offset={100}
        className="hidden md:block absolute top-1/4 -left-20 font-serif text-gold/[0.03] select-none pointer-events-none leading-none z-0 text-[12rem] md:text-[20rem] lg:text-[30rem]"
      >
        AK
      </Parallax>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Text Content */}
        <div className="lg:col-span-7 order-2 lg:order-1 pt-8 lg:pt-0">
          <FadeIn delay={0.1}>
            <p className="text-gold font-sans tracking-[0.3em] text-xs md:text-sm uppercase mb-6 font-semibold flex items-center gap-4">
              <span className="w-8 h-px bg-gold"></span>
              Former Graphic Designer
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-serif text-ivory leading-tight mb-6 drop-shadow-lg">
              ALI
              <br />
              <span className="text-gold">KHALIK</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="text-lg sm:text-xl md:text-3xl font-serif text-ivory/80 mb-8 max-w-xl">
              Luxury Real Estate Specialist
            </h2>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-sm sm:text-base md:text-lg text-ivory/60 font-sans max-w-md mb-10 leading-relaxed">
              Elevating property marketing through the lens of a designer. I
              don't just list homes; I craft compelling visual narratives that
              command premium value.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="#contact"
                className="px-8 py-4 bg-gold text-dark font-sans tracking-widest uppercase text-sm font-semibold hover:bg-ivory transition-colors duration-300 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                Work With Me
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 border border-gold/50 text-gold font-sans tracking-widest uppercase text-sm hover:bg-gold/10 transition-colors duration-300 text-center"
              >
                View Portfolio
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Portrait Area */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative perspective-1000">
          <FadeIn delay={0.3} direction="left">
            <TiltCard>
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-auto group">
                {/* Decorative frame */}
                <div className="absolute -inset-4 border border-gold/30 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 z-20"></div>

                <a href="/images/ali.jpeg" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img
                    src="/images/ali.jpeg"
                    alt="Ali Khalik - Luxury Real Estate Specialist"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1'
                        t.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                      }
                    }}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 relative z-0 shadow-2xl"
                  />
                </a>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-espresso p-6 shadow-2xl z-30 border border-gold/20 hidden md:block transform translate-z-10">
                  <p className="font-serif text-4xl text-gold mb-1">
                    <AnimatedCounter end={150} prefix="+" />
                  </p>
                  <p className="font-sans text-xs tracking-widest uppercase text-ivory/60">
                    Properties Sold
                  </p>
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="w-full mt-24 border-y border-gold/10 bg-espresso/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-gold/10">
            {[
              {
                value: 150,
                suffix: '+',
                label: 'Properties Sold',
              },
              {
                value: 12,
                suffix: '',
                label: 'Years Experience',
              },
              {
                value: 98,
                suffix: '%',
                label: 'Client Satisfaction',
              },
              {
                value: 500,
                suffix: '+',
                label: 'Design Projects',
              },
            ].map((stat, index) => (
              <FadeIn
                key={index}
                delay={0.6 + index * 0.1}
                className="text-center px-4"
              >
                <p className="text-4xl md:text-5xl font-serif text-gold mb-2 drop-shadow-md">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-sans tracking-widest uppercase text-ivory/50">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
