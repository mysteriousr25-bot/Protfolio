import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
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

    const validationError = validate(nameVal, emailVal, inquiryVal, messageVal)
    if (validationError) {
      setNotification({ type: 'error', message: validationError })
      window.setTimeout(() => setNotification(null), 4000)
      return
    }

    const useServer = (import.meta.env.VITE_USE_SERVER_EMAIL ?? 'true') === 'true'

    setLoading(true)
    try {
      if (useServer) {
        const configuredServerUrl = typeof import.meta.env.VITE_SERVER_URL !== 'undefined' ? import.meta.env.VITE_SERVER_URL : ''
        const serverPath = configuredServerUrl ? `${configuredServerUrl.replace(/\/$/, '')}/api/send` : '/.netlify/functions/send'
        const resp = await fetch(serverPath, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nameVal, email: emailVal, inquiry: inquiryVal, message: messageVal }),
        })
        const json = await resp.json()
        console.info('Server send response', json)
        if (!resp.ok) throw new Error(json.error || 'Server send failed')
        setNotification({ type: 'success', message: 'Message Sent Successfully. I will get back to you shortly.' })
        clearForm()
      } else {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        const destinationEmail = import.meta.env.VITE_EMAILJS_DESTINATION_EMAIL || 'supriyahalder81000@gmail.com'

        const missing: string[] = []
        if (!serviceId) missing.push('SERVICE_ID')
        if (!templateId) missing.push('TEMPLATE_ID')
        if (!publicKey) missing.push('PUBLIC_KEY')
        if (missing.length) {
          setNotification({ type: 'error', message: `Email service not configured. Missing: ${missing.join(', ')}` })
          window.setTimeout(() => setNotification(null), 6000)
          return
        }

        const templateParams: Record<string, string> = {
          from_name: nameVal,
          from_email: emailVal,
          inquiry_type: inquiryVal,
          message: messageVal,
        }
        if (destinationEmail) templateParams.to_email = destinationEmail

        const resp = await emailjs.send(serviceId as string, templateId as string, templateParams, publicKey as string)
        console.info('EmailJS send response:', resp)
        setNotification({ type: 'success', message: 'Message Sent Successfully. I will get back to you shortly.' })
        clearForm()
      }
    } catch (err) {
      console.error('Send error', err)
      if ((import.meta as any).env?.DEV) {
        const msg = err instanceof Error ? err.message : JSON.stringify(err)
        setNotification({ type: 'error', message: `Send failed: ${msg}` })
      } else {
        setNotification({ type: 'error', message: 'Something went wrong. Please try again.' })
      }
    } finally {
      setLoading(false)
      window.setTimeout(() => setNotification(null), 5000)
    }
  }

  // server health and dev test UI removed for clarity in production view

  return (
    <section id="contact" className="py-32 bg-dark border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <FadeIn>
              <h2 className="text-gold font-sans tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-gold"></span>
                Work Together
              </h2>
              <h3 className="text-4xl md:text-6xl font-serif text-ivory leading-tight mb-8">
                Let's Discuss Your Property.
              </h3>
              <p className="text-ivory/60 font-sans text-lg leading-relaxed mb-12 max-w-md">
                Whether you're looking to list a luxury property or seeking
                strategic real estate advice, I'm here to elevate your
                experience.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-gold/50 mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:alikhalik@gmail.com"
                    className="font-serif text-2xl text-ivory hover:text-gold transition-colors"
                  >
                    alikhalik@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-gold/50 mb-2">
                    Phone
                  </p>
                  <a
                    href="tel:+971585362622"
                    className="font-serif text-2xl text-ivory hover:text-gold transition-colors"
                  >
                    +971 58 536 2622
                  </a>
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-gold/50 mb-2">
                    Office
                  </p>
                  <p className="font-serif text-xl text-ivory">
                    Office no# 517, AL Barsha 1 Building
                    <br />
                    AL Barsha, Dubai, UAE
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn delay={0.2}>
              <form className="relative space-y-8 bg-espresso p-8 md:p-12 shadow-2xl border border-gold/10 rounded-sm">
                {notification && (
                  <div
                    role="status"
                    aria-live={notification.type === 'success' ? 'polite' : 'assertive'}
                    className={`w-full px-5 py-3 rounded-md text-sm font-medium ${
                      notification.type === 'success'
                        ? 'bg-gold/10 border border-gold text-gold'
                        : 'bg-red-900/60 border border-red-700 text-rose-200'
                    }`}
                  >
                    {notification.message}
                  </div>
                )}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="font-sans text-xs tracking-widest uppercase text-gold"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    ref={nameRef}
                    autoComplete="name"
                    required
                    aria-required="true"
                    className="w-full bg-transparent border-b border-gold/20 py-3 font-serif text-lg text-ivory focus:outline-none focus:border-gold transition-colors placeholder:text-ivory/20"
                    placeholder="Ali Khalik"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="font-sans text-xs tracking-widest uppercase text-gold"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="email"
                    required
                    aria-required="true"
                    className="w-full bg-transparent border-b border-gold/20 py-3 font-serif text-lg text-ivory focus:outline-none focus:border-gold transition-colors placeholder:text-ivory/20"
                    placeholder="alikhalik@gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="inquiry"
                    className="font-sans text-xs tracking-widest uppercase text-gold"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="inquiry"
                    ref={inquiryRef}
                    defaultValue="Buying a Property"
                    required
                    aria-required="true"
                    className="w-full bg-transparent border-b border-gold/20 py-3 font-serif text-lg text-ivory focus:outline-none focus:border-gold transition-colors appearance-none rounded-none [&>option]:bg-espresso"
                  >
                    <option>Buying a Property</option>
                    <option>View Property</option>
                    <option>Consultation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="font-sans text-xs tracking-widest uppercase text-gold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    ref={messageRef}
                    autoComplete="off"
                    required
                    aria-required="true"
                    className="w-full bg-transparent border-b border-gold/20 py-3 font-serif text-lg text-ivory focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-ivory/20"
                    placeholder="Tell me about your real estate goals..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading}
                  aria-disabled={loading}
                  className={
                    "w-full py-4 text-dark font-sans tracking-widest uppercase text-sm font-semibold mt-4 shadow-[0_0_15px_rgba(212,175,55,0.2)] " +
                    (loading ? 'bg-gold/60 cursor-not-allowed' : 'bg-gold hover:bg-ivory transition-colors duration-300')
                  }
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                {/* Dev test button removed for clarity */}
              </form>
              {/* Dev diagnostics removed for clarity */}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
