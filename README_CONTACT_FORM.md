# Estavo website contact form

The Contact page now submits enquiries to a Vercel Function at `/api/contact`.
The function sends the enquiry through Resend to `hello@estavo.io` and sets the visitor's email as Reply-To.

## One-time setup

1. Create or sign in to a Resend account.
2. Add and verify the sending domain `mail.estavo.io` in Resend.
   - Add the DNS records shown by Resend to the DNS provider for `estavo.io`.
   - Use a sending subdomain so the existing Microsoft 365 mail setup for `estavo.io` stays separate.
3. Create a Resend API key.
4. In Vercel open the Estavo website project:
   - Settings -> Environment Variables
   - Add the following variables for Production, Preview and Development:

```text
RESEND_API_KEY = your Resend API key
CONTACT_TO_EMAIL = hello@estavo.io
CONTACT_FROM_EMAIL = Estavo Website <enquiries@mail.estavo.io>
```

5. Redeploy the website after saving the variables.
6. Submit a test enquiry from `contact.html` and confirm that it reaches Outlook.

## Files changed

- `api/contact.mjs`
- `contact.html`
- `script.js`
- `styles.css`
- `.gitignore`
- `.env.example`

## Security notes

- The Resend API key stays in Vercel and is never exposed in browser JavaScript.
- The form includes server-side validation and a honeypot field for basic bot filtering.
- For public launch, add Turnstile or another CAPTCHA if spam becomes a problem.
