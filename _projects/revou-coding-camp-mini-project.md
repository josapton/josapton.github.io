---
layout: post
title: RevoU Coding Camp Mini Project
description: This is a mini coding project website of RevoU Coding Camp Software Engineering 2025
---

# [RevoU ft. Joko Saptono Website](https://revou-coding-camp.github.io/codingcamp-14-jul-25-josapton)

([See on GitHub](https://github.com/Revou-Coding-Camp/codingcamp-14-jul-25-josapton))

## Structure

```
codingcamp-14-jul-25-josapton/
│
├── index.html                # Home page
├── profile.html              # Our Profile page
├── css/
│   └── style.css             # Main stylesheet
├── js/
│   └── script.js             # Main JavaScript file
└── assets/
    ├── favicon/              # Favicon and manifest files
    └── images/               # Images for banner and headquarters
```

## Technology

- **HTML5**: Semantic markup for structure and content.
- **CSS3**: Modern styling, responsive design, transitions, and animations.
- **JavaScript (ES6+)**: DOM manipulation, form validation, navbar interactivity.
- **Responsive Design**: Mobile-first approach using CSS media queries.
- **No frameworks**: Pure HTML, CSS, and JS for learning and simplicity.

## Features

- **Responsive Navbar**: Hamburger menu for mobile, smooth transitions.
- **Dynamic Welcome**: JavaScript prompt for user name on Home page.
- **Photo Banner**: Company banner image section.
- **Headquarter Section**: Circular images for Jakarta, Bandung, Surabaya with animated effects.
- **Profile Page**: Custom design with company info, vision, and mission.
- **Message Us Form**: Validated form with animated inputs, displays submitted data.
- **Animations**: Fade-in for sections, hover effects for interactive elements.
- **Footer**: Consistent branding and credits.

## How This Project Is Built

1. **HTML Slicing**: Pages are structured based on a provided wireframe/mockup, ensuring semantic and accessible markup.
2. **Single CSS File**: All styles are centralized in `css/style.css`, including layout, colors, transitions, and responsive rules.
3. **Single JS File**: All interactivity (navbar toggle, welcome prompt, form validation) is handled in `js/script.js` and loaded on every page.
4. **Responsive Design**: Layout adapts to desktop and mobile using media queries; navigation and content remain user-friendly on all devices.
5. **Assets Organization**: Images and favicon files are stored in the `assets/` folder for easy management.
6. **Branch Workflow**: Development is done on a feature branch for best practices in version control.

---

**To run locally:**  
Open `index.html` in your browser, or use VS Code's Live Server for best results.  
All features work without a backend just static files!