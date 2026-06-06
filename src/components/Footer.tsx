import React from 'react'
export function Footer() {
  return (
    <footer className="bg-espresso text-ivory py-12 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gold flex items-center justify-center rounded-sm">
            <span className="text-dark font-serif font-bold text-lg tracking-tighter">
              AK
            </span>
          </div>
          <span className="font-serif text-xl tracking-wider text-ivory">
            ALI KHALIK
          </span>
        </div>

        <div className="flex gap-8">
          <a
            href="https://www.instagram.com/mr_alikhalik?igsh=MWwybDN3N3pkbHRtcQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors"
          >
            Instagram
          </a>
          <a
            href="#"
            className="font-sans text-xs tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="font-sans text-xs tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors"
          >
            Twitter
          </a>
        </div>

        <div className="font-sans text-xs tracking-widest uppercase text-ivory/30">
          &copy; {new Date().getFullYear()} Ali Khalik. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
