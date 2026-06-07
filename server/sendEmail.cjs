require('dotenv').config()

const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ||
  process.env.VITE_FRONTEND_ORIGIN ||
  'http://localhost:5173'

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
)

// Create SMTP transporter
function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) return null

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })
}

const transporter = createTransporter()

// SEND EMAIL API
app.post('/api/send', async (req, res) => {
  const { name, email, message } = req.body || {}

  const inquiry = req.body?.inquiry || req.body?.inquiryType || ''

  if (!name || !email || !message || !inquiry) {
    return res.status(400).json({
      ok: false,
      error: 'Missing required fields',
    })
  }

  const to = process.env.DESTINATION_EMAIL

  if (!to) {
    return res.status(500).json({
      ok: false,
      error: 'DESTINATION_EMAIL not set',
    })
  }

  if (!transporter) {
    return res.status(500).json({
      ok: false,
      error: 'SMTP not configured',
    })
  }

  try {
    const info = await transporter.sendMail({
      from: `${name} <${email}>`,
      to,
      subject: 'New Website Inquiry',
      text: `Name: ${name}\nEmail: ${email}\nInquiry: ${inquiry}\n\nMessage:\n${message}`,
      html: `
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Inquiry:</b> ${escapeHtml(inquiry)}</p>
        <hr/>
        <p><b>Message:</b><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    })

    return res.json({
      ok: true,
      messageId: info.messageId,
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message,
    })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    smtp: !!transporter,
    time: new Date().toISOString(),
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`CORS allowed origin: ${FRONTEND_ORIGIN}`)
})

// HTML escape helper
function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
