# Prateek Gupta — Cloud & Infrastructure Portfolio Website

A ultra-modern, single-page application (SPA) portfolio built for **Prateek Gupta** (Cloud & Infrastructure Engineer). Designed with a dark-mode-first aesthetic inspired by Linear and Vercel, featuring electric cyan glow highlights, 3D Cloud Mesh interactive node background, strictly typed content schema, and contact form backend integration.

![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11+-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

## ⚡ Features & Highlights

- **Linear/Vercel Design Aesthetics**: Deep charcoal (`#07080E`) void background, glassmorphic cards, noise grain overlay, and custom electric cyan (`#00F0FF`) / violet (`#8B5CF6`) glowing accents.
- **3D Cloud Mesh Canvas**: Custom WebGL/HTML5 canvas background with floating cloud network nodes and proximity connection lines that respond dynamically to cursor movement.
- **Typewriter Title Cycle**: Staggered typing animation cycling through *"Cloud & Infrastructure Engineer"*, *"DevOps Enthusiast"*, and *"Azure & Terraform Specialist"*.
- **Flagship Project Showcase**: Highlight banner for **DEVOPSINSIDERS_LANDING_ZONE** (7 reusable Terraform child modules, nested map(object(...)) dynamic variables, remote Azure state backend).
- **Interactive Skill Grid**: Categorized cards for Cloud & Infrastructure, IaC, CI/CD & DevOps, Languages, and MERN Web Development.
- **Vertical Career Timeline**: Animated timeline detailing internship experiences at DevOps Insiders and Vate Software Systems.
- **Centralized Typed Content**: Edit content in `src/data/content.ts` without touching JSX.
- **Contact Backend Route**: Next.js App Router API (`src/app/api/contact/route.ts`) supporting Nodemailer with development fallback logging and celebratory confetti upon submission.
- **Dark/Light Theme Toggle**: Powered by `next-themes` with persisted state in `localStorage`.

---

## 📂 Project Structure

```
prateek-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts         # Contact form POST handler
│   │   ├── globals.css              # Design tokens, custom scrollbar, noise texture
│   │   ├── layout.tsx               # Root layout, Google Fonts, ThemeProvider
│   │   └── page.tsx                 # SPA sections assembly
│   ├── components/
│   │   ├── canvas/
│   │   │   └── CloudMeshCanvas.tsx  # 3D interactive particle cloud mesh
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Typewriter title, CTAs, social links
│   │   │   ├── AboutSection.tsx     # Bio, education, stats counters
│   │   │   ├── SkillsSection.tsx    # Categorized skill cards with icons
│   │   │   ├── ProjectsSection.tsx  # Flagship Landing Zone + filtered cards
│   │   │   ├── ExperienceSection.tsx# Vertical career timeline
│   │   │   ├── ContactSection.tsx   # Contact form with status toast
│   │   │   └── Footer.tsx           # Minimal footer & scroll-to-top button
│   │   └── ui/
│   │       ├── Navbar.tsx           # Glass header, active pill, mobile menu
│   │       ├── ThemeToggle.tsx      # Dark/Light mode switcher
│   │       ├── TiltCard.tsx         # 3D mouse tilt wrapper
│   │       └── Counter.tsx          # Scroll-triggered stat counter
│   ├── data/
│   │   └── content.ts               # Single source of truth for text & projects
│   └── lib/
│       ├── types.ts                 # TypeScript schemas
│       └── utils.ts                 # Classname utility helpers
├── public/
│   └── resume.pdf                   # Downloadable resume placeholder
├── tailwind.config.ts               # Custom colors, glows & keyframes
└── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `18.x` or `20.x` or `22.x`
- `npm` or `pnpm` or `yarn`

### Installation & Local Run

1. **Clone or navigate to project directory**:
   ```bash
   cd C:\Users\asus\.gemini\antigravity-ide\scratch\prateek-portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build Production Bundle**:
   ```bash
   npm run build
   npm run start
   ```

---

## ✉️ Contact Form Configuration

To send actual email dispatches via SMTP, create a `.env.local` file in the root directory:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=iprateekgupta13@gmail.com
SMTP_PASS=your_app_password_here
CONTACT_RECEIVER_EMAIL=iprateekgupta13@gmail.com
```

> **Note**: If environment variables are omitted, the API route will operate in **Development Fallback Mode**, cleanly logging form submissions to the console and returning success.

---

## 🌐 Deployment to Vercel

1. **Deploy via Vercel CLI**:
   ```bash
   npx vercel
   ```

2. **Or push code to GitHub**:
   - Push your repo to `github.com/iprateek13/portfolio`
   - Import project in [Vercel Dashboard](https://vercel.com/new)
   - Add environment variables (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`) if desired.
   - Click **Deploy**!
