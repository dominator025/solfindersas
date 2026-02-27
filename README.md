# 🎵 SolFinders — Raaga Sound Therapy

> **Heal through Heritage** — Ancient Indian sound therapy for modern minds.

SolFinders is a client-side web application that provides mental wellness through **Indian Raaga-based sound therapy**. Built for the **Heritage Aesthetics** hackathon track, it combines centuries of Vedic healing wisdom with modern web technology.

---

## ✨ Features

### 🎶 Raaga Sound Player
- **6 authentic Indian Raagas** — Bhairavi, Yaman, Todi, Darbari Kanada, Malkauns, Desh
- **Web Audio API** — Real-time oscillator-based tone generation with detuned warmth and fifth harmonics
- **Tanpura Drone** — 3-voice drone (Sa + Pa + upper Sa) with amplitude modulation for authentic Indian classical feel
- **Visual Breathing Orb** — SVG 12-petal mandala with 6-second inhale/exhale animation
- **Session Timer** — 5/10/15 minute presets with circular SVG progress ring

### 📖 Daily Panchatantra Story
- **7 classic tales** with morals, character emojis, and book names
- Expandable card with shuffle button for random stories
- Deterministic daily rotation based on day-of-year

### 🧘 Pranayama Breathing Guide
- Interactive **4-4-6 breathing cycle** (Inhale 4s → Hold 4s → Exhale 6s → Rest 2s)
- Animated expanding/contracting circle with phase indicators
- Cycle counter tracking completed sessions

### 💛 Mood Check-in
- 6 emotional states with personalized **raaga recommendations**
- Each mood maps to a specific raaga with healing context

### 📄 Multi-Page App
- **Home** — Sound player, wellness tools, about section
- **About** — Founder team, "The Problem We Solve" section, Our Vision
- **Contact** — CTA hero, contact form, owner details

---

## 🏗 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | Framework & routing |
| **Tailwind CSS v4** | Styling via `@theme` CSS variables |
| **Web Audio API** | Client-side sound generation |
| **Lucide React** | Icon library |
| **TypeScript** | Type safety |

---

## 🎨 Heritage Color Palette

| Color | Hex | Usage |
|---|---|---|
| Saffron | `#E8902E` | Accents, labels |
| Deep Maroon | `#6B1D2A` | Headings, primary |
| Warm Cream | `#FDF6EC` | Backgrounds |
| Temple Gold | `#C9A94E` | Decorative elements |
| Sandstone | `#D4A76A` | Borders, muted |
| Muted Terracotta | `#A0785A` | Body text |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Team SolFinders

| Name | Role |
|---|---|
| **Adrika Gaur** | Research & Content Lead |
| **Kashish Bharti** | Backend & Audio Engineer |
| **Bhaskar Thakur** | Frontend & UI/UX Lead |
| **Laxmi Singh** | Product & Strategy Lead |

> B.Tech Students · Heritage Aesthetics Track · Hackathon 2026

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page
│   ├── about/page.tsx    # About page
│   ├── contact/page.tsx  # Contact page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Theme & animations
├── components/
│   ├── Header.tsx        # Sticky navbar
│   ├── HeroSection.tsx   # Landing hero
│   ├── AboutSection.tsx  # How Raaga Therapy Works
│   ├── RaagaCard.tsx     # Individual raaga card
│   ├── RaagaGrid.tsx     # Raaga selection grid
│   ├── PlayerSection.tsx # Audio player wrapper
│   ├── PlayerControls.tsx# Play/pause/volume
│   ├── BreathingOrb.tsx  # SVG mandala orb
│   ├── SessionTimer.tsx  # Timer with presets
│   ├── DailyStory.tsx    # Panchatantra stories
│   ├── BreathingExercise.tsx # 4-4-6 Pranayama
│   ├── MoodCheckin.tsx   # Mood → raaga mapper
│   ├── WellnessTools.tsx # Tools section wrapper
│   └── Footer.tsx        # Footer
├── data/
│   ├── raagas.ts         # 6 raaga definitions
│   └── panchatantra.ts   # 7 Panchatantra stories
└── hooks/
    └── useAudioPlayer.ts # Web Audio API hook
```

---

## 📜 License

Built with ♥ for Heritage Aesthetics Track — Hackathon 2026
