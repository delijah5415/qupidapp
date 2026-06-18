# Qupid - Investment Platform

A modern, high-performance investment platform built with Next.js 15, React 19, and Tailwind CSS. Designed for professional traders and investors with real-time analytics and portfolio management.

## Features

- 🎯 Real-time market data and analytics
- 📊 Advanced portfolio tracking and analytics
- 🔐 Secure authentication and transactions
- 📱 Responsive design for all devices
- ⚡ Lightning-fast performance
- 🌙 Dark theme with professional UI
- 📈 Interactive charts and visualizations

## Tech Stack

- **Framework**: Next.js 15
- **React**: 19
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Lucide React Icons
- **Language**: TypeScript
- **Deployment**: Netlify

## Project Structure

```
qupidapp/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── pricing/
│   │   └── page.tsx        # Pricing page
│   ├── portal/
│   │   └── page.tsx        # Dashboard/Portal
│   └── api/                # API routes
├── public/                 # Static assets
├── globals.css             # Global styles
├── tailwind.config.ts      # Tailwind configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.js       # PostCSS configuration
└── netlify.toml            # Netlify deployment config
```

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/delijah5415/qupidapp.git
cd qupidapp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting checks

## Deployment on Netlify

### Prerequisites
- GitHub repository connected
- Netlify account

### Steps

1. **Connect Repository**:
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Authorize GitHub
   - Select this repository

2. **Configuration**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - The `netlify.toml` handles the rest

3. **Deploy**:
   - Netlify auto-deploys on every push to main
   - Preview URLs for pull requests

## Pages

### Home (`/`)
- Landing page with hero section
- Feature highlights
- Navigation and CTAs

### Pricing (`/pricing`)
- Three tier pricing: Starter, Professional, Enterprise
- Feature comparisons
- Call-to-action buttons

### Portal (`/portal`)
- Dashboard with portfolio overview
- Statistics and performance charts
- Recent trades table
- Login interface

## Color Scheme

- **Background**: `#0D0D0C`
- **Text**: `#FFFFFF`
- **Accent**: `#E53E3E` (Qupid Red)
- **Secondary**: `#1A1A19`
- **Borders**: `#262624`

## Built With

- Next.js 15
- React 19
- Tailwind CSS 3.4
- TypeScript
- Lucide React

---

Built with ❤️ for modern investors
