# Gatehouse — Property Management System

A full-featured property management dashboard: liquid-glass sidebar navigation, dashboard KPIs, properties, units, tenants, leases, maintenance kanban, payments (KSh), and reports.

This is a ready-to-run **Vite + React + Tailwind** app.

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build   # outputs static files to dist/
npm start       # serves dist/ (respects $PORT, defaults to 3000)
```

## Deploying (Railway, etc.)
This repo has a `package.json` with `build` and `start` scripts, so platforms like Railway/Render/Nixpacks will detect it automatically:
1. `npm install`
2. `npm run build`
3. `npm start` (binds to `$PORT`)

No extra configuration is required.

## Structure
- `src/PropertyManagementSystem.jsx` — the app itself
- `src/main.jsx` — React entry point
- `src/index.css` — Tailwind directives
- `index.html`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js` — build tooling

## Features
- Collapsible sidebar with grouped navigation and a liquid-glass animated background
- Dashboard with live KPIs, rent-roll trend chart, and a "needs attention" alert feed
- Properties, Units, Tenants (with detail drawer), Leases, Maintenance (kanban), Payments, Reports, Settings
- Currency formatted in Kenyan Shillings (KSh)
- Synthesized UI click sound on interactive elements

