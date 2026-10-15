# DJS MUNSoc — The Model United Nations Society of DJSCE

Production-grade website built for **DJS MUNSoc (Dwarkadas J. Sanghvi College of Engineering, Mumbai)** with Next.js App Router, Three.js / React Three Fiber, Tailwind CSS, Lenis Smooth Scroll, and Framer Motion.

---

## 1. How to Update Content (No Coding Required)

All website content is organized in editable JSON files under `/data`. You can edit these directly in GitHub or any text editor without touching any React or CSS code.

| File | What It Controls |
|---|---|
| [`data/conferences.json`](file:///Users/vivaanbhimani/Documents/djsmunsoc/data/conferences.json) | Upcoming conferences & youth summits, live countdown target dates, delegate fees, venues, and registration links. |
| [`data/committees.json`](file:///Users/vivaanbhimani/Documents/djsmunsoc/data/committees.json) | The 7 chambers (UNSC, UNODC, WTO, ECOSOC, UNICEF, IPC, DISEC), difficulty classifications, agendas 01 & 02, and executive board members. |
| [`data/secretariat.json`](file:///Users/vivaanbhimani/Documents/djsmunsoc/data/secretariat.json) | Leadership roster, titles, bios, LinkedIn profiles, and portrait photo paths. |
| [`data/gallery.json`](file:///Users/vivaanbhimani/Documents/djsmunsoc/data/gallery.json) | Captures pinned onto the 3D Memory Globe and archival recap grid with geographic coordinates and captions. |
| [`data/achievements.json`](file:///Users/vivaanbhimani/Documents/djsmunsoc/data/achievements.json) | Ledger of awards won nationwide (Harvard MUN India, IIT Bombay, GLC, BITS Pilani), filterable by year. |
| [`data/sponsors.json`](file:///Users/vivaanbhimani/Documents/djsmunsoc/data/sponsors.json) | Institutional partners, sponsorship tiers, and partnership deck download link. |
| [`data/testimonials.json`](file:///Users/vivaanbhimani/Documents/djsmunsoc/data/testimonials.json) | Delegate quotes, college names, and committee accolades. |

> **Note**: Any text marked with `[EDIT]` in the JSON files represents a placeholder ready for your real data (such as specific Google Form registration links, exact email addresses, or phone numbers).

---

## 2. Replacing Images & Logos

Add or replace your images in `/public/assets`:
- **Posters**: `/public/assets/posters/`
- **Committee & Chamber Photos**: `/public/assets/gallery/`
- **Secretariat Portraits**: `/public/assets/secretariat/`
- **Sponsor Logos**: `/public/assets/sponsors/`
- **Official Crest**: `/public/assets/logo/djsmun-emblem.svg` (or drop your transparent PNG here and update the path in `src/app/layout.tsx` / `Navigation.tsx`).

All photos automatically inherit the high-contrast grayscale, film grain, and halftone dot treatment via the `<TreatedImage />` component, smoothly transitioning to full color on hover.

---

## 3. How to Deploy to Vercel (1-Click)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "DJS MUNSoc Production Release"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New"** > **"Project"** and select your `djsmunsoc` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**. Your site will be live on a fast global CDN in under 60 seconds.

---

## 4. Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Visit http://localhost:3000

# Production build test
npm run build
```
