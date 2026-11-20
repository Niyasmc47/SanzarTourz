# Sanzar Tourz — Travel Agency Website

A modern, visually attractive, and responsive travel agency website for **Sanzar Tourz**, based in Palakkad, Kerala, India.

> **Brand slogan:** Travel. Breathe. Unwind.

---

## 🌟 Overview & Key Features

- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Lucide React icons.
- **Backend & Database:** Vercel Serverless Functions (`/api/packages`, `/api/config`) + MongoDB Atlas database.
- **Modern Luxury Visual Style:** Deep navy typography, clean off-white backgrounds, teal accents, curated travel imagery, and refined card designs.
- **WhatsApp Integration:** All booking and consultation requests route through click-to-chat links with prefilled, URL-encoded messages tailored per package or custom itinerary inquiry.
- **Secure Admin Portal (`/admin`):** Password-protected portal to add, edit, or delete tour packages, change WhatsApp numbers, emails, phone numbers, and brand content live.
- **Vercel Hostable:** Ready for one-click deployment on Vercel with zero server setup required.

---

## 🧭 Pages Included

1. **Home (`/`)**
   - Brand bar with Palakkad location & slogan
   - Hero section with custom imagery, headline (*"Discover the World. Find Your Escape."*), and quick CTAs
   - Featured Tour Packages with pricing in ₹ and direct WhatsApp CTAs
   - Popular Destinations (illustrative travel inspiration cards)
   - *"Why Choose Us?"* factual value pillars
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
   - **Password-Protected & Secure:** Default Password: `sanzar2026`
   - **Live Tour Packages Management:** Add, edit, or delete domestic & international packages with day-by-day itineraries, inclusions, exclusions, and pricing.
   - **Contact & WhatsApp Manager:** Change WhatsApp number, display text, phone, email, address, and working hours with immediate site-wide reflection.
   - **Brand & Content Editor:** Change brand slogan, story, and values dynamically.
   - **Backup & Security:** Change admin password, export/import JSON backup files, or reset to factory defaults.

---

## 🚀 How to Deploy to Vercel

1. Push this repository to GitHub:
   ```bash
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and click **"Add New" > "Project"**.

3. Select your repository (`SanzarTourz`). Vercel will automatically detect **Vite**.

4. **Environment Variables (Optional for MongoDB Cloud Database):**
   Under **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (e.g. `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/sanzartourz?retryWrites=true&w=majority`)
   - `MONGODB_DB`: `sanzartourz` (optional, defaults to `sanzartourz`)

   *(Note: Even without MongoDB configured, the site works fully out of the box using client-side storage and static defaults!)*

5. Click **"Deploy"**. Your site and serverless API endpoints will be live immediately!

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
