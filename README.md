# DAR AI Website

Production-ready Next.js App Router frontend using JavaScript, Tailwind CSS, Shadcn-style reusable UI components, Framer Motion, inline SVG icons, and maintainable EN/FR localization.

## Run

```bash
npm install
npm run dev
```

## Localization

All website text is managed from:

```txt
lib/i18n.js
```

Edit English under `en` and French under `fr`. The language switcher stores the selected language in `localStorage` using `dar_locale`.

## Icons

Icons are now inline SVG components inside:

```txt
components/ui/icon.jsx
```

No `public/icons/ico.js` file is used. To update an icon, edit the SVG path in `components/ui/icon.jsx`.

## Assets

All images are inside:

```txt
public/images
```

Use `next/image` for optimized image loading.
