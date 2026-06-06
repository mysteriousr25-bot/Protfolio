import React from 'react'
import { FadeIn } from './ui/FadeIn'
export function SignatureMethod() {
  const methods = [
    {
      num: '01',
      title: 'Visual Audit',
      desc: 'Every property has a story. I begin by identifying the unique architectural and lifestyle elements that will resonate most with premium buyers.',
    },
    {
      num: '02',
      title: 'Editorial Curation',
      desc: 'Applying graphic design principles to staging, photography, and videography to create a cohesive, magazine-quality visual narrative.',
    },
    {
      num: '03',
      title: 'Strategic Positioning',
      desc: 'Crafting bespoke marketing collateral—from custom property branding to targeted digital campaigns—that elevates perceived value.',
    },
    {
      num: '04',
      title: 'Market Execution',
      desc: 'Launching the property with precision, leveraging design-led marketing to capture attention, drive competition, and secure premium offers.',
    },
  ]
  return (
    <section className="py-32 bg-brown relative border-t border-gold/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <FadeIn>
            <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-gold"></span>
              Signature Method
              <span className="w-8 h-px bg-gold"></span>
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-ivory leading-tight">
              Design Thinking Applied to Property Marketing.
            </h3>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {methods.map((method, index) => (
            <FadeIn key={index} delay={0.1 * index} className="relative group">
              {/* Top Border Line */}
              <div className="w-full h-px bg-gold/20 mb-8 group-hover:bg-gold transition-colors duration-500 relative">
                <div className="absolute top-0 left-0 h-full w-0 bg-gold group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>

              <span className="text-gold font-serif text-5xl mb-6 block opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                {method.num}
              </span>

              <h4 className="text-xl font-serif text-ivory mb-4">
                {method.title}
              </h4>

              <p className="text-ivory/60 font-sans text-sm leading-relaxed">
                {method.desc}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
