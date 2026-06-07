import React from 'react'
import { FadeIn } from './ui/FadeIn'
import { TiltCard } from './ui/TiltCard'
import { Parallax } from './ui/Parallax'
export function WhyWorkWithMe() {
  const points = [
    {
      title: 'I see what others miss',
      desc: 'My design background allows me to identify hidden potential in a property, highlighting architectural nuances that command premium value.',
      image:
        '/images/bio.jpeg',
    },
    {
      title: 'I market like a brand, not a listing',
      desc: 'Every property has a story. I craft bespoke visual narratives, ensuring your home stands out in a crowded market with editorial-quality presentation.',
      image:
        '/images/bio2.jpeg',
    },
    {
      title: 'I negotiate with clarity and conviction',
      desc: 'Presentation builds perceived value, but strategic negotiation secures it. I advocate for your interests with unwavering professionalism.',
      image:
        '/images/bio3.jpeg',
    },
    {
      title: 'I treat your home like my portfolio',
      desc: "I don't compromise on quality. From the first consultation to the final closing, my attention to detail ensures a seamless, high-end experience.",
      image:
        '/images/bio4.jpeg',
    },
  ]
  return (
    <section
      id="why"
      className="py-32 bg-royalDark text-ivory relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-royal via-royalDark to-dark opacity-80"></div>
      <Parallax
        offset={60}
        className="hidden lg:block absolute -left-20 top-20 font-serif text-gold/[0.03] select-none pointer-events-none text-[10rem] lg:text-[20rem]"
      >
        01
      </Parallax>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-gold"></span>
              Why Work With Me
              <span className="w-8 h-px bg-gold"></span>
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif leading-tight text-ivory drop-shadow-lg">
              A Unique Perspective on Real Estate.
            </h3>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {points.map((point, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <TiltCard className="h-full">
                <div className="group relative h-full bg-dark/40 border border-gold/10 p-8 overflow-hidden backdrop-blur-sm hover:border-gold/30 transition-colors duration-500">
                  {/* Background Image on Hover */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-80 transition-opacity duration-700">
                    <img
                      src={point.image}
                      alt={point.title}
                      className="w-full h-full object-cover brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                  </div>

                  <div className="relative z-10">
                    <span className="text-gold font-serif text-4xl mb-6 block opacity-50 font-light">
                      0{index + 1}
                    </span>
                    <h4 className="text-2xl font-serif text-ivory mb-4 group-hover:text-gold transition-colors duration-300">
                      "{point.title}"
                    </h4>
                    <p className="text-ivory/70 font-sans text-sm leading-relaxed">
                      {point.desc}
                    </p>
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
