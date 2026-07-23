# Gatehouse — Property Management System

A full-featured property management dashboard built as a single React component: liquid-glass sidebar navigation, dashboard KPIs, properties, units, tenants, leases, maintenance kanban, payments (KSh), and reports.

## Contents
- `PropertyManagementSystem.jsx` — the complete app (React + Tailwind + lucide-react + recharts)

## Running it
This component is designed to drop into a React project that already has Tailwind CSS, `lucide-react`, and `recharts` configured (e.g. Vite or Next.js).

```bash
npm install lucide-react recharts
```

Then import and render the default export:

```jsx
import PropertyManagementSystem from "./PropertyManagementSystem.jsx";

export default function App() {
  return <PropertyManagementSystem />;
}
```

## Features
- Collapsible sidebar with grouped navigation and a liquid-glass animated background
- Dashboard with live KPIs, rent-roll trend chart, and a "needs attention" alert feed
- Properties, Units, Tenants (with detail drawer), Leases, Maintenance (kanban), Payments, Reports, Settings
- Currency formatted in Kenyan Shillings (KSh)
- Synthesized UI click sound on interactive elements
