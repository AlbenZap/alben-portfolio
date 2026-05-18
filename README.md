# Alben Antappan - Portfolio

Personal portfolio built with Next.js, React 19, GSAP, and Lenis smooth scroll.

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Animations:** GSAP 3 + ScrollTrigger, CSS keyframes
- **Smooth scroll:** lenis
- **Styling:** Inline styles + CSS modules (globals.css)
- **PDF viewer:** react-pdf (pdfjs worker via unpkg CDN)

## Getting Started

```bash
npm install
npm run dev
```

## Build & Export

```bash
npm run build
```

## Project Structure

```
app/          # Next.js App Router (layout, page, globals.css)
components/   # All page sections and UI components
public/
  logos/      # Org logos (SVG)
  images/     # Profile photo
  resume.pdf
lib/          # GSAP singleton config
```
