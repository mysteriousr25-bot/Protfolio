import React, { useRef, useState } from 'react'
import { FadeIn } from './ui/FadeIn'

export function Contact() {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const inquiryRef = useRef<HTMLSelectElement | null>(null)
  const messageRef = useRef<HTMLTextAreaElement | null>(null)

  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<null | { type: 'success' | 'error'; message: string }>(null)

  const clearForm = () => {
    if (nameRef.current) nameRef.current.value = ''
    if (emailRef.current) emailRef.current.value = ''
    if (inquiryRef.current) inquiryRef.current.value = 'Buying a Property'
    if (messageRef.current) messageRef.current.value = ''
  }

  const validate = (name: string, email: string, inquiry: string, message: string) => {
    if (!name.trim()) return 'Name is required.'
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRe.test(email)) return 'Valid email is required.'
    if (!inquiry.trim()) return 'Inquiry type is required.'
    if (!message.trim()) return 'Message is required.'
    return null
  }

  const handleSend = async () => {
    const nameVal = nameRef.current?.value || ''
    const emailVal = emailRef.current?.value || ''
    const inquiryVal = inquiryRef.current?.value || ''
    const messageVal = messageRef.current?.value || ''

    const error = validate(nameVal, emailVal, inquiryVal, messageVal)
    if (error) {
      setNotification({ type: 'error', message: error })
      setTimeout(() => setNotification(null), 4000)
      return
    }

    setLoading(true)

    try {
      const serverUrl =
        import.meta.env.VITE_SERVER_URL || ''

      const endpoint = serverUrl
        ? `${serverUrl.replace(/\/$/, '')}/api/send`
        : '/.netlify/functions/send'

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          inquiry: inquiryVal,
          message: messageVal,
        }),
      })

      const json = await resp.json()

      if (!resp.ok) {
        throw new Error(json.error || 'Failed to send message')
      }

      setNotification({
        type: 'success',
        message: 'Message sent successfully!',
      })

      clearForm()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setNotification({ type: 'error', message: msg })
    } finally {
      setLoading(false)
      setTimeout(() => setNotification(null), 5000)
    }
  }

  return (
    <section id="contact" className="relative py-32 bg-dark border-t border-gold/20">
      <svg className="hidden">
        <filter id="sharpen">
          <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" />
        </filter>
      </svg>

      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'url(#sharpen) brightness(1.12) contrast(1.08)', transform: 'translateZ(0)' }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src="/contact-4k.mp4" type="video/mp4" />
        <source src="/contact.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          <div>
            <FadeIn>
              <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-gold" /> Work Together
              </h2>

              <h3 className="text-4xl md:text-6xl font-serif text-ivory mb-6">Let's work together</h3>

              <p className="text-base md:text-lg text-ivory font-sans max-w-md mb-10 leading-relaxed">
                I'm here to elevate your experience. Reach out for inquiries about listings, consultations,
                or collaborations — I reply to all messages promptly.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-gold/70 mb-2">Email</p>
                  <a href="mailto:alikhalik@gmail.com" className="font-serif text-2xl text-ivory hover:text-gold transition-colors">alikhalik@gmail.com</a>
                </div>

                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-gold/70 mb-2">Phone</p>
                  <a href="tel:+971585362622" className="font-serif text-2xl text-ivory hover:text-gold transition-colors">+971 58 536 2622</a>
                </div>

                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-gold/70 mb-2">Office</p>
                  <p className="font-serif text-xl text-ivory">Office No# 517, Al Barsha 1 Building,<br/>Al Barsha, Dubai, UAE</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn>
              <form className="space-y-8 bg-espresso/30 backdrop-blur-sm p-8 md:p-12 shadow-2xl border border-gold/60 rounded-sm">

                {notification && (
                  <div
                    className={`p-3 text-sm ${
                      notification.type === 'success'
                        ? 'text-gold border border-gold/40'
                        : 'text-red-300 border border-red-600'
                    }`}
                  >
                    {notification.message}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="font-sans text-xs tracking-widest uppercase text-gold">Full Name</label>
                  <input
                    id="name"
                    ref={nameRef}
                    placeholder="Full name"
                    className="w-full p-3 bg-transparent border border-gold/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-sans text-xs tracking-widest uppercase text-gold">Email</label>
                  <input
                    id="email"
                    ref={emailRef}
                    placeholder="you@company.com"
                    className="w-full p-3 bg-transparent border border-gold/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="inquiry" className="font-sans text-xs tracking-widest uppercase text-gold">Inquiry</label>
                  <select
                    id="inquiry"
                    ref={inquiryRef}
                    defaultValue="Buying a Property"
                    className="w-full p-3 bg-transparent border border-gold/20 text-white"
                  >
                    <option>Buying a Property</option>
                    <option>View Property</option>
                    <option>Consultation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-sans text-xs tracking-widest uppercase text-gold">Message</label>
                  <textarea
                    id="message"
                    ref={messageRef}
                    placeholder="Tell me about your project or question"
                    rows={5}
                    className="w-full p-3 bg-transparent border border-gold/20 text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading}
                  className="w-full p-4 bg-gold text-black font-bold"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

              </form>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  )
}
