# SMS / Tenant Communication

Gatehouse includes a full SMS communication workflow under **Communication → Messages** in the sidebar, plus quick-send actions embedded in Payments and Leases.

## What's built

### Messages screen
- **Recipient picker** — searchable tenant list with checkboxes, plus quick-select shortcuts: *Select all*, *Select late tenants*, *Clear*. Tenants who've moved out are excluded automatically.
- **Templates** — Rent reminder, Overdue notice, Lease renewal, Maintenance update, Welcome message, or a blank Custom message. Selecting a template fills the compose box; you can still edit freely afterward.
- **Personalization tokens** — `{name}`, `{property}`, `{unit}`, and `{amount}` are replaced per-recipient at send time (`{amount}` uses the tenant's outstanding balance if they have one, otherwise their rent).
- **Live preview** — shows exactly what the first selected recipient will receive, tokens already substituted.
- **Character/segment counter** — standard 160-character-per-segment SMS math, so you can see cost/length before sending.
- **Message log** — every sent message is recorded with recipient, final text, segment count, timestamp, and delivery status.

### Quick-send actions elsewhere
- **Payments** — a "Send reminder" button on any Pending/Overdue row fires the Overdue notice template straight to that tenant, no need to leave the page.
- **Leases** — a "Notify" button on Expiring Soon / Ending leases fires the Lease renewal template to that tenant.

Both quick actions write to the same message log you see on the Messages screen, so it's a single source of truth for everything sent.

## Important: how sending actually works right now

This is a **frontend-only** app — there's no backend server. Real SMS delivery requires calling a paid SMS gateway (e.g. **Africa's Talking**, which is the most common choice for Kenya, or **Twilio**) using an API key that must stay on a server and never ship to the browser. Embedding that key in client-side JavaScript would expose it to anyone who opens dev tools, so Gatehouse does **not** do that.

Instead, the current build **simulates** sending: clicking "Send SMS" personalizes the message, logs it as "Delivered," and updates the UI immediately. This makes the entire workflow (recipient selection, templates, personalization, logging) fully usable and demoable today, and it's structured so wiring in real delivery later is a small, contained change.

## Wiring up real delivery

All sending funnels through one function in `src/PropertyManagementSystem.jsx`:

```js
const sendSms = (tenantIds, rawBody) => {
  // ...builds a personalized message per recipient, then logs it
};
```

To make it real:

1. **Add a backend route** (e.g. a small Express/Node service, a Vercel/Netlify function, or a Railway service alongside this app) — something like `POST /api/sms/send` that accepts `{ to, message }` and calls your SMS provider's API using a server-side API key from an environment variable.
2. **Get credentials** from your provider:
   - Africa's Talking: https://africastalking.com (username + API key, works well for Kenyan numbers)
   - Twilio: https://www.twilio.com (Account SID + Auth Token + a sending number)
3. **Replace the simulated part** of `sendSms` with a `fetch("/api/sms/send", { method: "POST", body: JSON.stringify({...}) })` call, and mark each log entry "Delivered" or "Failed" based on the real response instead of always "Delivered."
4. **Add tenant phone validation** — right now phone numbers in the seed data are placeholders; real numbers should be in E.164 format (e.g. `+2547XXXXXXXX`) for most gateways.
5. Keep the API key in your hosting platform's environment variables (Railway → Variables tab), never in the repo or the frontend bundle.

Everything else — recipient selection, templates, personalization, character counting, and the log — works as-is against that new backend call with no UI changes needed.
