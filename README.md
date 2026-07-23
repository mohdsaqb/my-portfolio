# Mohd Saqib — Portfolio

Premium dark-themed personal portfolio built with React, Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

## Before deploying

- Replace `public/resume.pdf` with your real resume.
- Update `src/utils/emailjs.js` with your [EmailJS](https://www.emailjs.com) Service ID, Template ID, and Public Key so the contact form can send messages. Your EmailJS template should accept `name`, `email`, `subject`, and `message` fields.
- Update social/contact links in `src/constants/data.js`.
- Replace `public/favicon.svg` and add an `public/og-image.png` for social sharing previews.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — lint with oxlint
