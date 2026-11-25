# Multi-Step Subscription Form (`multi-step-form-dom`)

A responsive 5-step subscription form built with **HTML5**, **Tailwind CSS**, and **vanilla JavaScript (ES6+)** DOM manipulation, powered by **Vite**. It adapts from a mobile top-stepper and floating card layout to a desktop two-column card with a vertical step sidebar and three-column plan grid.

---

## Features

- **Step 1 — Personal Info**: Validates Name, Email Address, and Phone Number inputs with inline error messages and error border highlights before advancing.
- **Step 2 — Select Your Plan**: Supports choosing between **Arcade**, **Advanced**, and **Pro** plans and toggling between **Monthly** (`/mo`) and **Yearly** (`/yr`) billing with `"2 months free"` indicators.
- **Step 3 — Pick Add-Ons**: Allows toggling optional add-ons (**Online service**, **Larger storage**, **Customizable profile**) with billing-cycle-aware pricing (`+$1/mo` vs. `+$10/yr`, `+$2/mo` vs. `+$20/yr`) and selected card highlighting.
- **Step 4 — Finishing Up**: Displays a live summary of the selected plan, billing cycle, chosen add-ons, and total cost, plus a **Change** action to jump back to plan selection.
- **Step 5 — Thank You**: Shows a confirmation view and hides the bottom navigation bar.
- **Responsive Mobile & Desktop Layouts**: Uses Tailwind responsive utilities (`md:`) for mobile and desktop viewports (`>= 768px`).

---

## Project Structure

```text
multi-step-form-dom/
├── images/
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── script.js
├── style.css
└── vite.config.js
```

---

## Tech Stack

- **Bundler / Dev Server**: Vite
- **Styling**: Tailwind CSS & custom styles (`style.css`)
- **Markup & Logic**: Semantic HTML5 (`index.html`) and vanilla JavaScript (`script.js`)

---

## Getting Started

### Prerequisites

- Node.js (v18+ or v22+ recommended) and npm

### Installation & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview the production build locally:
   ```bash
   npm run preview
   ```
