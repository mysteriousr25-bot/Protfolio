# Portfolio Email Backend

This repository includes a small Express + Nodemailer email backend used by the frontend contact form.

## Files changed
- `server/sendEmail.cjs` - main email server (Express + Nodemailer). Added CORS, SMTP verification, clear logs, `/api/health`, and `/api/send` handlers.
- `server/sendEmail.js` - mirror of `sendEmail.cjs` with same improvements.
- `.env.example` - updated with `PORT`, `FRONTEND_ORIGIN` and SMTP template values.

## Required dependencies
- express
- nodemailer
- cors
- dotenv

These are already listed in `package.json` dependencies.

## .env (template)
Copy the template below to `.env` in the project root and fill values (DO NOT COMMIT `.env`):

```
# Backend / server
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173

# Use server-side sending (true) or EmailJS (false)
VITE_USE_SERVER_EMAIL=true
VITE_SERVER_URL=http://localhost:4000

# SMTP (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_gmail_app_password_here
DESTINATION_EMAIL=your.destination@example.com

# Optional EmailJS (if you prefer client-side)
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_DESTINATION_EMAIL=your.destination@example.com
```

## Gmail App Password (quick)
1. Enable 2-Step Verification on your Google account.
2. Go to: Google Account -> Security -> App passwords.
3. Create a new app password for "Mail" (choose a device name), then copy the 16-character password.
4. Set `SMTP_USER` to your Gmail address and `SMTP_PASS` to the 16-character password.

## Run commands
Install dependencies:

```bash
npm install
```

Start backend:

```bash
npm run start:server
# or
node server/sendEmail.cjs
```

Start frontend (Vite):

```bash
npm run dev
```

## Verify endpoints
Health check (PowerShell recommended):

```powershell
Invoke-RestMethod -UseBasicParsing http://localhost:4000/api/health | ConvertTo-Json
```

Programmatic send test (PowerShell):

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:4000/api/send -ContentType 'application/json' -Body (ConvertTo-Json @{
  name = 'Test User'
  email = 'test@example.com'
  inquiry = 'Buying a Property'
  message = 'Hello from test'
})
```

Expected successful response:

```json
{ "ok": true, "info": { "messageId": "...", "accepted": ["your.destination@example.com"] } }
```

## How to test emails arriving
1. Ensure `.env` configured and backend restarted.
2. Start backend and confirm `SMTP connected successfully` in server logs.
3. Submit the contact form from the frontend or run the programmatic test above.
4. Check `DESTINATION_EMAIL` (Gmail) inbox (and spam folder). The email subject is `New Website Inquiry`.

## Troubleshooting
- ERR_CONNECTION_REFUSED: backend not running or `VITE_SERVER_URL` incorrect.
- SMTP connection failed: verify `SMTP_USER`/`SMTP_PASS` (app password), firewall, and network.

## Deployment

You can deploy this as a single service that serves the built frontend and runs the backend API. The server will serve the Vite `dist` output when `NODE_ENV=production`.

Recommended quick hosts:
- Render (static + web service) — create a Web Service that runs `npm start`.
- Heroku — push this repo, the `Procfile` runs `node server/sendEmail.cjs`. Heroku will run `heroku-postbuild` to build the frontend.

Basic Heroku steps:

1. Install the Heroku CLI and login: `heroku login`
2. Create app: `heroku create your-app-name`
3. Set environment variables (`SMTP_USER`, `SMTP_PASS`, `DESTINATION_EMAIL`, `FRONTEND_ORIGIN`, etc):
  ```bash
  heroku config:set SMTP_HOST=smtp.gmail.com SMTP_PORT=587 SMTP_USER=you@gmail.com SMTP_PASS=your_app_password DESTINATION_EMAIL=dest@example.com VITE_USE_SERVER_EMAIL=true
  ```
4. Push to Heroku (main branch):
  ```bash
  git push heroku main
  ```
5. Open app: `heroku open`

Render steps (simple):

1. Create new Web Service on Render, connect your repo.
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Set environment variables in Render Dashboard.

Notes:
- Make sure `.env` variables are set in the host dashboard; do NOT commit secrets.
- The server serves the built site from `dist` only when `NODE_ENV=production` and `dist` exists.
- If you prefer to host frontend separately (Vercel/Netlify), point `VITE_SERVER_URL` to the backend service URL and deploy backend as a standalone service.
 
Netlify-specific deployment (frontend + serverless email)
-----------------------------------------------------

If you want to host the frontend on Netlify and run the email endpoint as a Netlify Function (no separate backend), follow these steps:

1. Push your repo to GitHub.
2. In Netlify, create a new site from Git and connect your repository.
3. In Netlify build settings set:
  - Build command: `npm run build`
  - Publish directory: `dist`
  Netlify will automatically detect functions in `netlify/functions` and deploy them.
4. In Netlify site settings → Environment, add the SMTP variables:
  - `SMTP_HOST` (smtp.gmail.com)
  - `SMTP_PORT` (587)
  - `SMTP_USER` (your Gmail)
  - `SMTP_PASS` (your Gmail app password)
  - `DESTINATION_EMAIL` (recipient)
5. If you leave `VITE_SERVER_URL` unset, the frontend will POST to the serverless function at `/.netlify/functions/send` (this repo already defaults to that).

Testing on Netlify:
- After deploy, call `https://your-site.netlify.app/.netlify/functions/health` to check health.
- The contact form will POST to `/.netlify/functions/send` and the function will send email via SMTP.

Notes:
- Netlify Functions are serverless and have execution time limits (10s+ depending on plan). Sending email via SMTP is usually within limits.
- Ensure `SMTP_PASS` is an App Password (Google) if using Gmail.
---
If you want, I can add `express-validator` checks, automated tests, or PM2 process files next.
