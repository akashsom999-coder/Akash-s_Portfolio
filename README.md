# Akash Som — Portfolio Website

A modern, responsive developer portfolio built with plain **HTML5, CSS3, and JavaScript** — no frameworks, no build step, no backend required.

## File Structure

```
portfolio/
│
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── profile.jpg   ← add your own photo here
│   └── resume.pdf    ← add your own resume here
└── README.md
```

## Getting Started

1. Add your professional profile photo at `assets/profile.jpg`. Until it's added, the hero section automatically shows a clean placeholder icon instead of a broken image.
2. Add your resume PDF at `assets/resume.pdf`. The **Resume** button in the navigation and mobile menu links to it.
3. Open `index.html` directly in a browser, or serve the folder with any static file server:
   ```bash
   npx serve .
   # or
   python3 -m http.server
   ```

## Design Notes

- **Theme**: dark mode by default, with a light/dark toggle (choice is remembered via `localStorage`).
- **Hero**: styled as a code editor window with a typing animation, to reflect a developer's actual workspace rather than a generic gradient hero.
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (code/labels) — loaded from Google Fonts.
- **Colors**: warm amber/orange accent with a cyan secondary accent, defined as CSS custom properties in `:root` and `[data-theme="light"]` in `style.css` for easy re-theming.

## Features

- Sticky navigation with active-section highlighting
- Mobile hamburger menu
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Back-to-top button
- Project filtering by technology
- Contact form with client-side validation and `mailto:` submission
- Fully responsive: desktop, laptop, tablet, and mobile layouts

## Customizing Content

All text content lives directly in `index.html`. Project cards, skills, certifications, and education entries are plain HTML blocks — copy an existing `<article>` / `<div>` block and edit the text to add or change entries.

## Connecting a Real Backend (Optional)

The contact form currently opens the visitor's email client with a pre-filled message via a `mailto:` link (see `setupContactForm()` in `script.js`). To connect a real backend later:

1. Replace the `mailto:` logic in `script.js` with a `fetch()` call to your API/form endpoint (e.g. Formspree, Netlify Forms, or a custom server).
2. Keep the existing client-side validation — it will still run before submission.
