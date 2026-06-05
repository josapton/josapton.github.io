# josapton's Portfolio

A minimalist, elegant, and cyber-themed personal portfolio website emphasizing **DevSecOps**, **Cybersecurity**, **Software Engineering**, and **AI**.

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Framer Motion](https://img.shields.io/badge/Framer-Black?style=for-the-badge&logo=framer&logoColor=blue)

## 🌐 Overview
Built with a sleek, terminal-inspired design language (monospace typography, blinking cursors, network node backgrounds, and grid scanlines), this portfolio is designed to be fully responsive with automatic Light/Dark mode support. 

Live at: [https://josapton.github.io](https://josapton.github.io)

## ⚡ Features
- **Network Nodes Effect**: Interactive canvas background representing infrastructure and connectivity with parallax mouse effects.
- **Cyber/Terminal Theme**: Blinking cursors, monospace accents, scan lines, and command-line aesthetics.
- **Hidden Terminal (Easter Egg)**: Type `~` or `sudo` to access a fully interactive terminal overlay with commands like `help`, `ls`, `neofetch`, and `ping`. Try the `matrix` command!
- **System Robustness**: Implemented a global React `ErrorBoundary` (Kernel Panic UI), an `OfflineBanner` for PWA state awareness, and strict `Content-Security-Policy` headers.
- **Command Palette**: Press `Ctrl/Cmd + K` for a quick navigation and action menu (with clipboard integration).
- **Theme Manager**: 3-state Context-based Theme Manager (Dark, Light, System Preference).
- **Real-Time GitHub Stats**: Fetches live repository and star counts from the GitHub API with local caching.
- **Bilingual (i18n)**: Full English (EN) and Indonesian (ID) support with seamless context-based switching.
- **Optimized PWA & SEO**: Structured JSON-LD data, Apple web app meta tags, robust accessibility (ARIA roles), and Service Worker caching.
- **Dynamic Routing**: Built with `react-router-dom` using `BrowserRouter` and GitHub Pages SPA fallback.
- **Fully Automated Deployment**: Powered by GitHub Actions for seamless continuous deployment to GitHub Pages.

## 🚀 Running Locally

If you'd like to run this project on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/josapton/josapton.github.io.git
   cd josapton.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173/`.

## 🛠️ Editing Content
- **Portfolio / Projects / Research**: Edit `src/pages/Portfolio.jsx`
- **Translations (i18n)**: Edit `src/locales/en.js` and `src/locales/id.js`
- **Theme & Colors**: Core CSS variables are defined in `src/index.css`
- **Easter Egg Commands**: Edit `src/components/EasterEgg.jsx`

## 📄 License
This project is open-source and available under the MIT License.
