exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) }
  const smtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ ok: true, now: new Date().toISOString(), smtp: smtpConfigured }),
  }
}
