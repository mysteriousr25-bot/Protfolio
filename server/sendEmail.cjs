require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
app.use(express.json())

const path = require('path')

const PORT = parseInt(process.env.PORT || '4000', 10)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || process.env.VITE_FRONTEND_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
)

// create transporter from env
function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = port === 465
  if (!host || !user || !pass) return null
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } })
}

let transporter = null
let smtpReady = false
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = createTransporter()
  transporter
    .verify()
    .then(() => {
      smtpReady = true
      console.log('SMTP connected successfully')
    })
    .catch((err) => {
      smtpReady = false
      console.error('SMTP connection failed:', err && err.stack ? err.stack : err)
    })
} else {
  console.log('SMTP config missing — server-side email disabled. Set SMTP_HOST, SMTP_USER, SMTP_PASS')
}

app.post('/api/send', async (req, res) => {
  const { name, email, message } = req.body || {}
  const inquiry = (req.body && (req.body.inquiry || req.body.inquiryType)) || ''
  if (!name || !email || !inquiry || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields: name, email, inquiry/inquiryType, message are required' })
  }

  if (!transporter || !smtpReady) {
    console.error('Attempt to send email but SMTP unavailable')
    return res.status(500).json({ ok: false, error: 'SMTP not configured or not connected' })
  }

  const to = process.env.DESTINATION_EMAIL || 'supriyahalder81000@gmail.com'
  const mail = {
    from: `${name} <${email}>`,
    to,
    subject: `New Website Inquiry`,
    text: `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiry}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Inquiry Type:</strong> ${escapeHtml(inquiry)}</p><hr /><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g,'<br/>')}</p>`,
  }

  try {
    const info = await transporter.sendMail(mail)
    console.log('Email sent successfully:', { messageId: info.messageId, accepted: info.accepted })
    return res.json({ ok: true, info: { messageId: info.messageId, accepted: info.accepted } })
  } catch (err) {
    console.error('sendEmail error:', err && err.stack ? err.stack : err)
    return res.status(500).json({ ok: false, error: err && err.message ? err.message : String(err) })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true, now: new Date().toISOString(), smtp: !!transporter && smtpReady })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`CORS origin allowed: ${FRONTEND_ORIGIN}`)
})

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist')
  if (require('fs').existsSync(distPath)) {
    app.use(express.static(distPath))
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'))
    })
    console.log('Serving static frontend from', distPath)
  } else {
    console.warn('Production build not found at', distPath)
  }
}

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
