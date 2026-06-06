const nodemailer = require('nodemailer')

exports.handler = async function (event) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) }
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Invalid JSON' }) }
  }

  const name = body.name || ''
  const email = body.email || ''
  const inquiry = body.inquiry || body.inquiryType || ''
  const message = body.message || ''

  if (!name || !email || !inquiry || !message) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Missing fields' }) }
  }

  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.DESTINATION_EMAIL || user

  if (!host || !user || !pass) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'SMTP not configured' }) }
  }

  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })

  try {
    await transporter.verify()
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'SMTP verification failed', detail: String(err) }) }
  }

  const mail = {
    from: `${name} <${email}>`,
    to,
    subject: `New Website Inquiry`,
    text: `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiry}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Inquiry Type:</strong> ${escapeHtml(inquiry)}</p><hr /><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g,'<br/>')}</p>`,
  }

  try {
    const info = await transporter.sendMail(mail)
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true, info: { messageId: info.messageId, accepted: info.accepted } }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: String(err) }) }
  }
}

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
