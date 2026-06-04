# Gemini Project Rules: josapton.github.io

You are assisting in the development of a personal portfolio website for a Cybersecurity and DevSecOps professional. Follow these guidelines when generating code or suggesting changes.

## 🏗️ Architecture & Tech Stack
- **Core**: React 19 + Vite 8
- **Routing**: `react-router-dom` (BrowserRouter with GitHub Pages SPA `404.html` fallback)
- **Styling**: Vanilla CSS in `src/index.css`. **Do NOT use TailwindCSS**.
- **Animations**: `framer-motion` for page transitions and micro-interactions.
- **Icons**: `lucide-react` (ensure icons are imported individually or from the main package if treeshaking is configured).
- **State/Context**: Standard React Hooks (`useState`, `useEffect`, `useContext`) for language and theme management.

## 🎨 Design System & Aesthetics
- **Theme**: Cybersecurity / Hacker / Terminal aesthetic. Keep it sleek, minimal, and premium.
- **Colors**: Rely exclusively on CSS variables defined in `index.css`:
  - `var(--color-bg-primary)` / `var(--color-bg-secondary)`
  - `var(--color-text-primary)` / `var(--color-text-secondary)` / `var(--color-text-muted)`
  - `var(--color-accent)` (primary neon/emerald green)
  - `var(--color-accent-dim)`, `var(--color-accent-warn)`, `var(--color-accent-secondary)`
- **Typography**: 
  - Primary text: `var(--font-sans)` (Inter)
  - Accents, titles, commands: `var(--font-mono)` (JetBrains Mono)
- **UI Patterns**:
  - Use `//` for page titles (e.g., `// PORTFOLIO`).
  - Use `>` for links and buttons (e.g., `> Return Home`).
  - Do not use numbers for section headings.

## 🌐 i18n (Localization)
- The app supports English (`en`) and Indonesian (`id`).
- All hardcoded user-facing text MUST be added to `src/locales/en.js` and `src/locales/id.js`.
- Use the `useLanguage()` context hook to retrieve the current translation object.

## ⚡ Performance & Quality Rules
- Avoid inline styles whenever possible; use utility classes from `index.css`.
- Ensure all `useEffect` hooks cleanly remove event listeners and cancel timeouts/intervals.
- Do not introduce `setState` calls synchronously within effect bodies to prevent cascading renders.
- Do not leave unused imports or dead code. Keep the console free of ESLint warnings.
- Preserve accessibility attributes (`aria-label`, `role`, etc.) when modifying UI components.

## 🤫 Secret Features (Easter Eggs)
- The site contains a hidden terminal overlay (`src/components/EasterEgg.jsx`). If proposing new features, consider if they fit well as hidden terminal commands.
