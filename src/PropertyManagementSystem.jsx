import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LayoutDashboard, Building2, DoorOpen, Users, FileText, Wrench, Wallet,
  BarChart3, Settings, Search, Bell, Plus, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle2, Clock, TrendingUp, X, MapPin, Phone, Mail,
  Calendar, ChevronDown, Home, ArrowUpRight, ArrowDownRight, Filter,
  MoreHorizontal, Menu, MessageSquare, Send, CheckCheck, Sun, Moon, LayoutGrid
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

/* ============================= THEME ============================= */
const Theme = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

    :root{
      /* brand */
      --ink:#6C4EF6; --ink-2:#5B3FE0; --ink-3:#4A31C7;
      --blue:#4F8EF7; --blue-soft:#E9F0FE;
      /* surfaces */
      --paper:#F5F6FC; --card:#FFFFFF; --line:#EAEAF5;
      --text:#171A2B; --muted:#6B7094; --muted-2:#9498B8;
      /* brand aliases (kept for class-name compatibility across the app) */
      --brass:#6C4EF6; --brass-dark:#5B3FE0; --brass-soft:#EDE8FE;
      /* semantic */
      --green:#0FA968; --green-soft:#E4F9EE;
      --amber:#F2994A; --amber-soft:#FDECDA;
      --red:#EF4444; --red-soft:#FDEAEA;
    }
    .pms{ font-family:'Inter',sans-serif; color:var(--text); background:var(--paper); transition:background .25s ease, color .25s ease; }
    .pms *{ box-sizing:border-box; }
    .font-display{ font-family:'Inter',sans-serif; font-weight:800; letter-spacing:-0.01em; }
    .font-mono{ font-family:'IBM Plex Mono',monospace; }

    /* ---- dark theme overrides ---- */
    .pms[data-theme="dark"]{
      --paper:#12132B; --card:#1B1D3D; --line:#2C2E52;
      --text:#EEEFFB; --muted:#A2A5D0; --muted-2:#7A7DAE;
      --brass-soft:#332B6E; --green-soft:#123A2C; --amber-soft:#3A2A15; --red-soft:#3A1A1A; --blue-soft:#1E2A55;
    }
    .pms[data-theme="dark"] .btn-outline{ background:var(--card); color:var(--text); border-color:var(--line); }
    .pms[data-theme="dark"] .hover-bg-F7F7F9:hover, .pms[data-theme="dark"] .bg-FAFAFC, .pms[data-theme="dark"] .row-hover:hover{ background:#22244A; }
    .pms[data-theme="dark"] .input{ background:var(--card); color:var(--text); border-color:var(--line); }

    .sidebar{
      background: linear-gradient(190deg, #7C5CFA 0%, #6C4EF6 45%, #4F3FD9 100%);
      color:#F3F1FF; position:relative; overflow:hidden;
      backdrop-filter: blur(22px) saturate(170%);
      -webkit-backdrop-filter: blur(22px) saturate(170%);
      border-right: 1px solid rgba(255,255,255,0.10);
      box-shadow: 8px 0 40px rgba(76,49,199,0.25);
    }
    .glass-blob{ position:absolute; border-radius:9999px; filter:blur(46px); pointer-events:none; z-index:0; }
    .blob-a{ width:230px; height:230px; top:-70px; left:-70px; background:radial-gradient(circle, rgba(79,142,247,0.55), transparent 70%); animation: driftA 19s ease-in-out infinite; }
    .blob-b{ width:260px; height:260px; bottom:-90px; right:-100px; background:radial-gradient(circle, rgba(236,72,153,0.4), transparent 70%); animation: driftB 23s ease-in-out infinite; }
    .blob-c{ width:190px; height:190px; top:42%; left:-80px; background:radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%); animation: driftC 27s ease-in-out infinite; }
    @keyframes driftA{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(45px,65px) scale(1.18); } }
    @keyframes driftB{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(-35px,-55px) scale(1.12); } }
    @keyframes driftC{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(55px,-35px) scale(1.22); } }
    .glass-shine{
      position:absolute; inset:0; z-index:1; pointer-events:none; mix-blend-mode:screen;
      background:linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0.16) 46%, rgba(255,255,255,0.08) 54%, transparent 70%);
      background-size:240% 240%;
      animation: shineSweep 10s ease-in-out infinite;
    }
    @keyframes shineSweep{ 0%,100%{ background-position:-50% -50%; } 50%{ background-position:150% 150%; } }
    .sidebar-group-label{ color:rgba(255,255,255,0.55); letter-spacing:.08em; position:relative; z-index:2; }
    .nav-rail{ position:relative; z-index:2; }
    .nav-pill{
      position:absolute; top:0; left:8px; right:8px; border-radius:14px; z-index:1; pointer-events:none;
      background:rgba(255,255,255,0.16);
      border:1px solid rgba(255,255,255,0.28);
      box-shadow:0 6px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3);
      backdrop-filter: blur(6px);
      transition: transform .5s cubic-bezier(.34,1.56,.64,1), height .4s cubic-bezier(.34,1.56,.64,1), opacity .3s ease;
    }
    .nav-pill::before{ content:''; position:absolute; left:0; top:8px; bottom:8px; width:3px; background:#fff; border-radius:0 3px 3px 0; }
    .nav-item{
      color:rgba(255,255,255,0.8); position:relative; z-index:2;
      background-color:transparent; background-image:none;
      transition:background-color .2s ease, color .15s ease;
    }
    .nav-item:hover{
      color:#fff; background-color:rgba(255,255,255,0.06);
      background-image: radial-gradient(120px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.22), transparent 65%);
    }
    .nav-item.active{ color:#fff; font-weight:600; }
    .brand-mark{ background:linear-gradient(135deg,#8B6EFF,#5B3FE0); position:relative; z-index:2; box-shadow:0 2px 14px rgba(0,0,0,0.18); }

    .card{ background:var(--card); border:1px solid var(--line); border-radius:24px; box-shadow:0 1px 2px rgba(24,24,64,0.04), 0 8px 24px rgba(24,24,64,0.05); transition:background .25s ease, border-color .25s ease; }
    .glass-card{
      background: rgba(255,255,255,0.65); border:1px solid rgba(255,255,255,0.5); border-radius:24px;
      backdrop-filter: blur(18px) saturate(160%); -webkit-backdrop-filter: blur(18px) saturate(160%);
      box-shadow:0 8px 32px rgba(76,49,199,0.10);
    }
    .pms[data-theme="dark"] .glass-card{ background:rgba(27,29,61,0.65); border-color:rgba(255,255,255,0.08); }
    .topbar{ background:var(--card); border-bottom:1px solid var(--line); }
    .btn-brass{ background:linear-gradient(135deg,var(--ink),var(--ink-2)); color:#fff; box-shadow:0 6px 16px rgba(108,78,246,0.32); }
    .btn-brass:hover{ background:linear-gradient(135deg,var(--ink-2),var(--ink-3)); }
    .btn-outline{ border:1px solid var(--line); background:#fff; color:var(--text); }
    .btn-outline:hover{ background:#F7F7FD; }
    .input{ border:1px solid var(--line); background:#fff; border-radius:12px; }
    .input:focus{ outline:none; border-color:var(--ink); box-shadow:0 0 0 3px var(--brass-soft); }

    .badge{ font-size:11px; font-weight:600; padding:3px 9px; border-radius:99px; display:inline-flex; align-items:center; gap:5px; white-space:nowrap; }
    .badge-green{ background:var(--green-soft); color:var(--green); }
    .badge-amber{ background:var(--amber-soft); color:var(--amber); }
    .badge-red{ background:var(--red-soft); color:var(--red); }
    .badge-blue{ background:var(--blue-soft); color:var(--blue); }
    .badge-gray{ background:#EEF0F4; color:var(--muted); }
    .pms[data-theme="dark"] .badge-gray{ background:#2C2E52; color:var(--muted); }

    .row-hover:hover{ background:#FAFAFF; }
    .ledger-id{ color:var(--muted-2); font-family:'IBM Plex Mono',monospace; font-size:12px; }
    .divider{ border-color:var(--line); }
    table.pms-table th{ font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); font-weight:600; }
    ::-webkit-scrollbar{ width:9px; height:9px; }
    ::-webkit-scrollbar-thumb{ background:#D6D9E1; border-radius:8px; }
    ::-webkit-scrollbar-track{ background:transparent; }

    /* generated utility classes (replace arbitrary-value Tailwind classes) */
    .c-muted{ color:var(--muted); }
    .c-muted2{ color:var(--muted-2); }
    .c-9AA3C4{ color:#9AA3C4; }
    .c-7C87AE{ color:#7C87AE; }
    .bg-FAFAFC{ background:#FAFAFC; }
    .hover-bg-F7F7F9:hover{ background:#F7F7F9; }
    .hover-ink2:hover{ background:var(--ink-2); color:#fff; }
    .minh-80{ min-height:80px; }
    .modal-maxh{ max-height:90vh; }
    .scrim-40{ background:rgba(0,0,0,0.4); }
    .scrim-30{ background:rgba(0,0,0,0.3); }
    .icon-90{ opacity:.9; }
    .fs-9{ font-size:9px; } .fs-10{ font-size:10px; } .fs-105{ font-size:10.5px; }
    .fs-11{ font-size:11px; } .fs-115{ font-size:11.5px; } .fs-12{ font-size:12px; }
    .fs-125{ font-size:12.5px; } .fs-13{ font-size:13px; } .fs-135{ font-size:13.5px; }
    .fs-14{ font-size:14px; } .fs-15{ font-size:15px; } .fs-155{ font-size:15.5px; }
    .fs-16{ font-size:16px; } .fs-17{ font-size:17px; } .fs-18{ font-size:18px; }
    .fs-20{ font-size:20px; } .fs-26{ font-size:26px; }
  `}</style>
);

/* ============================= DATA ============================= */
const TODAY = new Date("2026-07-23");

const properties = [
  { id: "p1", name: "Cedar Point Residences", address: "482 Cedar Point Rd, Austin, TX", type: "Residential", built: 2016, units: 6 },
  { id: "p2", name: "Harborview Flats", address: "19 Harbor St, Boston, MA", type: "Residential", built: 2009, units: 4 },
  { id: "p3", name: "Maple & Main Lofts", address: "220 Main St, Columbus, OH", type: "Mixed Use", built: 2020, units: 5 },
  { id: "p4", name: "Riverside Commons", address: "77 Riverside Dr, Portland, OR", type: "Residential", built: 2012, units: 5 },
  { id: "p5", name: "The Alder Building", address: "340 Alder Ave, Seattle, WA", type: "Commercial", built: 2005, units: 3 },
  { id: "p6", name: "Sunview Terrace", address: "12 Sunview Ct, Phoenix, AZ", type: "Residential", built: 2018, units: 4 },
  { id: "p7", name: "Birchwood Court", address: "88 Birchwood Ln, Denver, CO", type: "Residential", built: 2014, units: 3 },
];

const tenantNames = [
  "Maria Gonzalez","James Whitfield","Aisha Bello","Tom Kessler","Priya Nair","Daniel Ochieng",
  "Laura Bianchi","Kevin O'Brien","Grace Muthoni","Ben Sutherland","Nadia Farouk","Chris Palladino",
  "Emily Nakamura","Samuel Otieno","Rachel Kim","Victor Adeyemi","Sofia Torres","Andrew Lindqvist",
  "Wanjiru Kamau","Michael Costa","Fatima Haidari","Owen Fitzgerald","Linda Achieng","Noah Bergstrom"
];

// [propertyId, unitNumber, beds, baths, sqft, rent, status]
const rawUnits = [
  ["p1","101",2,1,850,145000,"occupied"],["p1","102",1,1,620,120000,"occupied"],
  ["p1","103",2,2,980,165000,"occupied"],["p1","104",1,1,620,120000,"vacant"],
  ["p1","105",2,1,850,147500,"occupied"],["p1","106",3,2,1150,190000,"notice"],
  ["p2","201",1,1,700,155000,"occupied"],["p2","202",2,1,900,180000,"occupied"],
  ["p2","203",1,1,700,155000,"occupied"],["p2","204",2,2,1020,195000,"occupied"],
  ["p3","301",1,1,760,170000,"occupied"],["p3","302",2,2,1100,220000,"occupied"],
  ["p3","303",1,1,760,170000,"vacant"],["p3","304",2,1,940,190000,"occupied"],
  ["p3","305",3,2,1300,265000,"occupied"],
  ["p4","401",2,1,880,150000,"occupied"],["p4","402",1,1,640,125000,"occupied"],
  ["p4","403",2,2,1000,170000,"occupied"],["p4","404",1,1,640,125000,"maintenance"],
  ["p4","405",2,1,880,152500,"occupied"],
  ["p5","501",0,1,1200,280000,"occupied"],["p5","502",0,1,1400,310000,"occupied"],
  ["p5","503",0,1,1100,260000,"vacant"],
  ["p6","601",2,2,950,165000,"occupied"],["p6","602",1,1,700,135000,"occupied"],
  ["p6","603",2,2,950,165000,"notice"],["p6","604",3,2,1200,197500,"occupied"],
  ["p7","701",2,1,860,140000,"occupied"],["p7","702",1,1,650,115000,"occupied"],
  ["p7","703",2,1,860,142500,"occupied"],
];

let tIdx = 0;
const tenants = [];
const leases = [];
const units = rawUnits.map((u, i) => {
  const [propertyId, unitNumber, beds, baths, sqft, rent, status] = u;
  const id = `u${i + 1}`;
  let tenantId = null, leaseId = null;
  if (status === "occupied" || status === "notice") {
    const name = tenantNames[tIdx % tenantNames.length];
    tIdx++;
    tenantId = `t${tenants.length + 1}`;
    const emailName = name.toLowerCase().replace(/[^a-z ]/g, "").replace(/ /g, ".");
    // vary lease end dates: a few expiring soon, a couple late, rest healthy
    let endDate, leaseStatus = "Active", tenantStatus = "Current", balance = 0;
    const bucket = tenants.length % 9;
    if (bucket === 0) { endDate = "2026-08-10"; leaseStatus = "Expiring Soon"; }
    else if (bucket === 1) { endDate = "2026-08-28"; leaseStatus = "Expiring Soon"; }
    else if (bucket === 2) { endDate = "2026-09-05"; leaseStatus = "Expiring Soon"; }
    else if (bucket === 3) { endDate = "2027-03-01"; }
    else if (bucket === 4) { endDate = "2027-05-15"; }
    else { endDate = "2027-01-31"; }
    if (status === "notice") { leaseStatus = "Ending — Notice Given"; endDate = "2026-08-15"; }
    if (bucket === 5) { tenantStatus = "Late"; balance = rent; }
    if (bucket === 6) { tenantStatus = "Late"; balance = Math.round(rent * 0.5); }

    leaseId = `l${leases.length + 1}`;
    leases.push({
      id: leaseId, tenantId, unitId: id, propertyId,
      start: "2025-09-01", end: endDate, rent, status: leaseStatus
    });
    tenants.push({
      id: tenantId, name, email: `${emailName}@mailbox.com`,
      phone: `(512) 555-${String(1000 + tenants.length * 7).slice(-4)}`,
      unitId: id, leaseId, propertyId, rent, status: tenantStatus, balance
    });
  }
  return { id, propertyId, unitNumber, beds, baths, sqft, rent, status, tenantId, leaseId };
});

const maintenance = [
  { id: "m1", unitId: "u6", category: "Plumbing", title: "Leaking kitchen faucet", priority: "Medium", status: "Open", created: "2026-07-18", assigned: "Marcus (In-house)" },
  { id: "m2", unitId: "u19", category: "HVAC", title: "AC not cooling below 78°F", priority: "Urgent", status: "In Progress", created: "2026-07-20", assigned: "CoolAir Services" },
  { id: "m3", unitId: "u2", category: "Electrical", title: "Flickering hallway light", priority: "Low", status: "Open", created: "2026-07-15", assigned: "Unassigned" },
  { id: "m4", unitId: "u12", category: "Appliance", title: "Dishwasher won't drain", priority: "Medium", status: "In Progress", created: "2026-07-19", assigned: "Marcus (In-house)" },
  { id: "m5", unitId: "u26", category: "Pest Control", title: "Ants near patio door", priority: "Low", status: "Completed", created: "2026-07-10", assigned: "GreenShield Pest" },
  { id: "m6", unitId: "u16", category: "Structural", title: "Cracked window seal", priority: "High", status: "Open", created: "2026-07-21", assigned: "Unassigned" },
  { id: "m7", unitId: "u9", category: "Plumbing", title: "Slow bathroom drain", priority: "Low", status: "Completed", created: "2026-07-08", assigned: "Marcus (In-house)" },
  { id: "m8", unitId: "u21", category: "General", title: "Suite entry door sticking", priority: "Medium", status: "Open", created: "2026-07-22", assigned: "Unassigned" },
  { id: "m9", unitId: "u28", category: "Electrical", title: "Outlet not working in bedroom", priority: "High", status: "In Progress", created: "2026-07-17", assigned: "Volt Electric Co." },
  { id: "m10", unitId: "u3", category: "HVAC", title: "Furnace filter replacement due", priority: "Low", status: "Completed", created: "2026-07-05", assigned: "Marcus (In-house)" },
  { id: "m11", unitId: "u24", category: "Appliance", title: "Fridge making loud noise", priority: "Medium", status: "Open", created: "2026-07-21", assigned: "Unassigned" },
  { id: "m12", unitId: "u14", category: "Plumbing", title: "Water heater pilot light out", priority: "Urgent", status: "Open", created: "2026-07-22", assigned: "Unassigned" },
];

// payments: current-cycle transactions for every tenant
const payments = tenants.map((t, i) => {
  let status = "Paid", date = "2026-07-01";
  if (t.status === "Late" && t.balance === t.rent) { status = "Overdue"; date = "—"; }
  else if (t.status === "Late") { status = "Pending"; date = "2026-07-26"; }
  return {
    id: `pay${i + 1}`, tenantId: t.id, amount: t.rent, forMonth: "July 2026",
    method: ["ACH Transfer","Card","Check","ACH Transfer"][i % 4], status, date
  };
});

const rentRollTrend = [
  { month: "Feb", billed: 4620000, collected: 4510000 },
  { month: "Mar", billed: 4690000, collected: 4690000 },
  { month: "Apr", billed: 4765000, collected: 4630000 },
  { month: "May", billed: 4820000, collected: 4795000 },
  { month: "Jun", billed: 4910000, collected: 4780000 },
  { month: "Jul", billed: 4985000, collected: 4465000 },
];

/* ============================= SMS ============================= */
const SMS_TEMPLATES = [
  { id: "reminder", label: "Rent reminder", body: "Hi {name}, this is a reminder that your rent of {amount} for {property} #{unit} is due. Please make payment at your earliest convenience. - Gatehouse" },
  { id: "overdue", label: "Overdue notice", body: "Hi {name}, your rent payment of {amount} for {property} #{unit} is now overdue. Kindly settle this as soon as possible to avoid further action. - Gatehouse" },
  { id: "renewal", label: "Lease renewal", body: "Hi {name}, your lease for {property} #{unit} is ending soon. Please contact us to discuss renewal options. - Gatehouse" },
  { id: "maintenance", label: "Maintenance update", body: "Hi {name}, we wanted to update you on your maintenance request for {property} #{unit}. Our team will be in touch shortly. - Gatehouse" },
  { id: "welcome", label: "Welcome message", body: "Hi {name}, welcome to {property} #{unit}! We're glad to have you. Reach out anytime if you need anything. - Gatehouse" },
  { id: "custom", label: "Custom message", body: "" },
];

function personalizeSms(body, tenant, unit, property) {
  return body
    .split("{name}").join(tenant.name)
    .split("{amount}").join(fmtMoney(tenant.balance > 0 ? tenant.balance : tenant.rent))
    .split("{property}").join(property ? property.name : "")
    .split("{unit}").join(unit ? unit.unitNumber : "");
}

const initialMessages = [
  { id: "sms1", tenantId: "t3", body: "Hi Aisha Bello, this is a reminder that your rent of KSh 122,500 for Cedar Point Residences #103 is due. Please make payment at your earliest convenience. - Gatehouse", segments: 1, sentAt: "2026-07-20 09:14", status: "Delivered" },
  { id: "sms2", tenantId: "t9", body: "Hi Grace Muthoni, welcome to Maple & Main Lofts #303! We're glad to have you. Reach out anytime if you need anything. - Gatehouse", segments: 1, sentAt: "2026-07-15 11:02", status: "Delivered" },
];

/* ============================= LOGO =============================
   Custom mark for "Gatehouse": an arched gateway with portcullis bars
   and a keystone at the apex — a gate that watches over what's inside,
   echoing the ledger/deed motif used across the product.            */
function GateLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 17.5V12A7 7 0 0 1 19 12v5.5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="8.5" y1="9.4" x2="8.5" y2="17.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
      <line x1="12" y1="7.8" x2="12" y2="17.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
      <line x1="15.5" y1="9.4" x2="15.5" y2="17.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
      <rect x="10.75" y="3.75" width="2.5" height="2.5" transform="rotate(45 12 5)" fill="#fff" />
      <line x1="4" y1="17.5" x2="20" y2="17.5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/* ============================= HELPERS ============================= */
/* ---- UI click sound: a short, crisp synthesized tick (no audio file needed) ---- */
let _pmsAudioCtx = null;
function playClickSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!_pmsAudioCtx) _pmsAudioCtx = new Ctx();
    if (_pmsAudioCtx.state === "suspended") _pmsAudioCtx.resume();
    const ctx = _pmsAudioCtx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.045);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.09);

    // a touch of high-frequency "tick" texture for a tactile feel
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.type = "square";
    click.frequency.setValueAtTime(2600, now);
    clickGain.gain.setValueAtTime(0.05, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
    click.connect(clickGain); clickGain.connect(ctx.destination);
    click.start(now); click.stop(now + 0.02);
  } catch (e) { /* audio not available — fail silently */ }
}
function useClickSound() {
  useEffect(() => {
    const handler = (e) => {
      const el = e.target.closest('button, [role="button"], .cursor-pointer, a, select');
      if (el) playClickSound();
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);
}

const fmtMoney = (n) => "KSh " + Math.round(n).toLocaleString("en-US");
const fmtDate = (d) => d === "—" ? "—" : new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const daysUntil = (d) => Math.round((new Date(d) - TODAY) / 86400000);
const byId = (arr) => Object.fromEntries(arr.map(x => [x.id, x]));

function StatusBadge({ status }) {
  const map = {
    occupied: ["badge-green", CheckCircle2, "Occupied"],
    vacant: ["badge-gray", Clock, "Vacant"],
    notice: ["badge-amber", AlertTriangle, "Notice"],
    maintenance: ["badge-red", Wrench, "In Repair"],
    Current: ["badge-green", CheckCircle2, "Current"],
    Late: ["badge-red", AlertTriangle, "Late"],
    Notice: ["badge-amber", AlertTriangle, "Notice"],
    Active: ["badge-green", CheckCircle2, "Active"],
    "Expiring Soon": ["badge-amber", AlertTriangle, "Expiring Soon"],
    "Ending — Notice Given": ["badge-amber", AlertTriangle, "Ending Soon"],
    Open: ["badge-red", AlertTriangle, "Open"],
    "In Progress": ["badge-blue", Clock, "In Progress"],
    Completed: ["badge-green", CheckCircle2, "Completed"],
    Paid: ["badge-green", CheckCircle2, "Paid"],
    Pending: ["badge-amber", Clock, "Pending"],
    Overdue: ["badge-red", AlertTriangle, "Overdue"],
    Urgent: ["badge-red", AlertTriangle, "Urgent"],
    High: ["badge-amber", AlertTriangle, "High"],
    Medium: ["badge-blue", Clock, "Medium"],
    Low: ["badge-gray", Clock, "Low"],
    "Moved Out": ["badge-gray", CheckCircle2, "Moved Out"],
    Delivered: ["badge-green", CheckCheck, "Delivered"],
    Failed: ["badge-red", AlertTriangle, "Failed"],
    Ended: ["badge-gray", CheckCircle2, "Ended"],
  };
  const [cls, Icon, label] = map[status] || ["badge-gray", Clock, status];
  return <span className={`badge ${cls}`}><Icon size={11} strokeWidth={2.5} />{label}</span>;
}

/* ============================= NAV ============================= */
const NAV = [
  { group: "Overview", items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }] },
  { group: "Leasing", items: [
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "units", label: "Units", icon: DoorOpen },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "leases", label: "Leases", icon: FileText },
  ]},
  { group: "Operations", items: [{ id: "maintenance", label: "Maintenance", icon: Wrench }] },
  { group: "Finance", items: [
    { id: "payments", label: "Payments", icon: Wallet },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ]},
  { group: "Communication", items: [{ id: "messages", label: "Messages", icon: MessageSquare }] },
  { group: "System", items: [{ id: "settings", label: "Settings", icon: Settings }] },
];

const SECTION_META = {
  dashboard: { title: "Dashboard", sub: "Portfolio overview & today's priorities" },
  properties: { title: "Properties", sub: "Buildings and holdings across your portfolio" },
  units: { title: "Units", sub: "Every unit, its status, and its assignment" },
  tenants: { title: "Tenants", sub: "Residents and their account standing" },
  leases: { title: "Leases", sub: "Agreements, renewals, and expirations" },
  maintenance: { title: "Maintenance", sub: "Work orders across the portfolio" },
  payments: { title: "Payments", sub: "Rent collection for the current cycle" },
  reports: { title: "Reports", sub: "Performance across properties" },
  messages: { title: "Messages", sub: "SMS communication with tenants" },
  settings: { title: "Settings", sub: "Organization preferences" },
};

/* ============================= APP ============================= */
export default function PropertyManagementSystem() {
  useClickSound();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [section, setSection] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [pendingFilter, setPendingFilter] = useState(null);
  const [drawerTenant, setDrawerTenant] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [addOpen, setAddOpen] = useState(false);
  const [localProperties, setLocalProperties] = useState(properties);
  const [unitsState, setUnitsState] = useState(units);
  const [tenantsState, setTenantsState] = useState(tenants);
  const [leasesState, setLeasesState] = useState(leases);
  const [paymentsState, setPaymentsState] = useState(payments);
  const [maintenanceItems, setMaintenanceItems] = useState(maintenance);
  const [messagesState, setMessagesState] = useState(initialMessages);
  const [addTenantOpen, setAddTenantOpen] = useState(false);
  const [presetUnitId, setPresetUnitId] = useState(null);
  const [addUnitOpen, setAddUnitOpen] = useState(false);
  const [addWorkOrderOpen, setAddWorkOrderOpen] = useState(false);
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false);
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ top: 0, height: 0, opacity: 0 });

  const propertyMap = useMemo(() => byId(localProperties), [localProperties]);
  const unitMap = useMemo(() => byId(unitsState), [unitsState]);
  const tenantMap = useMemo(() => byId(tenantsState), [tenantsState]);

  const goTo = (sec, filter = null) => {
    setSection(sec); setQuery(""); setPendingFilter(filter); setMobileOpen(false);
  };

  const registerTenant = ({ unitId, name, email, phone, rent, leaseStart, leaseEnd }) => {
    const unit = unitsState.find(u => u.id === unitId);
    if (!unit) return;
    const tenantId = `t${Date.now()}`;
    const leaseId = `l${Date.now() + 1}`;
    const propertyId = unit.propertyId;
    setUnitsState(list => list.map(u => u.id === unitId ? { ...u, status: "occupied", tenantId, leaseId } : u));
    setTenantsState(list => [...list, { id: tenantId, name, email, phone, unitId, leaseId, propertyId, rent, status: "Current", balance: 0 }]);
    setLeasesState(list => [...list, { id: leaseId, tenantId, unitId, propertyId, start: leaseStart, end: leaseEnd, rent, status: "Active" }]);
    setPaymentsState(list => [...list, { id: `pay${Date.now()}`, tenantId, amount: rent, forMonth: "August 2026", method: "ACH Transfer", status: "Pending", date: "2026-08-01" }]);
    setAddTenantOpen(false);
    setPresetUnitId(null);
    goTo("tenants");
  };

  const addUnit = ({ propertyId, unitNumber, beds, baths, sqft, rent }) => {
    const id = `u${Date.now()}`;
    setUnitsState(list => [...list, { id, propertyId, unitNumber, beds, baths, sqft, rent, status: "vacant", tenantId: null, leaseId: null }]);
    setAddUnitOpen(false);
    goTo("units");
  };

  const addWorkOrder = ({ unitId, title, category, priority, assigned }) => {
    const id = `m${Date.now()}`;
    setMaintenanceItems(list => [...list, { id, unitId, title, category, priority, status: "Open", created: "2026-07-24", assigned: assigned || "Unassigned" }]);
    setAddWorkOrderOpen(false);
  };

  const recordPayment = ({ paymentId, method }) => {
    const pay = paymentsState.find(p => p.id === paymentId);
    if (!pay) return;
    setPaymentsState(list => list.map(p => p.id === paymentId ? { ...p, status: "Paid", method, date: "2026-07-24" } : p));
    setTenantsState(list => list.map(t => t.id === pay.tenantId ? { ...t, status: "Current", balance: 0 } : t));
    setRecordPaymentOpen(false);
  };

  const renewLease = (leaseId, termMonths) => {
    setLeasesState(list => list.map(l => {
      if (l.id !== leaseId) return l;
      const base = daysUntil(l.end) > 0 ? l.end : "2026-07-24";
      return { ...l, end: addMonths(base, termMonths), status: "Active" };
    }));
  };

  const vacateTenant = (tenantId) => {
    const tenant = tenantsState.find(t => t.id === tenantId);
    if (!tenant) return;
    setUnitsState(list => list.map(u => u.id === tenant.unitId ? { ...u, status: "vacant", tenantId: null, leaseId: null } : u));
    setLeasesState(list => list.map(l => l.id === tenant.leaseId ? { ...l, status: "Ended" } : l));
    setTenantsState(list => list.map(t => t.id === tenantId ? { ...t, status: "Moved Out" } : t));
    setDrawerTenant(null);
    goTo("units");
  };

  // Sends a personalized SMS to each selected tenant and logs it. In this demo build the
  // "send" is simulated client-side; a production deployment would POST to a backend route
  // (e.g. /api/sms/send) that calls a gateway like Africa's Talking or Twilio using a
  // server-held API key — see docs/SMS.md for the wiring.
  const sendSms = (tenantIds, rawBody) => {
    const entries = tenantIds.map((tenantId, i) => {
      const tenant = tenantMap[tenantId];
      const unit = tenant ? unitMap[tenant.unitId] : null;
      const property = tenant ? propertyMap[tenant.propertyId] : null;
      const body = personalizeSms(rawBody, tenant, unit, property);
      return {
        id: `sms${Date.now()}_${i}`,
        tenantId,
        body,
        segments: Math.max(1, Math.ceil(body.length / 160)),
        sentAt: "2026-07-24 " + new Date().toTimeString().slice(0, 5),
        status: "Delivered",
      };
    });
    setMessagesState(list => [...entries.reverse(), ...list]);
    return entries.length;
  };

  useEffect(() => {
    const measure = () => {
      const el = itemRefs.current[section];
      const nav = navRef.current;
      if (el && nav) {
        const navRect = nav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setPillStyle({ top: elRect.top - navRect.top, height: elRect.height, opacity: 1 });
      }
    };
    measure();
    const t = setTimeout(measure, 220); // re-measure once the collapse/expand transition settles
    return () => clearTimeout(t);
  }, [section, collapsed, mobileOpen]);

  const handleNavGlow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const addActions = {
    properties: { label: "Add property", onClick: () => setAddOpen(true) },
    units: { label: "Add unit", onClick: () => setAddUnitOpen(true) },
    tenants: { label: "Register tenant", onClick: () => setAddTenantOpen(true) },
    maintenance: { label: "Add work order", onClick: () => setAddWorkOrderOpen(true) },
    payments: { label: "Record payment", onClick: () => setRecordPaymentOpen(true) },
  };
  const addAction = addActions[section] || null;

  const quickAddItems = [
    { label: "Add property", icon: Building2, onClick: () => { setAddOpen(true); setQuickAddOpen(false); } },
    { label: "Register tenant", icon: Users, onClick: () => { setAddTenantOpen(true); setQuickAddOpen(false); } },
    { label: "Add unit", icon: DoorOpen, onClick: () => { setAddUnitOpen(true); setQuickAddOpen(false); } },
    { label: "Record payment", icon: Wallet, onClick: () => { setRecordPaymentOpen(true); setQuickAddOpen(false); } },
    { label: "Assign maintenance", icon: Wrench, onClick: () => { setAddWorkOrderOpen(true); setQuickAddOpen(false); } },
    { label: "Go to Reports", icon: BarChart3, onClick: () => { goTo("reports"); setQuickAddOpen(false); } },
  ];

  const kpis = useMemo(() => {
    const occupied = unitsState.filter(u => u.status === "occupied" || u.status === "notice").length;
    const total = unitsState.length;
    const rentRoll = unitsState.filter(u => u.tenantId).reduce((s, u) => s + u.rent, 0);
    const collected = paymentsState.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
    const outstanding = paymentsState.filter(p => p.status !== "Paid").reduce((s, p) => s + p.amount, 0);
    const urgentMaint = maintenanceItems.filter(m => m.status !== "Completed" && (m.priority === "Urgent" || m.priority === "High")).length;
    const openMaint = maintenanceItems.filter(m => m.status !== "Completed").length;
    const expiringLeases = leasesState.filter(l => daysUntil(l.end) <= 60 && daysUntil(l.end) >= 0).length;
    return { occupied, total, occRate: Math.round((occupied / total) * 100), rentRoll, collected, outstanding, urgentMaint, openMaint, expiringLeases };
  }, [unitsState, paymentsState, leasesState, maintenanceItems]);

  const alerts = useMemo(() => {
    const list = [];
    leasesState.filter(l => daysUntil(l.end) <= 60 && daysUntil(l.end) >= 0)
      .sort((a, b) => daysUntil(a.end) - daysUntil(b.end))
      .forEach(l => {
        const t = tenantMap[l.tenantId], u = unitMap[l.unitId], p = propertyMap[l.propertyId];
        list.push({ type: "lease", severity: daysUntil(l.end) <= 14 ? "red" : "amber",
          text: `${t.name}'s lease at ${p.name} #${u.unitNumber} ends in ${daysUntil(l.end)} days`,
          go: () => goTo("leases", { status: "Expiring Soon" }) });
      });
    tenantsState.filter(t => t.status === "Late").forEach(t => {
      const p = propertyMap[t.propertyId], u = unitMap[t.unitId];
      list.push({ type: "payment", severity: "red",
        text: `${t.name} (${p.name} #${u.unitNumber}) is late on rent — ${fmtMoney(t.balance)} outstanding`,
        go: () => goTo("payments", { status: "Overdue" }) });
    });
    maintenanceItems.filter(m => m.status !== "Completed" && m.priority === "Urgent").forEach(m => {
      const u = unitMap[m.unitId], p = propertyMap[u.propertyId];
      list.push({ type: "maintenance", severity: "red",
        text: `Urgent: "${m.title}" at ${p.name} #${u.unitNumber}`,
        go: () => goTo("maintenance", { priority: "Urgent" }) });
    });
    return list;
  }, [maintenanceItems, leasesState, tenantsState, tenantMap, unitMap, propertyMap]);

  return (
    <div className="pms flex h-full w-full" data-theme={theme} style={{ minHeight: "640px" }}>
      <Theme />

      {/* ============ SIDEBAR ============ */}
      <aside
        className={`sidebar flex flex-col shrink-0 transition-all duration-200 ${mobileOpen ? "fixed inset-y-0 left-0 z-40" : "hidden md:flex"}`}
        style={{ width: collapsed ? 72 : 240 }}
      >
        <div className="glass-blob blob-a" /><div className="glass-blob blob-b" /><div className="glass-blob blob-c" /><div className="glass-shine" />
        <div className="flex items-center gap-3 px-4 h-16 shrink-0 relative z-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="brand-mark w-8 h-8 rounded-md flex items-center justify-center shrink-0">
            <GateLogo />
          </div>
          {!collapsed && <div className="leading-tight">
            <div className="font-display font-semibold fs-15 text-white">Gatehouse</div>
            <div className="fs-11 c-7C87AE">Property Operations</div>
          </div>}
          <button onClick={() => setMobileOpen(false)} className="md:hidden ml-auto c-9AA3C4"><X size={18} /></button>
        </div>

        <nav ref={navRef} className="nav-rail relative flex-1 overflow-y-auto py-3 px-2">
          <div className="nav-pill" style={{ transform: `translateY(${pillStyle.top}px)`, height: pillStyle.height, opacity: pillStyle.opacity }} />
          {NAV.map(group => (
            <div key={group.group} className="mb-4">
              {!collapsed && <div className="sidebar-group-label fs-10 font-semibold uppercase px-3 mb-1.5">{group.group}</div>}
              {group.items.map(item => {
                const Icon = item.icon;
                const active = section === item.id;
                return (
                  <button
                    key={item.id}
                    ref={el => (itemRefs.current[item.id] = el)}
                    onClick={() => goTo(item.id)}
                    onMouseMove={handleNavGlow}
                    title={collapsed ? item.label : undefined}
                    className={`nav-item w-full flex items-center gap-3 px-3 py-2 rounded-lg fs-135 font-medium mb-0.5 ${active ? "active" : ""}`}
                  >
                    <Icon size={17} strokeWidth={2} className="shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => setCollapsed(c => !c)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg c-9AA3C4 hover-ink2 fs-13">
            {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
          </button>
        </div>
      </aside>
      {mobileOpen && <div className="fixed inset-0 scrim-40 z-30 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* ============ MAIN ============ */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="topbar h-16 shrink-0 flex items-center gap-3 px-4 md:px-6">
          <button className="md:hidden c-muted" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <div className="hidden md:block">
            <div className="font-display font-semibold fs-18">{SECTION_META[section].title}</div>
          </div>
          <div className="flex-1 max-w-md ml-2 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 c-muted2" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${section === "dashboard" ? "the portfolio" : section}…`}
              className="input w-full rounded-lg pl-9 pr-3 py-2 fs-135 rounded-lg"
            />
          </div>
          <div className="ml-auto flex items-center gap-2 relative">
            {addAction && (
              <button onClick={addAction.onClick} className="btn-brass rounded-lg px-3 py-2 fs-13 font-semibold flex items-center gap-1.5">
                <Plus size={15} /> <span className="hidden sm:inline">{addAction.label}</span>
              </button>
            )}
            <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")} className="btn-outline rounded-lg p-2" title="Toggle theme">
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button onClick={() => setQuickAddOpen(o => !o)} className="btn-outline rounded-full p-2" title="Quick add" style={{ borderColor: "var(--ink)" }}>
              <Plus size={16} style={{ color: "var(--ink)" }} />
            </button>
            {quickAddOpen && (
              <div className="card absolute right-0 top-12 w-56 shadow-xl z-20 p-2">
                <div className="px-2 py-1.5 fs-12 font-semibold c-muted uppercase tracking-wide">Quick add</div>
                {quickAddItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button key={i} onClick={item.onClick} className="w-full text-left px-2 py-2 rounded-lg hover-bg-F7F7F9 flex items-center gap-2.5 fs-13">
                      <Icon size={15} style={{ color: "var(--ink)" }} /> {item.label}
                    </button>
                  );
                })}
              </div>
            )}
            <button onClick={() => setNotifOpen(o => !o)} className="btn-outline rounded-lg p-2 relative">
              <Bell size={16} />
              {alerts.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full fs-9 font-bold flex items-center justify-center text-white" style={{ background: "var(--red)" }}>{alerts.length}</span>}
            </button>
            {notifOpen && (
              <div className="card absolute right-0 top-12 w-80 shadow-xl z-20 p-2 max-h-96 overflow-y-auto">
                <div className="px-2 py-1.5 fs-12 font-semibold c-muted uppercase tracking-wide">Needs attention</div>
                {alerts.length === 0 && <div className="px-2 py-3 fs-13 c-muted">All clear. Nothing needs attention.</div>}
                {alerts.map((a, i) => (
                  <button key={i} onClick={() => { a.go(); setNotifOpen(false); }} className="w-full text-left px-2 py-2 rounded-lg hover-bg-F7F7F9 flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: a.severity === "red" ? "var(--red)" : "var(--amber)" }} />
                    <span className="fs-125 leading-snug">{a.text}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="w-9 h-9 rounded-full font-display font-semibold flex items-center justify-center text-white shrink-0" style={{ background: "linear-gradient(135deg,var(--ink),var(--blue))" }}>JM</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-5 md:hidden">
            <div className="font-display font-semibold fs-20">{SECTION_META[section].title}</div>
            <div className="fs-13 c-muted">{SECTION_META[section].sub}</div>
          </div>
          <div className="hidden md:block mb-5 -mt-2">
            <div className="fs-13 c-muted">{SECTION_META[section].sub}</div>
          </div>

          {section === "dashboard" && <Dashboard kpis={kpis} alerts={alerts} goTo={goTo} query={query} maintenanceItems={maintenanceItems} leases={leasesState} payments={paymentsState} tenantMap={tenantMap} unitMap={unitMap} propertyMap={propertyMap} units={unitsState} tenants={tenantsState} properties={localProperties} onRenew={renewLease} quickAddItems={quickAddItems} />}
          {section === "properties" && <PropertiesView query={query} localProperties={localProperties} goTo={goTo} units={unitsState} />}
          {section === "units" && <UnitsView query={query} pendingFilter={pendingFilter} units={unitsState} propertyMap={propertyMap} tenantMap={tenantMap} onRegisterTenant={(unitId) => { setPresetUnitId(unitId); setAddTenantOpen(true); }} />}
          {section === "tenants" && <TenantsView query={query} onOpen={setDrawerTenant} tenants={tenantsState} propertyMap={propertyMap} unitMap={unitMap} onRegister={() => setAddTenantOpen(true)} />}
          {section === "leases" && <LeasesView query={query} pendingFilter={pendingFilter} leases={leasesState} tenantMap={tenantMap} unitMap={unitMap} propertyMap={propertyMap} onRenew={renewLease} onNotify={sendSms} />}
          {section === "maintenance" && <MaintenanceView query={query} pendingFilter={pendingFilter} items={maintenanceItems} setItems={setMaintenanceItems} unitMap={unitMap} propertyMap={propertyMap} />}
          {section === "payments" && <PaymentsView query={query} pendingFilter={pendingFilter} payments={paymentsState} tenantMap={tenantMap} propertyMap={propertyMap} onRemind={sendSms} />}
          {section === "reports" && <ReportsView properties={localProperties} units={unitsState} tenants={tenantsState} payments={paymentsState} />}
          {section === "messages" && <MessagesView tenants={tenantsState} propertyMap={propertyMap} unitMap={unitMap} messages={messagesState} onSend={sendSms} />}
          {section === "settings" && <SettingsView />}
        </main>
      </div>

      {drawerTenant && <TenantDrawer tenant={drawerTenant} onClose={() => setDrawerTenant(null)} propertyMap={propertyMap} unitMap={unitMap} leases={leasesState} payments={paymentsState} onVacate={vacateTenant} />}
      {addOpen && <AddPropertyModal onClose={() => setAddOpen(false)} onAdd={(p) => { setLocalProperties(list => [...list, p]); setAddOpen(false); goTo("properties"); }} />}
      {addTenantOpen && (
        <AddTenantModal
          units={unitsState}
          propertyMap={propertyMap}
          presetUnitId={presetUnitId}
          onClose={() => { setAddTenantOpen(false); setPresetUnitId(null); }}
          onSave={registerTenant}
        />
      )}
      {addUnitOpen && (
        <AddUnitModal properties={localProperties} onClose={() => setAddUnitOpen(false)} onAdd={addUnit} />
      )}
      {addWorkOrderOpen && (
        <AddWorkOrderModal units={unitsState} propertyMap={propertyMap} onClose={() => setAddWorkOrderOpen(false)} onAdd={addWorkOrder} />
      )}
      {recordPaymentOpen && (
        <RecordPaymentModal payments={paymentsState} tenantMap={tenantMap} onClose={() => setRecordPaymentOpen(false)} onSave={recordPayment} />
      )}
    </div>
  );
}

/* ============================= KPI CARD ============================= */
function useCountUp(target, duration = 900) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let startTime = null;
    let raf;
    const step = (ts) => {
      const now = typeof ts === "number" ? ts : Date.now();
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(target * eased);
      setDisplay(Number.isFinite(next) ? next : 0);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}

function KpiCard({ label, value, numeric, format, delta, deltaGood, icon: Icon, accent }) {
  const animated = useCountUp(numeric ?? 0);
  const shown = numeric != null ? format(animated) : value;
  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="fs-125 font-medium c-muted">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent + "18" }}>
          <Icon size={15} style={{ color: accent }} />
        </div>
      </div>
      <div className="font-display font-semibold fs-26 leading-none">{shown}</div>
      {delta && (
        <div className={`fs-12 font-medium flex items-center gap-1`} style={{ color: deltaGood ? "var(--green)" : "var(--red)" }}>
          {deltaGood ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta}
        </div>
      )}
    </div>
  );
}

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved !== null ? saved : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ }
  }, [key, value]);
  return [value, setValue];
}

function Dashboard({ kpis, alerts, goTo, maintenanceItems, leases, payments, tenantMap, unitMap, propertyMap, units, tenants, properties, onRenew, quickAddItems }) {
  const [period, setPeriod] = useState("month");
  const [notedText, setNotedText] = useLocalStorage("gatehouse:quicknotes", "");
  const [renewedIds, setRenewedIds] = useState([]);

  const upcoming = leases.filter(l => daysUntil(l.end) <= 60 && daysUntil(l.end) >= 0).sort((a, b) => daysUntil(a.end) - daysUntil(b.end));
  const activity = [
    ...payments.filter(p => p.status !== "Paid").map(p => ({ kind: "payment", date: p.date === "—" ? "2026-07-01" : p.date, text: `${tenantMap[p.tenantId].name} — ${p.status.toLowerCase()} payment of ${fmtMoney(p.amount)}` })),
    ...maintenanceItems.slice(0, 5).map(m => ({ kind: "maintenance", date: m.created, text: `${m.title} reported at ${propertyMap[unitMap[m.unitId].propertyId].name}` })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  const vacantUnits = units.filter(u => u.status === "vacant");
  const recentMaintenance = [...maintenanceItems].sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 5);
  const recentPayments = [...payments].filter(p => p.date !== "—").sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  // Portfolio composition (real, derived from the actual schema — Parking/Shops aren't tracked as
  // distinct asset types yet, so this reports what the data model actually supports today)
  const buildings = properties.length;
  const residentialUnits = units.filter(u => ["Residential", "Mixed Use"].includes(propertyMap[u.propertyId].type)).length;
  const commercialUnits = units.filter(u => propertyMap[u.propertyId].type === "Commercial").length;

  // Maintenance widget
  const pendingReq = maintenanceItems.filter(m => m.status === "Open").length;
  const completedReq = maintenanceItems.filter(m => m.status === "Completed").length;
  const emergencyReq = maintenanceItems.filter(m => m.status !== "Completed" && m.priority === "Urgent").length;
  const technicians = new Set(maintenanceItems.map(m => m.assigned).filter(a => a && a !== "Unassigned")).size;

  // Property performance ranking
  const perfData = properties.map(p => {
    const pu = units.filter(u => u.propertyId === p.id);
    const occ = pu.filter(u => u.tenantId).length;
    const revenue = pu.filter(u => u.tenantId).reduce((s, u) => s + u.rent, 0);
    return { id: p.id, name: p.name, occRate: pu.length ? Math.round((occ / pu.length) * 100) : 0, revenue };
  }).sort((a, b) => b.revenue - a.revenue);
  const topPerformers = perfData.slice(0, 3);
  const bottomPerformers = [...perfData].reverse().slice(0, 3);

  // Analytics chart datasets by period — derived from the same 6-month billed/collected series
  const monthly = rentRollTrend.map(d => ({ label: d.month, billed: d.billed, collected: d.collected }));
  const weekly = (() => {
    const last = rentRollTrend[rentRollTrend.length - 1];
    const mult = [0.22, 0.27, 0.24, 0.27];
    return mult.map((m, i) => ({ label: `Wk ${i + 1}`, billed: Math.round(last.billed * m), collected: Math.round(last.collected * m) }));
  })();
  const quarterly = [
    { label: "Q1 FY26", billed: rentRollTrend.slice(0, 3).reduce((s, d) => s + d.billed, 0), collected: rentRollTrend.slice(0, 3).reduce((s, d) => s + d.collected, 0) },
    { label: "Q2 FY26", billed: rentRollTrend.slice(3, 6).reduce((s, d) => s + d.billed, 0), collected: rentRollTrend.slice(3, 6).reduce((s, d) => s + d.collected, 0) },
  ];
  const chartData = { week: weekly, month: monthly, quarter: quarterly, year: monthly }[period];

  const financialIncome = kpis.collected;
  const financialOutstanding = kpis.outstanding;

  return (
    <div className="flex flex-col gap-5">
      {/* ===== 6 KPI CARDS ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard label="Total Properties" numeric={kpis.total > 0 ? properties.length : 0} format={v => v} delta={`${units.length} units`} deltaGood accent="var(--ink)" icon={Building2} />
        <KpiCard label="Occupied Units" numeric={kpis.occupied} format={v => v} delta={`${kpis.occRate}% occupancy`} deltaGood accent="var(--green)" icon={CheckCircle2} />
        <KpiCard label="Vacant Units" numeric={vacantUnits.length} format={v => v} delta={`${Math.round((vacantUnits.length / kpis.total) * 100)}% vacancy`} deltaGood={false} accent="var(--amber)" icon={DoorOpen} />
        <KpiCard label="Monthly Revenue" numeric={kpis.rentRoll} format={fmtMoney} delta={`${Math.round((kpis.collected / (kpis.collected + kpis.outstanding || 1)) * 100)}% collected`} deltaGood accent="var(--blue)" icon={Wallet} />
        <KpiCard label="Outstanding Rent" numeric={kpis.outstanding} format={fmtMoney} delta="Needs follow-up" deltaGood={false} accent="var(--red)" icon={AlertTriangle} />
        <KpiCard label="Active Tenants" numeric={tenants.filter(t => t.status !== "Moved Out").length} format={v => v} delta={`${tenants.filter(t => t.status === "Late").length} late`} deltaGood={tenants.filter(t => t.status === "Late").length === 0} accent="var(--ink)" icon={Users} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* ===== MAIN COLUMN ===== */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          {/* Analytics chart */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div>
                <div className="font-display font-semibold fs-15">Rental income, expenses & profit</div>
                <div className="fs-115 c-muted mt-0.5">Occupancy trend: <span className="font-semibold" style={{ color: "var(--green)" }}>{kpis.occRate}%</span> this cycle</div>
              </div>
              <div className="flex gap-1 bg-FAFAFC rounded-full p-1">
                {["week", "month", "quarter", "year"].map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={`px-3 py-1 rounded-full fs-115 font-medium capitalize ${period === p ? "text-white" : "c-muted"}`}
                    style={period === p ? { background: "var(--ink)" } : {}}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={chartData} margin={{ left: -20, right: 10, top: 5 }}>
                <defs>
                  <linearGradient id="billed" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6C4EF6" stopOpacity={0.28} /><stop offset="100%" stopColor="#6C4EF6" stopOpacity={0} /></linearGradient>
                  <linearGradient id="collected" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0FA968" stopOpacity={0.35} /><stop offset="100%" stopColor="#0FA968" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAEAF5" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#6B7094" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6B7094" }} axisLine={false} tickLine={false} tickFormatter={(v) => `KSh ${(v / 1e6).toFixed(1)}M`} />
                <Tooltip formatter={(v) => fmtMoney(v)} contentStyle={{ borderRadius: 14, border: "1px solid #EAEAF5", fontSize: 12.5 }} />
                <Area type="monotone" dataKey="billed" stroke="#6C4EF6" fill="url(#billed)" strokeWidth={2} name="Billed" />
                <Area type="monotone" dataKey="collected" stroke="#0FA968" fill="url(#collected)" strokeWidth={2} name="Collected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Property Overview + Maintenance widget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card p-4">
              <div className="font-display font-semibold fs-15 mb-3">Property overview</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Buildings", buildings, Building2, "var(--ink)"],
                  ["Total units", units.length, DoorOpen, "var(--blue)"],
                  ["Residential units", residentialUnits, Home, "var(--green)"],
                  ["Commercial units", commercialUnits, LayoutGrid, "var(--amber)"],
                ].map(([label, val, Icon, color]) => (
                  <div key={label} className="flex items-center gap-2.5 bg-FAFAFC rounded-2xl p-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: color + "18" }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <div>
                      <div className="font-display font-semibold fs-16 leading-none">{val}</div>
                      <div className="fs-11 c-muted mt-0.5">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-4">
              <div className="font-display font-semibold fs-15 mb-3">Maintenance widget</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-FAFAFC rounded-2xl p-3">
                  <div className="font-display font-semibold fs-18" style={{ color: "var(--amber)" }}>{pendingReq}</div>
                  <div className="fs-11 c-muted mt-0.5">Pending requests</div>
                </div>
                <div className="bg-FAFAFC rounded-2xl p-3">
                  <div className="font-display font-semibold fs-18" style={{ color: "var(--green)" }}>{completedReq}</div>
                  <div className="fs-11 c-muted mt-0.5">Completed</div>
                </div>
                <div className="bg-FAFAFC rounded-2xl p-3">
                  <div className="font-display font-semibold fs-18" style={{ color: "var(--red)" }}>{emergencyReq}</div>
                  <div className="fs-11 c-muted mt-0.5">Emergency repairs</div>
                </div>
                <div className="bg-FAFAFC rounded-2xl p-3">
                  <div className="font-display font-semibold fs-18" style={{ color: "var(--ink)" }}>{technicians}</div>
                  <div className="fs-11 c-muted mt-0.5">Assigned technicians</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Rent Payments */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-4 pb-0">
              <div className="font-display font-semibold fs-15">Recent rent payments</div>
              <button onClick={() => goTo("payments")} className="fs-125 font-medium" style={{ color: "var(--ink)" }}>View all →</button>
            </div>
            <div className="overflow-x-auto p-4">
              <table className="w-full pms-table">
                <thead><tr className="text-left"><th className="py-2">Tenant</th><th>Property</th><th>Unit</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {recentPayments.map(pay => {
                    const t = tenantMap[pay.tenantId], p = propertyMap[t.propertyId], u = unitMap[t.unitId];
                    return (
                      <tr key={pay.id} className="row-hover border-t divider">
                        <td className="py-2.5 font-medium fs-135">{t.name}</td>
                        <td className="fs-13 c-muted">{p.name}</td>
                        <td className="fs-13 c-muted">№{u.unitNumber}</td>
                        <td className="fs-13 font-medium">{fmtMoney(pay.amount)}</td>
                        <td className="fs-13 c-muted">{pay.method}</td>
                        <td><StatusBadge status={pay.status} /></td>
                        <td className="fs-13 c-muted">{fmtDate(pay.date)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Lease Expiry + Recent Maintenance Requests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card p-4">
              <div className="font-display font-semibold fs-15 mb-3">Upcoming lease expiry</div>
              <div className="flex flex-col gap-2">
                {upcoming.slice(0, 4).map(l => {
                  const t = tenantMap[l.tenantId], u = unitMap[l.unitId];
                  const d = daysUntil(l.end);
                  return (
                    <div key={l.id} className="flex items-center justify-between gap-2 bg-FAFAFC rounded-2xl p-2.5">
                      <div className="min-w-0">
                        <div className="fs-13 font-medium truncate">{t.name}</div>
                        <div className="fs-115 c-muted">№{u.unitNumber} · {d} days left</div>
                      </div>
                      {renewedIds.includes(l.id) ? (
                        <span className="fs-115 c-muted flex items-center gap-1 shrink-0"><CheckCheck size={13} /> Renewed</span>
                      ) : (
                        <button onClick={() => { onRenew(l.id, 12); setRenewedIds(ids => [...ids, l.id]); }} className="btn-outline rounded-full px-2.5 py-1 fs-115 font-medium shrink-0">Renew</button>
                      )}
                    </div>
                  );
                })}
                {upcoming.length === 0 && <div className="fs-13 c-muted text-center py-6">No leases expiring soon.</div>}
              </div>
            </div>

            <div className="card p-4">
              <div className="font-display font-semibold fs-15 mb-3">Recent maintenance requests</div>
              <div className="flex flex-col gap-2">
                {recentMaintenance.map(m => {
                  const u = unitMap[m.unitId];
                  const t = u.tenantId ? tenantMap[u.tenantId] : null;
                  return (
                    <div key={m.id} className="flex items-center justify-between gap-2 bg-FAFAFC rounded-2xl p-2.5">
                      <div className="min-w-0">
                        <div className="fs-13 font-medium truncate">{m.title}</div>
                        <div className="fs-115 c-muted truncate">{t ? t.name : "Vacant unit"} · {m.assigned}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <StatusBadge status={m.priority} />
                        <StatusBadge status={m.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Vacant Units */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-display font-semibold fs-15">Vacant units</div>
              <button onClick={() => goTo("units")} className="fs-125 font-medium" style={{ color: "var(--ink)" }}>View all →</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {vacantUnits.slice(0, 6).map(u => {
                const p = propertyMap[u.propertyId];
                return (
                  <div key={u.id} className="bg-FAFAFC rounded-2xl p-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="fs-135 font-medium">{p.name} №{u.unitNumber}</span>
                      <StatusBadge status="vacant" />
                    </div>
                    <div className="fs-13 c-muted">{u.beds === 0 ? "Studio/Suite" : `${u.beds} bd · ${u.baths} ba`}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold fs-15">{fmtMoney(u.rent)}</span>
                      <button onClick={() => goTo("units")} className="fs-115 font-medium" style={{ color: "var(--ink)" }}>View details</button>
                    </div>
                  </div>
                );
              })}
              {vacantUnits.length === 0 && <div className="fs-13 c-muted text-center py-6 col-span-full">Fully occupied — no vacant units right now.</div>}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="card p-4">
            <div className="font-display font-semibold fs-15 mb-3">Recent activity</div>
            <div className="flex flex-col gap-3">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: a.kind === "payment" ? "var(--red-soft)" : "var(--amber-soft)" }}>
                    {a.kind === "payment" ? <Wallet size={13} style={{ color: "var(--red)" }} /> : <Wrench size={13} style={{ color: "var(--amber)" }} />}
                  </div>
                  <div className="fs-125 leading-snug">{a.text}<div className="fs-11 c-muted2 mt-0.5">{fmtDate(a.date)}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="flex flex-col gap-5">
          {/* Today's Summary */}
          <div className="glass-card p-4">
            <div className="font-display font-semibold fs-15 mb-3">Today's summary</div>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between fs-13"><span className="c-muted">Rent collected</span><span className="font-medium" style={{ color: "var(--green)" }}>{fmtMoney(kpis.collected)}</span></div>
              <div className="flex justify-between fs-13"><span className="c-muted">Outstanding bills</span><span className="font-medium" style={{ color: "var(--red)" }}>{fmtMoney(kpis.outstanding)}</span></div>
              <div className="flex justify-between fs-13"><span className="c-muted">Maintenance today</span><span className="font-medium">{maintenanceItems.filter(m => m.created === "2026-07-24").length} new</span></div>
              <div className="flex justify-between fs-13"><span className="c-muted">Upcoming inspections</span><span className="font-medium c-muted">None scheduled</span></div>
              <div className="flex justify-between fs-13"><span className="c-muted">Property alerts</span><span className="font-medium" style={{ color: alerts.length ? "var(--red)" : "var(--green)" }}>{alerts.length}</span></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-4">
            <div className="font-display font-semibold fs-15 mb-3">Quick actions</div>
            <div className="grid grid-cols-2 gap-2">
              {quickAddItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={i} onClick={item.onClick} className="btn-outline rounded-2xl p-3 flex flex-col items-start gap-2 fs-115 font-medium text-left">
                    <Icon size={16} style={{ color: "var(--ink)" }} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini calendar */}
          <MiniCalendar leases={leases} maintenanceItems={maintenanceItems} unitMap={unitMap} propertyMap={propertyMap} tenantMap={tenantMap} />

          {/* Weather widget (illustrative placeholder — wire to a real weather API for live data) */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-1">
              <div className="font-display font-semibold fs-15">Weather — Nairobi</div>
              <span className="fs-105 c-muted2">sample data</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="font-display font-semibold fs-26">24°C</div>
              <div className="fs-13 c-muted">Partly cloudy<br />H:26° L:18°</div>
            </div>
          </div>

          {/* Quick notes */}
          <div className="card p-4">
            <div className="font-display font-semibold fs-15 mb-2">Quick notes</div>
            <textarea
              value={notedText}
              onChange={e => setNotedText(e.target.value)}
              rows={4}
              placeholder="Jot down a reminder…"
              className="input w-full rounded-lg px-3 py-2 fs-125"
            />
            <div className="fs-105 c-muted2 mt-1">Saved locally in your browser.</div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card p-4">
          <div className="font-display font-semibold fs-15 mb-3">Financial summary</div>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between fs-13"><span className="c-muted">Income (collected)</span><span className="font-medium" style={{ color: "var(--green)" }}>{fmtMoney(financialIncome)}</span></div>
            <div className="flex justify-between fs-13"><span className="c-muted">Expenses</span><span className="font-medium c-muted2">Not tracked yet</span></div>
            <div className="flex justify-between fs-13"><span className="c-muted">Outstanding balance</span><span className="font-medium" style={{ color: "var(--red)" }}>{fmtMoney(financialOutstanding)}</span></div>
          </div>
          <div className="fs-105 c-muted2 mt-2">Expense tracking arrives with the Accounting module.</div>
        </div>

        <div className="card p-4">
          <div className="font-display font-semibold fs-15 mb-3">Occupancy heatmap</div>
          <div className="grid grid-cols-4 gap-2">
            {perfData.map(p => (
              <div key={p.id} title={`${p.name}: ${p.occRate}%`} className="rounded-xl aspect-square flex items-center justify-center fs-105 font-semibold text-white"
                style={{ background: `rgba(108,78,246,${Math.max(0.15, p.occRate / 100)})` }}>
                {p.occRate}%
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="font-display font-semibold fs-15 mb-2">Property performance ranking</div>
          <div className="fs-11 font-semibold c-muted uppercase tracking-wide mt-2 mb-1">Top performing</div>
          {topPerformers.map(p => (
            <div key={p.id} className="flex justify-between fs-125 py-1"><span className="truncate">{p.name}</span><span className="font-medium" style={{ color: "var(--green)" }}>{fmtMoney(p.revenue)}</span></div>
          ))}
          <div className="fs-11 font-semibold c-muted uppercase tracking-wide mt-3 mb-1">Lowest performing</div>
          {bottomPerformers.map(p => (
            <div key={p.id} className="flex justify-between fs-125 py-1"><span className="truncate">{p.name}</span><span className="font-medium" style={{ color: "var(--amber)" }}>{fmtMoney(p.revenue)}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniCalendar({ leases, maintenanceItems, unitMap, propertyMap, tenantMap }) {
  const year = 2026, month = 6; // July 2026 (0-indexed)
  const today = 24;
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventDays = new Set([
    ...leases.filter(l => l.end.startsWith("2026-07")).map(l => Number(l.end.slice(8, 10))),
    ...maintenanceItems.filter(m => m.created.startsWith("2026-07")).map(m => Number(m.created.slice(8, 10))),
  ]);
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="card p-4">
      <div className="font-display font-semibold fs-15 mb-3">Calendar — July 2026</div>
      <div className="grid grid-cols-7 gap-1 fs-105 c-muted text-center mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <div key={i} className="aspect-square flex items-center justify-center relative fs-105 rounded-lg"
            style={d === today ? { background: "var(--ink)", color: "#fff", fontWeight: 600 } : {}}>
            {d || ""}
            {d && eventDays.has(d) && d !== today && <span className="absolute bottom-0.5 w-1 h-1 rounded-full" style={{ background: "var(--amber)" }} />}
          </div>
        ))}
      </div>
      <div className="fs-11 c-muted2 mt-2">Dots mark lease expirations and maintenance events this month.</div>
    </div>
  );
}

/* ============================= PROPERTY ILLUSTRATION =============================
   A refined duotone brand panel per property — a subtle blueprint-style grid, a
   faint architectural silhouette bleeding off-frame, and a precise glass window
   grid, all within the app's purple/blue palette. Seeded from the property id so
   it's stable across renders. Deliberately restrained (not illustrative/cartoonish)
   to match a premium enterprise dashboard rather than a picture-book app. Avoids
   hotlinking external stock photos, which we can't verify are live/licensed here. */
function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function PropertyIllustration({ property }) {
  const seed = hashSeed(property.id);
  const rand = (n, salt = 0) => ((seed + salt * 97) % n + n) % n;

  const palettes = {
    Residential: { from: "#7C5CFA", to: "#5238B8" },
    Commercial: { from: "#4F8EF7", to: "#2C5FC7" },
    "Mixed Use": { from: "#6C4EF6", to: "#3D6FE0" },
  };
  const palette = palettes[property.type] || palettes.Residential;
  const patternRotate = rand(360, 3);

  const floors = property.type === "Commercial" ? 6 : 4;
  const cols = property.type === "Commercial" ? 5 : property.type === "Mixed Use" ? 6 : 7;
  const bodyX = property.type === "Commercial" ? 250 : 40;
  const bodyW = property.type === "Commercial" ? 110 : 320;
  const bodyTop = property.type === "Commercial" ? 26 : 52;
  const winGapX = (bodyW - 30) / cols;
  const winW = winGapX * 0.58;
  const floorH = (150 - bodyTop - 16) / floors;

  const windows = [];
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < cols; c++) {
      const lit = rand(6, f * cols + c + 1) === 0;
      windows.push(
        <rect key={`${f}-${c}`}
          x={bodyX + 16 + c * winGapX} y={bodyTop + 14 + f * floorH}
          width={winW} height={floorH * 0.6} rx={1.5}
          fill={lit ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.22)"} />
      );
    }
  }

  return (
    <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`grad-${property.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
        <pattern id={`grid-${property.id}`} width="26" height="26" patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternRotate})`}>
          <path d="M26 0 L0 0 0 26" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="160" fill={`url(#grad-${property.id})`} />
      <rect width="400" height="160" fill={`url(#grid-${property.id})`} />
      {/* faint skyline motif, bled off the right edge for depth without looking illustrative */}
      <g opacity="0.10" fill="#fff">
        <rect x="300" y="60" width="46" height="100" />
        <rect x="340" y="30" width="34" height="130" />
        <rect x="368" y="80" width="40" height="80" />
      </g>
      {/* building mass */}
      <rect x={bodyX} y={bodyTop} width={bodyW} height={150 - bodyTop} fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      <rect x={bodyX} y={bodyTop} width={bodyW} height="3" fill="rgba(255,255,255,0.55)" />
      {windows}
      <rect x="0" y="130" width="400" height="30" fill="rgba(0,0,0,0.16)" />
    </svg>
  );
}

/* ============================= PROPERTIES ============================= */
function PropertiesView({ query, localProperties, goTo, units }) {
  const [expanded, setExpanded] = useState(null);
  const q = query.trim().toLowerCase();
  const list = localProperties.filter(p => !q || p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {list.map((p, i) => {
        const pUnits = units.filter(u => u.propertyId === p.id);
        const occ = pUnits.filter(u => u.tenantId).length;
        const rentRoll = pUnits.filter(u => u.tenantId).reduce((s, u) => s + u.rent, 0);
        const isOpen = expanded === p.id;
        return (
          <div key={p.id} className="card overflow-hidden flex flex-col">
            <div className="h-24 relative">
              <PropertyIllustration property={p} />
              <div className="absolute top-2.5 right-2.5 rounded-full px-2.5 py-1 fs-105 font-semibold text-white" style={{ background: "rgba(0,0,0,0.28)" }}>
                {pUnits.length} units
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div>
                <div className="font-display font-semibold fs-155">{p.name}</div>
                <div className="fs-125 c-muted flex items-center gap-1 mt-0.5"><MapPin size={11} />{p.address}</div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="badge badge-gray">{p.type}</span>
                <span className="badge badge-gray">Built {p.built}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t divider text-center">
                <div><div className="font-display font-semibold fs-16">{pUnits.length}</div><div className="fs-105 c-muted uppercase tracking-wide">Units</div></div>
                <div><div className="font-display font-semibold fs-16">{Math.round((occ / pUnits.length) * 100)}%</div><div className="fs-105 c-muted uppercase tracking-wide">Occupied</div></div>
                <div><div className="font-display font-semibold fs-16">{fmtMoney(rentRoll)}</div><div className="fs-105 c-muted uppercase tracking-wide">Rent Roll</div></div>
              </div>
              <button onClick={() => setExpanded(isOpen ? null : p.id)} className="btn-outline rounded-lg py-1.5 fs-125 font-medium flex items-center justify-center gap-1 mt-1">
                {isOpen ? "Hide units" : "View units"} <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="flex flex-col gap-1.5 pt-1">
                  {pUnits.map(u => (
                    <div key={u.id} className="flex items-center justify-between fs-125 px-2 py-1.5 rounded-lg bg-FAFAFC">
                      <span className="font-mono ledger-id">№{u.unitNumber}</span>
                      <span className="c-muted">{fmtMoney(u.rent)}/mo</span>
                      <StatusBadge status={u.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================= UNITS ============================= */
function UnitsView({ query, pendingFilter, units, propertyMap, tenantMap, onRegisterTenant }) {
  const [statusFilter, setStatusFilter] = useState(pendingFilter?.status || "all");
  useEffect(() => { if (pendingFilter?.status) setStatusFilter(pendingFilter.status); }, [pendingFilter]);
  const q = query.trim().toLowerCase();
  const list = units.filter(u => {
    const p = propertyMap[u.propertyId];
    const matchQ = !q || u.unitNumber.includes(q) || p.name.toLowerCase().includes(q);
    const matchS = statusFilter === "all" || u.status === statusFilter;
    return matchQ && matchS;
  });
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 p-3 border-b divider flex-wrap">
        <Filter size={14} className="c-muted" />
        {["all", "occupied", "vacant", "notice", "maintenance"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full fs-12 font-medium ${statusFilter === s ? "text-white" : "btn-outline"}`}
            style={statusFilter === s ? { background: "var(--ink)" } : {}}>
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <span className="ml-auto fs-125 c-muted">{list.length} units</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full pms-table">
          <thead><tr className="text-left"><th className="py-2.5 pl-4">Unit</th><th>Property</th><th>Layout</th><th>Sqft</th><th>Rent</th><th>Status</th><th>Tenant</th><th></th></tr></thead>
          <tbody>
            {list.map(u => {
              const p = propertyMap[u.propertyId];
              const t = u.tenantId ? tenantMap[u.tenantId] : null;
              return (
                <tr key={u.id} className="row-hover border-t divider">
                  <td className="py-2.5 pl-4 font-mono fs-13 font-medium">№{u.unitNumber}</td>
                  <td className="fs-13">{p.name}</td>
                  <td className="fs-13 c-muted">{u.beds === 0 ? "Studio/Suite" : `${u.beds} bd · ${u.baths} ba`}</td>
                  <td className="fs-13 c-muted">{u.sqft.toLocaleString()}</td>
                  <td className="fs-13 font-medium">{fmtMoney(u.rent)}</td>
                  <td><StatusBadge status={u.status} /></td>
                  <td className="fs-13 c-muted">{t ? t.name : "—"}</td>
                  <td className="pr-4">
                    {u.status === "vacant" && (
                      <button onClick={() => onRegisterTenant(u.id)} className="btn-outline rounded-full px-2.5 py-1 fs-115 font-medium whitespace-nowrap">
                        Register tenant
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================= TENANTS ============================= */
function TenantsView({ query, onOpen, tenants, propertyMap, unitMap, onRegister }) {
  const q = query.trim().toLowerCase();
  const list = tenants.filter(t => !q || t.name.toLowerCase().includes(q) || propertyMap[t.propertyId].name.toLowerCase().includes(q));
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full pms-table">
          <thead><tr className="text-left"><th className="py-2.5 pl-4">Tenant</th><th>Property / Unit</th><th>Contact</th><th>Rent</th><th>Balance</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {list.map(t => {
              const p = propertyMap[t.propertyId], u = unitMap[t.unitId];
              return (
                <tr key={t.id} className="row-hover border-t divider cursor-pointer" onClick={() => onOpen(t)}>
                  <td className="py-2.5 pl-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-display font-semibold fs-12 text-white shrink-0" style={{ background: "var(--ink)" }}>
                        {t.name.split(" ").map(x => x[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium fs-135">{t.name}</span>
                    </div>
                  </td>
                  <td className="fs-13 c-muted">{p.name} <span className="ledger-id">№{u.unitNumber}</span></td>
                  <td className="fs-125 c-muted">{t.email}</td>
                  <td className="fs-13 font-medium">{fmtMoney(t.rent)}</td>
                  <td className="fs-13" style={{ color: t.balance > 0 ? "var(--red)" : "var(--muted)" }}>{t.balance > 0 ? fmtMoney(t.balance) : "KSh 0"}</td>
                  <td><StatusBadge status={t.status} /></td>
                  <td className="pr-4"><MoreHorizontal size={15} className="c-muted2" /></td>
                </tr>
              );
            })}
            {list.length === 0 && (
              <tr><td colSpan={7} className="py-10 text-center">
                <div className="fs-13 c-muted mb-3">No tenants match that search.</div>
                <button onClick={onRegister} className="btn-brass rounded-lg px-4 py-2 fs-125 font-semibold">Register a tenant</button>
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TenantDrawer({ tenant, onClose, propertyMap, unitMap, leases, payments, onVacate }) {
  const p = propertyMap[tenant.propertyId], u = unitMap[tenant.unitId], l = leases.find(x => x.id === tenant.leaseId);
  const history = payments.filter(pay => pay.tenantId === tenant.id);
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 scrim-30" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-5 overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 c-muted"><X size={18} /></button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-semibold text-white fs-15" style={{ background: "var(--ink)" }}>
            {tenant.name.split(" ").map(x => x[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="font-display font-semibold fs-17">{tenant.name}</div>
            <StatusBadge status={tenant.status} />
          </div>
        </div>
        <div className="flex flex-col gap-2 fs-13 mb-5">
          <div className="flex items-center gap-2 c-muted"><Mail size={13} />{tenant.email}</div>
          <div className="flex items-center gap-2 c-muted"><Phone size={13} />{tenant.phone}</div>
          <div className="flex items-center gap-2 c-muted"><MapPin size={13} />{p.name} — Unit №{u.unitNumber}</div>
        </div>
        <div className="card p-3 mb-4">
          <div className="fs-12 font-semibold c-muted uppercase tracking-wide mb-2">Lease</div>
          <div className="flex justify-between fs-13 mb-1"><span className="c-muted">Term</span><span>{fmtDate(l.start)} – {fmtDate(l.end)}</span></div>
          <div className="flex justify-between fs-13 mb-1"><span className="c-muted">Rent</span><span className="font-medium">{fmtMoney(l.rent)}/mo</span></div>
          <div className="flex justify-between fs-13"><span className="c-muted">Status</span><StatusBadge status={l.status} /></div>
        </div>
        <div className="card p-3 mb-4">
          <div className="fs-12 font-semibold c-muted uppercase tracking-wide mb-2">Payment history</div>
          {history.map(h => (
            <div key={h.id} className="flex justify-between items-center py-1.5 border-t divider first:border-t-0 fs-13">
              <span className="c-muted">{h.forMonth}</span>
              <span className="font-medium">{fmtMoney(h.amount)}</span>
              <StatusBadge status={h.status} />
            </div>
          ))}
        </div>
        {l.status === "Ending — Notice Given" && (
          <button onClick={() => onVacate(tenant.id)} className="btn-outline rounded-lg py-2.5 fs-135 font-semibold w-full">
            Mark unit vacated
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================= LEASES ============================= */
function LeasesView({ query, pendingFilter, leases, tenantMap, unitMap, propertyMap, onRenew, onNotify }) {
  const [statusFilter, setStatusFilter] = useState(pendingFilter?.status || "all");
  useEffect(() => { if (pendingFilter?.status) setStatusFilter(pendingFilter.status); }, [pendingFilter]);
  const [notifiedIds, setNotifiedIds] = useState([]);
  const q = query.trim().toLowerCase();
  const statuses = ["all", "Active", "Expiring Soon", "Ending — Notice Given"];
  const list = leases.filter(l => {
    const t = tenantMap[l.tenantId], p = propertyMap[l.propertyId];
    const matchQ = !q || t.name.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
    const matchS = statusFilter === "all" || l.status === statusFilter;
    return matchQ && matchS;
  }).sort((a, b) => daysUntil(a.end) - daysUntil(b.end));
  const renewalTemplate = SMS_TEMPLATES.find(t => t.id === "renewal").body;
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 p-3 border-b divider flex-wrap">
        <Filter size={14} className="c-muted" />
        {statuses.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full fs-12 font-medium ${statusFilter === s ? "text-white" : "btn-outline"}`}
            style={statusFilter === s ? { background: "var(--ink)" } : {}}>
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full pms-table">
          <thead><tr className="text-left"><th className="py-2.5 pl-4">Tenant</th><th>Property / Unit</th><th>Term</th><th>Rent</th><th>Ends in</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {list.map(l => {
              const t = tenantMap[l.tenantId], u = unitMap[l.unitId], p = propertyMap[l.propertyId];
              const d = daysUntil(l.end);
              const canRenew = l.status === "Expiring Soon" || l.status === "Ending — Notice Given";
              return (
                <tr key={l.id} className="row-hover border-t divider">
                  <td className="py-2.5 pl-4 font-medium fs-135">{t.name}</td>
                  <td className="fs-13 c-muted">{p.name} <span className="ledger-id">№{u.unitNumber}</span></td>
                  <td className="fs-13">{fmtDate(l.start)} – {fmtDate(l.end)}</td>
                  <td className="fs-13 font-medium">{fmtMoney(l.rent)}</td>
                  <td className="fs-13" style={{ color: d <= 30 ? "var(--red)" : d <= 60 ? "var(--amber)" : "var(--muted)" }}>{d} days</td>
                  <td><StatusBadge status={l.status} /></td>
                  <td className="pr-4">
                    {canRenew && (
                      <div className="flex gap-1.5 justify-end">
                        {notifiedIds.includes(l.id) ? (
                          <span className="fs-115 c-muted flex items-center gap-1"><CheckCheck size={13} /> Notified</span>
                        ) : (
                          <button onClick={() => { onNotify([t.id], renewalTemplate); setNotifiedIds(ids => [...ids, l.id]); }} className="btn-outline rounded-full px-2.5 py-1 fs-115 font-medium whitespace-nowrap">
                            Notify
                          </button>
                        )}
                        <button onClick={() => onRenew(l.id, 12)} className="btn-outline rounded-full px-2.5 py-1 fs-115 font-medium whitespace-nowrap">
                          Renew 12mo
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================= MAINTENANCE ============================= */
function MaintenanceView({ query, pendingFilter, items, setItems, unitMap, propertyMap }) {
  const [priorityFilter, setPriorityFilter] = useState(pendingFilter?.priority || "all");
  useEffect(() => { if (pendingFilter?.priority) setPriorityFilter(pendingFilter.priority); }, [pendingFilter]);
  const q = query.trim().toLowerCase();
  const filtered = items.filter(m => {
    const matchQ = !q || m.title.toLowerCase().includes(q) || m.category.toLowerCase().includes(q);
    const matchP = priorityFilter === "all" || m.priority === priorityFilter;
    return matchQ && matchP;
  });
  const columns = ["Open", "In Progress", "Completed"];
  const updateStatus = (id, status) => setItems(list => list.map(m => m.id === id ? { ...m, status } : m));

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Filter size={14} className="c-muted" />
        {["all", "Urgent", "High", "Medium", "Low"].map(s => (
          <button key={s} onClick={() => setPriorityFilter(s)}
            className={`px-3 py-1.5 rounded-full fs-12 font-medium ${priorityFilter === s ? "text-white" : "btn-outline"}`}
            style={priorityFilter === s ? { background: "var(--ink)" } : {}}>
            {s === "all" ? "All priorities" : s}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => (
          <div key={col} className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-display font-semibold fs-14">{col}</span>
              <span className="badge badge-gray">{filtered.filter(m => m.status === col).length}</span>
            </div>
            <div className="flex flex-col gap-2 minh-80">
              {filtered.filter(m => m.status === col).map(m => {
                const u = unitMap[m.unitId], p = propertyMap[u.propertyId];
                return (
                  <div key={m.id} className="card p-3">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-medium fs-13 leading-snug">{m.title}</span>
                      <StatusBadge status={m.priority} />
                    </div>
                    <div className="fs-12 c-muted mb-2">{p.name} <span className="ledger-id">№{u.unitNumber}</span> · {m.category}</div>
                    <div className="flex items-center justify-between fs-115 c-muted2 mb-2">
                      <span>{m.assigned}</span><span>{fmtDate(m.created)}</span>
                    </div>
                    <select value={m.status} onChange={e => updateStatus(m.id, e.target.value)} className="input w-full rounded-md fs-12 py-1.5 px-2">
                      {columns.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                );
              })}
              {filtered.filter(m => m.status === col).length === 0 && <div className="fs-125 c-muted2 text-center py-6 border border-dashed rounded-lg divider">No items</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================= PAYMENTS ============================= */
function PaymentsView({ query, pendingFilter, payments, tenantMap, propertyMap, onRemind }) {
  const [statusFilter, setStatusFilter] = useState(pendingFilter?.status || "all");
  useEffect(() => { if (pendingFilter?.status) setStatusFilter(pendingFilter.status); }, [pendingFilter]);
  const [remindedIds, setRemindedIds] = useState([]);
  const q = query.trim().toLowerCase();
  const list = payments.filter(pay => {
    const t = tenantMap[pay.tenantId];
    const matchQ = !q || t.name.toLowerCase().includes(q);
    const matchS = statusFilter === "all" || pay.status === statusFilter;
    return matchQ && matchS;
  });
  const totals = {
    paid: payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0),
    pending: payments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0),
    overdue: payments.filter(p => p.status === "Overdue").reduce((s, p) => s + p.amount, 0),
  };
  const reminderTemplate = SMS_TEMPLATES.find(t => t.id === "overdue").body;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4"><div className="fs-12 c-muted mb-1">Collected</div><div className="font-display font-semibold fs-20" style={{ color: "var(--green)" }}>{fmtMoney(totals.paid)}</div></div>
        <div className="card p-4"><div className="fs-12 c-muted mb-1">Pending</div><div className="font-display font-semibold fs-20" style={{ color: "var(--amber)" }}>{fmtMoney(totals.pending)}</div></div>
        <div className="card p-4"><div className="fs-12 c-muted mb-1">Overdue</div><div className="font-display font-semibold fs-20" style={{ color: "var(--red)" }}>{fmtMoney(totals.overdue)}</div></div>
      </div>
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b divider flex-wrap">
          <Filter size={14} className="c-muted" />
          {["all", "Paid", "Pending", "Overdue"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full fs-12 font-medium ${statusFilter === s ? "text-white" : "btn-outline"}`}
              style={statusFilter === s ? { background: "var(--ink)" } : {}}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full pms-table">
            <thead><tr className="text-left"><th className="py-2.5 pl-4">Tenant</th><th>Property</th><th>For</th><th>Method</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map(pay => {
                const t = tenantMap[pay.tenantId], p = propertyMap[t.propertyId];
                const needsReminder = pay.status !== "Paid";
                return (
                  <tr key={pay.id} className="row-hover border-t divider">
                    <td className="py-2.5 pl-4 font-medium fs-135">{t.name}</td>
                    <td className="fs-13 c-muted">{p.name}</td>
                    <td className="fs-13 c-muted">{pay.forMonth}</td>
                    <td className="fs-13 c-muted">{pay.method}</td>
                    <td className="fs-13">{fmtDate(pay.date)}</td>
                    <td className="fs-13 font-medium">{fmtMoney(pay.amount)}</td>
                    <td><StatusBadge status={pay.status} /></td>
                    <td className="pr-4">
                      {needsReminder && (
                        remindedIds.includes(pay.id) ? (
                          <span className="fs-115 c-muted flex items-center gap-1 whitespace-nowrap"><CheckCheck size={13} /> Reminded</span>
                        ) : (
                          <button onClick={() => { onRemind([t.id], reminderTemplate); setRemindedIds(ids => [...ids, pay.id]); }} className="btn-outline rounded-full px-2.5 py-1 fs-115 font-medium whitespace-nowrap">
                            Send reminder
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================= REPORTS ============================= */
function ReportsView({ properties, units, tenants, payments }) {
  const data = properties.map(p => {
    const pu = units.filter(u => u.propertyId === p.id);
    const occ = pu.filter(u => u.tenantId).length;
    const revenue = pu.filter(u => u.tenantId).reduce((s, u) => s + u.rent, 0);
    const propertyTenantIds = tenants.filter(t => t.propertyId === p.id).map(t => t.id);
    const propertyPayments = payments.filter(pay => propertyTenantIds.includes(pay.tenantId));
    const billed = propertyPayments.reduce((s, pay) => s + pay.amount, 0);
    const collected = propertyPayments.filter(pay => pay.status === "Paid").reduce((s, pay) => s + pay.amount, 0);
    const collectionRate = billed > 0 ? Math.round((collected / billed) * 100) : 100;
    return {
      id: p.id, name: p.name.split(" ")[0], fullName: p.name,
      occRate: pu.length ? Math.round((occ / pu.length) * 100) : 0,
      revenue, units: pu.length, occ, collectionRate,
      avgRent: occ > 0 ? Math.round(revenue / occ) : 0,
    };
  });

  const totalBilled = payments.reduce((s, p) => s + p.amount, 0);
  const totalCollected = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const overallCollectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 100;
  const totalOccupied = units.filter(u => u.tenantId).length;
  const avgRentPerUnit = totalOccupied > 0 ? Math.round(units.filter(u => u.tenantId).reduce((s, u) => s + u.rent, 0) / totalOccupied) : 0;

  // rule-based insights: flag the standout properties without needing a real analytics backend
  const insights = [];
  const sortedByOcc = [...data].sort((a, b) => a.occRate - b.occRate);
  const worstOcc = sortedByOcc[0];
  if (worstOcc && worstOcc.occRate < 80) {
    insights.push(`${worstOcc.fullName} has the lowest occupancy at ${worstOcc.occRate}% — consider prioritizing marketing or incentives here.`);
  }
  const sortedByCollection = [...data].sort((a, b) => a.collectionRate - b.collectionRate);
  const worstCollection = sortedByCollection[0];
  if (worstCollection && worstCollection.collectionRate < 90) {
    insights.push(`${worstCollection.fullName} is collecting only ${worstCollection.collectionRate}% of billed rent this cycle — worth a closer look at overdue accounts.`);
  }
  const bestRevenue = [...data].sort((a, b) => b.revenue - a.revenue)[0];
  if (bestRevenue) {
    insights.push(`${bestRevenue.fullName} is your top revenue contributor at ${fmtMoney(bestRevenue.revenue)}/mo.`);
  }
  if (overallCollectionRate >= 95) {
    insights.push(`Portfolio-wide collection rate is strong at ${overallCollectionRate}%.`);
  } else if (overallCollectionRate < 85) {
    insights.push(`Portfolio-wide collection rate has slipped to ${overallCollectionRate}% — below the healthy 90%+ range.`);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Portfolio Occupancy" value={`${Math.round((totalOccupied / units.length) * 100)}%`} icon={Home} accent="var(--green)" />
        <KpiCard label="Collection Rate" value={`${overallCollectionRate}%`} icon={Wallet} accent={overallCollectionRate >= 90 ? "var(--green)" : "var(--amber)"} />
        <KpiCard label="Avg. Rent / Occupied Unit" value={fmtMoney(avgRentPerUnit)} icon={TrendingUp} accent="var(--brass)" />
        <KpiCard label="Properties Tracked" value={properties.length} icon={Building2} accent="var(--blue)" />
      </div>

      <div className="card p-4">
        <div className="font-display font-semibold fs-15 mb-3">Business intelligence — auto-generated insights</div>
        <div className="flex flex-col gap-2">
          {insights.map((text, i) => (
            <div key={i} className="flex gap-2.5 items-start fs-13">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "var(--brass)" }} />
              <span>{text}</span>
            </div>
          ))}
          {insights.length === 0 && <div className="fs-13 c-muted">No notable outliers this cycle — everything's tracking within normal range.</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="font-display font-semibold fs-15 mb-3">Occupancy by property</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E6EC" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#68708A" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#68708A" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E4E6EC", fontSize: 12.5 }} />
              <Bar dataKey="occRate" fill="#3B5BA0" radius={[6, 6, 0, 0]} name="Occupancy %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-4">
          <div className="font-display font-semibold fs-15 mb-3">Monthly revenue by property</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E6EC" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#68708A" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#68708A" }} axisLine={false} tickLine={false} tickFormatter={v => `KSh ${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={v => fmtMoney(v)} contentStyle={{ borderRadius: 10, border: "1px solid #E4E6EC", fontSize: 12.5 }} />
              <Bar dataKey="revenue" fill="#B08A3E" radius={[6, 6, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-3 border-b divider font-display font-semibold fs-15">Portfolio summary</div>
        <div className="overflow-x-auto">
          <table className="w-full pms-table">
            <thead><tr className="text-left"><th className="py-2.5 pl-4">Property</th><th>Units</th><th>Occupancy</th><th>Rent roll</th><th>Avg rent</th><th>Collection rate</th></tr></thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id} className="row-hover border-t divider">
                  <td className="py-2.5 pl-4 font-medium fs-135">{d.fullName}</td>
                  <td className="fs-13 c-muted">{d.units}</td>
                  <td className="fs-13">{d.occRate}%</td>
                  <td className="fs-13 font-medium">{fmtMoney(d.revenue)}</td>
                  <td className="fs-13 c-muted">{fmtMoney(d.avgRent)}</td>
                  <td className="fs-13" style={{ color: d.collectionRate >= 90 ? "var(--green)" : "var(--amber)" }}>{d.collectionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================= SETTINGS ============================= */
/* ============================= MESSAGES / SMS ============================= */
function MessagesView({ tenants, propertyMap, unitMap, messages, onSend }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [templateId, setTemplateId] = useState(SMS_TEMPLATES[0].id);
  const [body, setBody] = useState(SMS_TEMPLATES[0].body);
  const [recipientSearch, setRecipientSearch] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const activeTenants = tenants.filter(t => t.status !== "Moved Out");
  const q = recipientSearch.trim().toLowerCase();
  const visibleTenants = activeTenants.filter(t => !q || t.name.toLowerCase().includes(q) || propertyMap[t.propertyId].name.toLowerCase().includes(q));

  const toggleTenant = (id) => setSelectedIds(ids => ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]);
  const selectAllVisible = () => setSelectedIds(ids => Array.from(new Set([...ids, ...visibleTenants.map(t => t.id)])));
  const selectLate = () => setSelectedIds(activeTenants.filter(t => t.status === "Late").map(t => t.id));
  const clearSelection = () => setSelectedIds([]);

  const handleTemplateChange = (id) => {
    setTemplateId(id);
    setBody(SMS_TEMPLATES.find(t => t.id === id).body);
  };

  const segments = Math.max(body.length === 0 ? 0 : 1, Math.ceil(body.length / 160));
  const canSend = selectedIds.length > 0 && body.trim().length > 0;

  const previewTenant = selectedIds.length ? tenants.find(t => t.id === selectedIds[0]) : null;
  const previewText = previewTenant
    ? personalizeSms(body, previewTenant, unitMap[previewTenant.unitId], propertyMap[previewTenant.propertyId])
    : body;

  const handleSend = () => {
    const count = onSend(selectedIds, body);
    setConfirmation(`Sent to ${count} tenant${count === 1 ? "" : "s"}.`);
    setSelectedIds([]);
    setTimeout(() => setConfirmation(null), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className="lg:col-span-2 card p-4 flex flex-col gap-3">
        <div className="font-display font-semibold fs-15">Recipients</div>
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 c-muted2" />
          <input value={recipientSearch} onChange={e => setRecipientSearch(e.target.value)} placeholder="Search tenants…" className="input w-full rounded-lg pl-8 pr-3 py-2 fs-125" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={selectAllVisible} className="btn-outline rounded-full px-2.5 py-1 fs-115 font-medium">Select all</button>
          <button onClick={selectLate} className="btn-outline rounded-full px-2.5 py-1 fs-115 font-medium">Select late tenants</button>
          <button onClick={clearSelection} className="btn-outline rounded-full px-2.5 py-1 fs-115 font-medium">Clear</button>
        </div>
        <div className="flex flex-col gap-1 max-h-80 overflow-y-auto border-t divider pt-2">
          {visibleTenants.map(t => {
            const p = propertyMap[t.propertyId], u = unitMap[t.unitId];
            const checked = selectedIds.includes(t.id);
            return (
              <label key={t.id} className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer ${checked ? "bg-FAFAFC" : "row-hover"}`}>
                <input type="checkbox" checked={checked} onChange={() => toggleTenant(t.id)} className="w-4 h-4 shrink-0" />
                <div className="min-w-0">
                  <div className="fs-13 font-medium truncate">{t.name}</div>
                  <div className="fs-115 c-muted truncate">{p.name} №{u.unitNumber} · {t.phone}</div>
                </div>
                {t.status === "Late" && <span className="ml-auto shrink-0"><StatusBadge status="Late" /></span>}
              </label>
            );
          })}
          {visibleTenants.length === 0 && <div className="fs-13 c-muted text-center py-6">No tenants match that search.</div>}
        </div>
        <div className="fs-115 c-muted border-t divider pt-2">{selectedIds.length} recipient{selectedIds.length === 1 ? "" : "s"} selected</div>
      </div>

      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="card p-4 flex flex-col gap-3">
          <div className="font-display font-semibold fs-15">Compose</div>
          <div>
            <label className="fs-115 c-muted block mb-1">Template</label>
            <select value={templateId} onChange={e => handleTemplateChange(e.target.value)} className="input w-full rounded-lg px-3 py-2 fs-135">
              {SMS_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="fs-115 c-muted block mb-1">Message</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={5}
              placeholder="Type your message… use {name}, {property}, {unit}, and {amount} to personalize per recipient"
              className="input w-full rounded-lg px-3 py-2 fs-135"
            />
            <div className="flex justify-between fs-115 c-muted mt-1">
              <span>{body.length} characters</span>
              <span>{segments} SMS segment{segments === 1 ? "" : "s"}</span>
            </div>
          </div>
          {previewTenant && (
            <div className="bg-FAFAFC rounded-lg p-3">
              <div className="fs-11 font-semibold c-muted uppercase tracking-wide mb-1">Preview — {previewTenant.name}</div>
              <div className="fs-13">{previewText}</div>
            </div>
          )}
          <button disabled={!canSend} onClick={handleSend} className="btn-brass rounded-lg py-2.5 fs-135 font-semibold w-full disabled:opacity-40 flex items-center justify-center gap-2">
            <Send size={15} /> Send SMS
          </button>
          {confirmation && <div className="fs-125 text-center" style={{ color: "var(--green)" }}>{confirmation}</div>}
        </div>

        <div className="card overflow-hidden">
          <div className="p-3 border-b divider font-display font-semibold fs-15">Message log</div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full pms-table">
              <thead><tr className="text-left"><th className="py-2.5 pl-4">Recipient</th><th>Message</th><th>Segments</th><th>Sent</th><th>Status</th></tr></thead>
              <tbody>
                {messages.map(m => {
                  const t = tenants.find(x => x.id === m.tenantId);
                  return (
                    <tr key={m.id} className="row-hover border-t divider">
                      <td className="py-2.5 pl-4 font-medium fs-13 whitespace-nowrap">{t ? t.name : "—"}</td>
                      <td className="fs-125 c-muted" style={{ maxWidth: 320 }}>{m.body}</td>
                      <td className="fs-13 c-muted">{m.segments}</td>
                      <td className="fs-13 c-muted whitespace-nowrap">{m.sentAt}</td>
                      <td><StatusBadge status={m.status} /></td>
                    </tr>
                  );
                })}
                {messages.length === 0 && <tr><td colSpan={5} className="py-8 text-center fs-13 c-muted">No messages sent yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  const [form, setForm] = useState({ org: "Gatehouse Property Group", email: "ops@gatehouse.com", timezone: "America/Chicago", notifyLease: true, notifyPayment: true, notifyMaintenance: false });
  return (
    <div className="max-w-xl flex flex-col gap-4">
      <div className="card p-4">
        <div className="font-display font-semibold fs-15 mb-3">Organization</div>
        <label className="fs-125 c-muted block mb-1">Organization name</label>
        <input className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} />
        <label className="fs-125 c-muted block mb-1">Notifications email</label>
        <input className="input w-full rounded-lg px-3 py-2 fs-135" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="card p-4">
        <div className="font-display font-semibold fs-15 mb-3">Alert preferences</div>
        {[["notifyLease", "Lease renewal reminders"], ["notifyPayment", "Late payment alerts"], ["notifyMaintenance", "New maintenance requests"]].map(([key, label]) => (
          <label key={key} className="flex items-center justify-between py-2 border-t divider first:border-t-0 fs-135">
            {label}
            <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })} className="w-4 h-4" />
          </label>
        ))}
      </div>
      <button className="btn-brass rounded-lg py-2.5 fs-135 font-semibold w-fit px-5">Save changes</button>
    </div>
  );
}

/* ============================= REGISTER TENANT MODAL ============================= */
function addMonths(dateStr, months) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function AddTenantModal({ units, propertyMap, presetUnitId, onClose, onSave }) {
  const vacantUnits = units.filter(u => u.status === "vacant");
  const [unitId, setUnitId] = useState(presetUnitId || vacantUnits[0]?.id || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [leaseStart, setLeaseStart] = useState("2026-08-01");
  const [termMonths, setTermMonths] = useState(12);
  const [rent, setRent] = useState(() => units.find(u => u.id === unitId)?.rent || 0);

  useEffect(() => {
    const u = units.find(x => x.id === unitId);
    if (u) setRent(u.rent);
  }, [unitId]);

  const selectedUnit = units.find(u => u.id === unitId);
  const leaseEnd = addMonths(leaseStart, Number(termMonths));
  const canSave = name.trim() && email.trim() && unitId && rent > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 scrim-40" onClick={onClose} />
      <div className="relative card w-full max-w-md p-5 modal-maxh overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-semibold fs-16">Register tenant</div>
          <button onClick={onClose} className="c-muted"><X size={18} /></button>
        </div>

        {vacantUnits.length === 0 ? (
          <div className="fs-13 c-muted py-6 text-center">No vacant units available to assign right now.</div>
        ) : (
          <>
            <label className="fs-125 c-muted block mb-1">Unit</label>
            <select className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" value={unitId} onChange={e => setUnitId(e.target.value)}>
              {vacantUnits.map(u => (
                <option key={u.id} value={u.id}>
                  {propertyMap[u.propertyId].name} — №{u.unitNumber} ({fmtMoney(u.rent)}/mo)
                </option>
              ))}
            </select>

            <label className="fs-125 c-muted block mb-1">Full name</label>
            <input className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" placeholder="e.g. Wanjiku Kariuki" value={name} onChange={e => setName(e.target.value)} />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="fs-125 c-muted block mb-1">Email</label>
                <input type="email" className="input w-full rounded-lg px-3 py-2 fs-135" placeholder="name@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="fs-125 c-muted block mb-1">Phone</label>
                <input className="input w-full rounded-lg px-3 py-2 fs-135" placeholder="07xx xxx xxx" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="fs-125 c-muted block mb-1">Lease start</label>
                <input type="date" className="input w-full rounded-lg px-3 py-2 fs-135" value={leaseStart} onChange={e => setLeaseStart(e.target.value)} />
              </div>
              <div>
                <label className="fs-125 c-muted block mb-1">Lease term</label>
                <select className="input w-full rounded-lg px-3 py-2 fs-135" value={termMonths} onChange={e => setTermMonths(e.target.value)}>
                  <option value={6}>6 months</option>
                  <option value={12}>12 months</option>
                  <option value={24}>24 months</option>
                </select>
              </div>
            </div>

            <label className="fs-125 c-muted block mb-1">Monthly rent (KSh)</label>
            <input type="number" min={0} className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" value={rent} onChange={e => setRent(+e.target.value)} />

            {selectedUnit && (
              <div className="fs-115 c-muted mb-4">Lease will run {fmtDate(leaseStart)} – {fmtDate(leaseEnd)}.</div>
            )}

            <button
              disabled={!canSave}
              onClick={() => onSave({ unitId, name: name.trim(), email: email.trim(), phone: phone.trim(), rent, leaseStart, leaseEnd })}
              className="btn-brass rounded-lg py-2.5 fs-135 font-semibold w-full disabled:opacity-40"
            >
              Register tenant
            </button>
          </>
        )}
      </div>
    </div>
  );
}
/* ============================= ADD PROPERTY MODAL ============================= */
function AddPropertyModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("Residential");
  const [unitsCount, setUnitsCount] = useState(1);
  const canSave = name.trim() && address.trim();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 scrim-40" onClick={onClose} />
      <div className="relative card w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-semibold fs-16">Add property</div>
          <button onClick={onClose} className="c-muted"><X size={18} /></button>
        </div>
        <label className="fs-125 c-muted block mb-1">Property name</label>
        <input className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" placeholder="e.g. Willow Creek Apartments" value={name} onChange={e => setName(e.target.value)} />
        <label className="fs-125 c-muted block mb-1">Address</label>
        <input className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" placeholder="Street, City, State" value={address} onChange={e => setAddress(e.target.value)} />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="fs-125 c-muted block mb-1">Type</label>
            <select className="input w-full rounded-lg px-3 py-2 fs-135" value={type} onChange={e => setType(e.target.value)}>
              <option>Residential</option><option>Commercial</option><option>Mixed Use</option>
            </select>
          </div>
          <div>
            <label className="fs-125 c-muted block mb-1"># of units</label>
            <input type="number" min={1} className="input w-full rounded-lg px-3 py-2 fs-135" value={unitsCount} onChange={e => setUnitsCount(+e.target.value)} />
          </div>
        </div>
        <button disabled={!canSave} onClick={() => onAdd({ id: `p${Date.now()}`, name, address, type, built: 2026, units: unitsCount })}
          className="btn-brass rounded-lg py-2.5 fs-135 font-semibold w-full disabled:opacity-40">
          Add property
        </button>
      </div>
    </div>
  );
}

/* ============================= ADD UNIT MODAL ============================= */
function AddUnitModal({ properties, onClose, onAdd }) {
  const [propertyId, setPropertyId] = useState(properties[0]?.id || "");
  const [unitNumber, setUnitNumber] = useState("");
  const [beds, setBeds] = useState(1);
  const [baths, setBaths] = useState(1);
  const [sqft, setSqft] = useState(700);
  const [rent, setRent] = useState(100000);
  const canSave = propertyId && unitNumber.trim() && rent > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 scrim-40" onClick={onClose} />
      <div className="relative card w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-semibold fs-16">Add unit</div>
          <button onClick={onClose} className="c-muted"><X size={18} /></button>
        </div>

        <label className="fs-125 c-muted block mb-1">Property</label>
        <select className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" value={propertyId} onChange={e => setPropertyId(e.target.value)}>
          {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <label className="fs-125 c-muted block mb-1">Unit number</label>
        <input className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" placeholder="e.g. 107" value={unitNumber} onChange={e => setUnitNumber(e.target.value)} />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="fs-125 c-muted block mb-1">Beds</label>
            <input type="number" min={0} className="input w-full rounded-lg px-3 py-2 fs-135" value={beds} onChange={e => setBeds(+e.target.value)} />
          </div>
          <div>
            <label className="fs-125 c-muted block mb-1">Baths</label>
            <input type="number" min={0} className="input w-full rounded-lg px-3 py-2 fs-135" value={baths} onChange={e => setBaths(+e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="fs-125 c-muted block mb-1">Square feet</label>
            <input type="number" min={0} className="input w-full rounded-lg px-3 py-2 fs-135" value={sqft} onChange={e => setSqft(+e.target.value)} />
          </div>
          <div>
            <label className="fs-125 c-muted block mb-1">Rent (KSh)</label>
            <input type="number" min={0} className="input w-full rounded-lg px-3 py-2 fs-135" value={rent} onChange={e => setRent(+e.target.value)} />
          </div>
        </div>

        <button
          disabled={!canSave}
          onClick={() => onAdd({ propertyId, unitNumber: unitNumber.trim(), beds, baths, sqft, rent })}
          className="btn-brass rounded-lg py-2.5 fs-135 font-semibold w-full disabled:opacity-40"
        >
          Add unit
        </button>
      </div>
    </div>
  );
}

/* ============================= ADD WORK ORDER MODAL ============================= */
function AddWorkOrderModal({ units, propertyMap, onClose, onAdd }) {
  const [unitId, setUnitId] = useState(units[0]?.id || "");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [assigned, setAssigned] = useState("");
  const canSave = unitId && title.trim();
  const categories = ["Plumbing", "Electrical", "HVAC", "Appliance", "Structural", "Pest Control", "General"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 scrim-40" onClick={onClose} />
      <div className="relative card w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-semibold fs-16">Add work order</div>
          <button onClick={onClose} className="c-muted"><X size={18} /></button>
        </div>

        <label className="fs-125 c-muted block mb-1">Unit</label>
        <select className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" value={unitId} onChange={e => setUnitId(e.target.value)}>
          {units.map(u => <option key={u.id} value={u.id}>{propertyMap[u.propertyId].name} — №{u.unitNumber}</option>)}
        </select>

        <label className="fs-125 c-muted block mb-1">Issue</label>
        <input className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" placeholder="e.g. Leaking bathroom faucet" value={title} onChange={e => setTitle(e.target.value)} />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="fs-125 c-muted block mb-1">Category</label>
            <select className="input w-full rounded-lg px-3 py-2 fs-135" value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="fs-125 c-muted block mb-1">Priority</label>
            <select className="input w-full rounded-lg px-3 py-2 fs-135" value={priority} onChange={e => setPriority(e.target.value)}>
              <option>Urgent</option><option>High</option><option>Medium</option><option>Low</option>
            </select>
          </div>
        </div>

        <label className="fs-125 c-muted block mb-1">Assigned to (optional)</label>
        <input className="input w-full rounded-lg px-3 py-2 fs-135 mb-4" placeholder="e.g. Marcus (In-house)" value={assigned} onChange={e => setAssigned(e.target.value)} />

        <button
          disabled={!canSave}
          onClick={() => onAdd({ unitId, title: title.trim(), category, priority, assigned: assigned.trim() })}
          className="btn-brass rounded-lg py-2.5 fs-135 font-semibold w-full disabled:opacity-40"
        >
          Add work order
        </button>
      </div>
    </div>
  );
}

/* ============================= RECORD PAYMENT MODAL ============================= */
function RecordPaymentModal({ payments, tenantMap, onClose, onSave }) {
  const outstanding = payments.filter(p => p.status !== "Paid");
  const [paymentId, setPaymentId] = useState(outstanding[0]?.id || "");
  const [method, setMethod] = useState("ACH Transfer");
  const canSave = !!paymentId;
  const selected = payments.find(p => p.id === paymentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 scrim-40" onClick={onClose} />
      <div className="relative card w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-semibold fs-16">Record payment</div>
          <button onClick={onClose} className="c-muted"><X size={18} /></button>
        </div>

        {outstanding.length === 0 ? (
          <div className="fs-13 c-muted py-6 text-center">Nothing outstanding — every payment this cycle is already recorded as paid.</div>
        ) : (
          <>
            <label className="fs-125 c-muted block mb-1">Outstanding payment</label>
            <select className="input w-full rounded-lg px-3 py-2 fs-135 mb-3" value={paymentId} onChange={e => setPaymentId(e.target.value)}>
              {outstanding.map(p => (
                <option key={p.id} value={p.id}>
                  {tenantMap[p.tenantId].name} — {fmtMoney(p.amount)} ({p.status})
                </option>
              ))}
            </select>

            <label className="fs-125 c-muted block mb-1">Payment method</label>
            <select className="input w-full rounded-lg px-3 py-2 fs-135 mb-4" value={method} onChange={e => setMethod(e.target.value)}>
              <option>ACH Transfer</option><option>Card</option><option>Check</option><option>Cash</option><option>Mobile Money</option>
            </select>

            {selected && (
              <div className="fs-115 c-muted mb-4">
                Marking {fmtMoney(selected.amount)} from {tenantMap[selected.tenantId].name} as paid today.
              </div>
            )}

            <button
              disabled={!canSave}
              onClick={() => onSave({ paymentId, method })}
              className="btn-brass rounded-lg py-2.5 fs-135 font-semibold w-full disabled:opacity-40"
            >
              Record payment
            </button>
          </>
        )}
      </div>
    </div>
  );
}
