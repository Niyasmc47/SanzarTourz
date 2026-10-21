# Sanzar Tourz — Travel Agency Website

A modern, visually attractive, and responsive travel agency website for **Sanzar Tourz**, based in Palakkad, Kerala, India.

> **Brand slogan:** Travel. Breathe. Unwind.

---

## 🌟 Overview & Key Features

- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Lucide React icons.
- **Modern Luxury Visual Style:** Deep navy typography, clean off-white backgrounds, teal accents, curated travel imagery, and refined card designs.
- **Zero-Backend Architecture:** Ready for instant static hosting on Vercel without databases or server maintenance.
- **WhatsApp Integration:** All booking and consultation requests route through click-to-chat links with prefilled, URL-encoded messages tailored per package or custom itinerary inquiry.
- **Full Responsive Design:** Tailored for seamless viewing across smartphones, tablets, and wide desktop screens.
- **Non-Technical Maintainability:** Centralized business info and separated data files so business owners can change WhatsApp numbers, contact details, and tour packages in seconds.

---

## 🧭 Pages Included

1. **Home (`/`)**
   - Brand bar with Palakkad location & slogan
   - Hero section with inspiring imagery, headline ("Discover the World. Find Your Escape."), and quick CTAs
   - Featured Tour Packages with pricing in ₹ and direct WhatsApp CTAs
   - Popular Destinations (illustrative travel inspiration cards)
   - "Why Choose Us?" factual value pillars
   - Customised Holidays spotlight section
   - Quick contact and Palakkad location details
   - Comprehensive footer with links and hours

2. **International Tour Packages (`/international-tours`)**
   - Grid of international packages (Dubai, Malaysia & Singapore, Bali, Thailand)
   - Real-time search and budget filter pills (Under ₹50k, ₹50k+ / On Request)
   - Interactive day-by-day itinerary modal with inclusions, exclusions, and travel dates

3. **India Tour Packages (`/india-tours`)**
   - Domestic packages (Kashmir Valley, Himachal Highlands, Golden Triangle, Andaman Islands)
   - Real-time search and budget filter pills (Under ₹25k, ₹25k+ / On Request)
   - Comprehensive day-by-day modal with inclusions and exclusions

4. **Customised Holidays (`/customised-holidays`)**
   - Dedicated trip design planner
   - Validated inquiry form: Full Name, Phone, Departure City, Preferred Destination, Tentative Dates, Group Size, Budget in ₹, and Custom Preferences
   - One-click trigger that launches WhatsApp with all details neatly prefilled

5. **About Us (`/about`)**
   - Professional story, travel philosophy, and Palakkad roots
   - Core operating principles and service categories

6. **Contact Us (`/contact`)**
   - Direct WhatsApp enquiry action card
   - Office phone and email placeholders
   - Office address (Palakkad, Kerala, India)
   - Operating hours and social media links
   - Fast inquiry composer that sends directly to WhatsApp

7. **Admin Portal (`/admin`)**
   - **Password-Protected & Secure:** Gated with session authentication (Default Password: `sanzar2026`).
   - **Tour Packages Management:** Add, edit, or delete domestic & international packages with day-by-day itineraries, inclusions, exclusions, and pricing.
   - **Contact & WhatsApp Manager:** Change WhatsApp number, display text, phone, email, address, and working hours with immediate site-wide reflection.
   - **Brand & Content Editor:** Change brand slogan, story, and values dynamically.
   - **Backup & Security:** Change admin password, export/import JSON backup files, or reset to factory defaults.

---

## 🛠️ Project Structure

```
SanzarTourz/
├── index.html                 # Entry HTML with Google Fonts (Plus Jakarta Sans & Playfair Display)
├── package.json               # Dependencies and build scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Custom palette (deep navy, teal, sand) & typography
├── tsconfig.json              # TypeScript configuration
├── vercel.json                # Single Page App routing rewrite configuration for Vercel
├── vite.config.ts             # Vite configuration
└── src/
    ├── main.tsx               # React application entry point
    ├── App.tsx                # React Router setup & global layout
    ├── index.css              # Tailwind imports and base styles
    ├── types/
    │   └── index.ts           # TypeScript interfaces (TourPackage, DestinationCard, etc.)
    ├── config/
    │   └── siteConfig.ts      # ⚡ CENTRAL CONFIG: WhatsApp number, phone, email, address, etc.
    ├── data/
    │   └── packages.ts        # ⚡ TOUR PACKAGES DATA: Add or edit packages, prices, itineraries
    ├── utils/
    │   └── whatsapp.ts        # WhatsApp click-to-chat URL generators
    ├── components/
    │   ├── Navbar.tsx         # Brand header with mobile navigation drawer & WhatsApp CTA
    │   ├── Footer.tsx         # Responsive footer with full navigation & office information
    │   ├── PackageCard.tsx    # Reusable package card with pricing, duration & CTAs
    │   ├── PackageModal.tsx   # Detailed modal with full itinerary, inclusions & exclusions
    │   ├── ScrollToTop.tsx    # Smooth page top reset on route transitions
    │   └── WhatsAppFloatButton.tsx # Persistent floating WhatsApp button
    └── pages/
        ├── Home.tsx
        ├── InternationalTours.tsx
        ├── IndiaTours.tsx
        ├── CustomisedHolidays.tsx
        ├── AboutUs.tsx
        └── ContactUs.tsx
```

---

## ⚙️ How to Update Business Information (For Maintainers)

### 1. Updating the WhatsApp Number & Contact Info
Open [`src/config/siteConfig.ts`](src/config/siteConfig.ts):
```typescript
contact: {
  // Enter number in international format without symbols (e.g. 91 + 10 digits)
  whatsappNumber: "919876543210", 
  whatsappDisplayNumber: "+91 98765 43210",
  phoneNumber: "+91 98765 43210",
  email: "enquiry@sanzartourz.com",
}
```
Updating this single file automatically updates all buttons, forms, footers, and floating WhatsApp links across the entire website.

### 2. Adding or Editing Tour Packages
Open [`src/data/packages.ts`](src/data/packages.ts):
Each tour package object allows you to customize:
- `name`: Package title
- `destination` & `country`
- `category`: `'international'` or `'india'`
- `duration`: e.g. `"6 Days / 5 Nights"`
- `pricePerPerson`: Enter a number in rupees (e.g. `42000`) or `null` for *"Price on request"*
- `heroImage` & `galleryImages`: Image URLs
- `highlights`: Array of key features
- `dayByDayItinerary`: Array of day numbers, titles, and descriptions
- `inclusions` & `exclusions`: Bullet points for what's covered and what's not

---

## 💻 Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```
   Build output will be generated inside the `dist/` directory.

4. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🚀 Deploying to Vercel

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New" > "Project"**.
3. Select your repository. Vercel will automatically detect **Vite**.
4. The included `vercel.json` ensures direct page refreshes (e.g., `/international-tours`) work seamlessly with client-side routing.
5. Click **"Deploy"**. Your site is live!

