# Gatehouse — Sidebar & Navigation Guide

This document explains every option available in Gatehouse's sidebar navigation, grouped exactly as they appear in the app, plus what each screen lets you do.

---

## Sidebar basics

- **Collapse / expand** — the button at the bottom of the sidebar shrinks it to icons-only (useful on smaller screens) or expands it back to show labels. Your place in the app is preserved either way.
- **Active section indicator** — the highlighted pill shows which section you're currently viewing.
- **Mobile** — on narrow screens the sidebar becomes a slide-out drawer, opened via the menu icon in the top bar and closed by tapping outside it.
- **Global search** — the search box in the top bar filters the records on whatever screen you're currently viewing (e.g. searching while on Tenants filters tenants; searching while on Units filters units).
- **Notification bell** — shows a live count of items that need attention (expiring leases, late rent, urgent maintenance). Clicking an alert jumps you straight to the relevant section with the right filter already applied.
- **Add button — context-aware, and only shown where it applies.** It changes label and action based on the section you're on, and disappears entirely on screens where "adding" doesn't make sense:

| Section | Button shown | Action |
|---|---|---|
| Dashboard | *(none)* | — |
| Properties | **Add property** | Opens the add-property form |
| Units | **Add unit** | Opens the add-unit form |
| Tenants | **Register tenant** | Opens tenant registration |
| Leases | *(none)* | Leases are created via tenant registration, and extended via the Renew action (see below) |
| Maintenance | **Add work order** | Logs a new maintenance request |
| Payments | **Record payment** | Marks an outstanding payment as paid |
| Reports | *(none)* | — |
| Settings | *(none)* | — |

---

## Overview

### Dashboard
Your portfolio at a glance.
- **KPI cards**: Occupancy rate, monthly rent roll, amount collected this cycle (with outstanding balance), and open work orders (with high-priority count).
- **Rent roll chart**: billed vs. collected over the last 6 months.
- **Needs attention panel**: live list of expiring leases, late-paying tenants, and urgent maintenance — click any item to jump to that record, pre-filtered.
- **Upcoming lease renewals**: leases ending within 60 days, soonest first.
- **Recent activity feed**: a rolling log of late/pending payments and newly reported maintenance issues.

---

## Leasing

### Properties
Your buildings/holdings.
- **Property cards** show address, type, year built, unit count, occupancy %, and total rent roll.
- **View units** (per card) expands an inline list of every unit in that property with its rent and status.
- **Add** (top bar) — opens a form to add a new property: name, address, type (Residential / Commercial / Mixed Use), and number of units.
- **Search** filters properties by name or address.

### Units
Every unit across every property.
- **Status filter chips**: All / Occupied / Vacant / Notice / In Repair.
- **Table columns**: unit number, property, layout (beds/baths or studio), square footage, rent, status, assigned tenant.
- **Register tenant** — appears only on vacant units; opens the tenant registration modal with that unit pre-selected.
- **Add unit** (top bar) — opens a form to add a new unit to an existing property: unit number, beds, baths, square footage, and rent. New units start as Vacant.
- **Search** filters by unit number or property name.

### Tenants
Everyone currently renting from you.
- **Table**: name, property/unit, contact info, rent, outstanding balance, account status (Current / Late / Notice / Moved Out).
- **Click any row** to open the tenant's detail drawer: contact info, lease terms, and full payment history.
  - If the tenant's lease is ending with notice, the drawer shows a **"Mark unit vacated"** button — this frees the unit back to Vacant, ends the lease, and marks the tenant as Moved Out.
- **Register tenant** (top-bar "Add" button, or the empty-state prompt when a search returns nothing) — see [Registering a tenant](#registering-a-tenant) below.
- **Search** filters by tenant name or property name.

### Leases
All lease agreements.
- **Status filter chips**: All / Active / Expiring Soon / Ending — Notice Given.
- **Table**: tenant, property/unit, lease term (start–end), rent, days remaining (color-coded: red ≤30 days, amber ≤60 days), status.
- **Renew 12mo** — appears on leases that are Expiring Soon or Ending; extends the lease by 12 months and resets its status to Active, immediately reflected in the dashboard's expiring-lease count.
- Rows are sorted soonest-to-expire first.
- **Search** filters by tenant or property name.

---

## Operations

### Maintenance
Work order tracking, kanban-style.
- **Priority filter chips**: All / Urgent / High / Medium / Low.
- **Three columns**: Open, In Progress, Completed.
- Each card shows the issue, category, assigned vendor/staff, and date reported.
- **Status dropdown** on each card — moving an item to a new column updates it everywhere else in the app (dashboard KPIs and alerts update immediately).
- **Add work order** (top bar) — logs a new request: unit, issue description, category, priority, and who it's assigned to. New requests start as Open.
- **Search** filters by issue title or category.

---

## Finance

### Payments
Rent collection for the current cycle.
- **Summary cards**: total collected, pending, and overdue.
- **Status filter chips**: All / Paid / Pending / Overdue.
- **Table**: tenant, property, billing period, payment method, date, amount, status.
- **Record payment** (top bar) — select any outstanding (Pending/Overdue) payment and a method to mark it Paid. This also clears the tenant's outstanding balance and resets their account status to Current.
- **Search** filters by tenant name.

### Reports
Portfolio performance and business intelligence at the property level.
- **KPI row**: portfolio-wide occupancy, collection rate, average rent per occupied unit, and number of properties tracked.
- **Auto-generated insights**: a rule-based summary that flags the lowest-occupancy property, the property with the weakest collection rate, the top revenue contributor, and an overall collection-rate call-out — no manual digging required.
- **Occupancy by property** — bar chart of occupancy % per building.
- **Monthly revenue by property** — bar chart of rent-roll contribution per building.
- **Portfolio summary table** — units, occupancy, rent roll, average rent, and collection rate side-by-side for every property.

---

## System

### Settings
Organization-level preferences.
- **Organization**: name and notifications email.
- **Alert preferences**: toggle lease renewal reminders, late payment alerts, and new maintenance request notifications.
- **Save changes** button commits the form (values are held in app state for the session).

---

## Registering a tenant

You can start tenant registration from three places:
1. **Top bar "Add" button** while on the Tenants screen (label changes to "Register tenant").
2. **"Register tenant"** button on any vacant unit's row in the Units screen (pre-selects that unit).
3. **Empty-state prompt** on the Tenants screen when a search returns no results.

The registration form asks for:
| Field | Notes |
|---|---|
| Unit | Dropdown of currently vacant units only, shown as *Property — №Unit (rent/mo)* |
| Full name | Required |
| Email | Required |
| Phone | Optional |
| Lease start | Date picker, defaults to the 1st of next month |
| Lease term | 6 / 12 / 24 months — automatically calculates the lease end date |
| Monthly rent | Pre-filled from the selected unit, editable |

On save, Gatehouse automatically:
- Marks the unit **Occupied**
- Creates the **tenant** record (status: Current)
- Creates the matching **lease** record (status: Active)
- Creates a **Pending** payment entry for the first billing cycle
- Navigates you to the Tenants screen so you can confirm the new record

All of this updates live — dashboard occupancy, rent roll, and unit counts reflect the new tenant immediately, with no page reload required.
