import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TheDifference } from './components/TheDifference'
import { USP } from './components/USP'
import { SignatureMethod } from './components/SignatureMethod'
import { About } from './components/About'
import { WhyWorkWithMe } from './components/WhyWorkWithMe'
import { FeaturedProperties } from './components/FeaturedProperties'
import { CreativePortfolio } from './components/CreativePortfolio'
import { Testimonials } from './components/Testimonials'
import { Quote } from './components/Quote'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
export function App() {
  return (
    <div className="min-h-screen bg-dark font-sans text-ivory selection:bg-gold selection:text-dark">
      <Navbar />

      <main>
        <Hero />
        <TheDifference />
        <USP />
        <SignatureMethod />
        <About />
        <WhyWorkWithMe />
        <FeaturedProperties />
        <CreativePortfolio />
        <Testimonials />
        <Quote />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
