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
    <section id="contact" className="py-32 bg-dark border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <FadeIn>
          <form className="space-y-6 bg-espresso p-8 md:p-12 border border-gold/10">

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

            <input
              ref={nameRef}
              placeholder="Full Name"
              className="w-full p-3 bg-transparent border border-gold/20 text-white"
            />

            <input
              ref={emailRef}
              placeholder="Email"
              className="w-full p-3 bg-transparent border border-gold/20 text-white"
            />

            <select
              ref={inquiryRef}
              defaultValue="Buying a Property"
              className="w-full p-3 bg-transparent border border-gold/20 text-white"
            >
              <option>Buying a Property</option>
              <option>View Property</option>
              <option>Consultation</option>
              <option>Other</option>
            </select>

            <textarea
              ref={messageRef}
              placeholder="Message"
              rows={4}
              className="w-full p-3 bg-transparent border border-gold/20 text-white"
            />

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
    </section>
  )
}
