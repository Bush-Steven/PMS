# Gatehouse — Property Management System

A full-featured property management dashboard: liquid-glass sidebar navigation, dashboard KPIs, properties, units, tenants (with registration), leases, maintenance kanban, payments (KSh), and reports.

This is a production-ready **Vite + React + Tailwind** app.

📘 **[Sidebar & Navigation Guide](./docs/SIDEBAR.md)** — full documentation of every sidebar section and its options.

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

## Production hardening included
- **Error boundary** (`src/main.jsx`) — a render error shows a recoverable "Reload" screen instead of a blank page.
- **Vendor chunk splitting** (`vite.config.js`) — React, Recharts, and lucide-react are bundled into separate cacheable chunks so the app shell stays small (~60 KB) and repeat visits load faster.
- **No arbitrary/uncompiled CSS classes** — all styling resolves to real, defined CSS so it renders correctly with or without a Tailwind JIT compiler.
- **State lifted to the app root** — units, tenants, leases, payments, and maintenance items are single-source-of-truth state, so every screen (dashboard KPIs, alerts, reports) stays in sync when data changes.

## Structure
- `src/PropertyManagementSystem.jsx` — the app itself
- `src/main.jsx` — React entry point + error boundary
- `src/index.css` — Tailwind directives
- `index.html`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js` — build tooling
- `docs/SIDEBAR.md` — full sidebar/navigation documentation

## Features
- Collapsible sidebar with grouped navigation and a liquid-glass animated background
- Dashboard with live KPIs, rent-roll trend chart, and a "needs attention" alert feed
- Properties, Units, Tenants (with full registration flow), Leases, Maintenance (kanban), Payments, Reports, Settings
- Currency formatted in Kenyan Shillings (KSh)
- Synthesized UI click sound on interactive elements


