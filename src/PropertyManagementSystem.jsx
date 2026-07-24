import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LayoutDashboard, Building2, DoorOpen, Users, FileText, Wrench, Wallet,
  BarChart3, Settings, Search, Bell, Plus, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle2, Clock, TrendingUp, X, MapPin, Phone, Mail,
  Calendar, ChevronDown, Home, ArrowUpRight, ArrowDownRight, Filter,
  MoreHorizontal, Menu
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

/* ============================= THEME ============================= */
const Theme = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

    :root{
      --ink:#12172A; --ink-2:#1B2340; --ink-3:#242D52;
      --paper:#F3F4F7; --card:#FFFFFF; --line:#E4E6EC;
      --text:#191E2B; --muted:#68708A; --muted-2:#8A91A8;
      --brass:#B08A3E; --brass-dark:#8E6E2E; --brass-soft:#F1E6CC;
      --green:#2F7A5D; --green-soft:#E3F1EA;
      --amber:#C17A2C; --amber-soft:#FBEBD9;
      --red:#B4483A; --red-soft:#F8E4E1;
      --blue:#3B5BA0; --blue-soft:#E7ECF7;
    }
    .pms{ font-family:'Inter',sans-serif; color:var(--text); background:var(--paper); }
    .pms *{ box-sizing:border-box; }
    .font-display{ font-family:'Fraunces',serif; }
    .font-mono{ font-family:'IBM Plex Mono',monospace; }

    .sidebar{
      background: linear-gradient(180deg, rgba(19,23,43,0.82), rgba(19,23,43,0.94));
      color:#E9ECF6; position:relative; overflow:hidden;
      backdrop-filter: blur(22px) saturate(170%);
      -webkit-backdrop-filter: blur(22px) saturate(170%);
      border-right: 1px solid rgba(255,255,255,0.08);
      box-shadow: 8px 0 40px rgba(0,0,0,0.18);
    }
    .glass-blob{ position:absolute; border-radius:9999px; filter:blur(46px); pointer-events:none; z-index:0; }
    .blob-a{ width:230px; height:230px; top:-70px; left:-70px; background:radial-gradient(circle, rgba(176,138,62,0.55), transparent 70%); animation: driftA 19s ease-in-out infinite; }
    .blob-b{ width:260px; height:260px; bottom:-90px; right:-100px; background:radial-gradient(circle, rgba(59,91,160,0.5), transparent 70%); animation: driftB 23s ease-in-out infinite; }
    .blob-c{ width:190px; height:190px; top:42%; left:-80px; background:radial-gradient(circle, rgba(47,122,93,0.45), transparent 70%); animation: driftC 27s ease-in-out infinite; }
    @keyframes driftA{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(45px,65px) scale(1.18); } }
    @keyframes driftB{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(-35px,-55px) scale(1.12); } }
    @keyframes driftC{ 0%,100%{ transform:translate(0,0) scale(1); } 50%{ transform:translate(55px,-35px) scale(1.22); } }
    .glass-shine{
      position:absolute; inset:0; z-index:1; pointer-events:none; mix-blend-mode:screen;
      background:linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.05) 38%, rgba(255,255,255,0.12) 46%, rgba(255,255,255,0.05) 54%, transparent 70%);
      background-size:240% 240%;
      animation: shineSweep 10s ease-in-out infinite;
    }
    @keyframes shineSweep{ 0%,100%{ background-position:-50% -50%; } 50%{ background-position:150% 150%; } }
    .sidebar-group-label{ color:#7C87AE; letter-spacing:.08em; position:relative; z-index:2; }
    .nav-rail{ position:relative; z-index:2; }
    .nav-pill{
      position:absolute; top:0; left:8px; right:8px; border-radius:12px; z-index:1; pointer-events:none;
      background:linear-gradient(135deg, rgba(176,138,62,0.32), rgba(176,138,62,0.10));
      border:1px solid rgba(255,255,255,0.16);
      box-shadow:0 6px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.22);
      backdrop-filter: blur(6px);
      transition: transform .5s cubic-bezier(.34,1.56,.64,1), height .4s cubic-bezier(.34,1.56,.64,1), opacity .3s ease;
    }
    .nav-pill::before{ content:''; position:absolute; left:0; top:8px; bottom:8px; width:3px; background:var(--brass); border-radius:0 3px 3px 0; }
    .nav-item{
      color:#C4CADE; position:relative; z-index:2;
      background-color:transparent; background-image:none;
      transition:background-color .2s ease, color .15s ease;
    }
    .nav-item:hover{
      color:#fff; background-color:rgba(255,255,255,0.04);
      background-image: radial-gradient(120px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.18), transparent 65%);
    }
    .nav-item.active{ color:#fff; font-weight:600; }
    .brand-mark{ background:linear-gradient(135deg,var(--brass),var(--brass-dark)); position:relative; z-index:2; box-shadow:0 2px 10px rgba(176,138,62,0.4); }

    .card{ background:var(--card); border:1px solid var(--line); border-radius:14px; }
    .topbar{ background:var(--card); border-bottom:1px solid var(--line); }
    .btn-brass{ background:var(--brass); color:#fff; }
    .btn-brass:hover{ background:var(--brass-dark); }
    .btn-outline{ border:1px solid var(--line); background:#fff; color:var(--text); }
    .btn-outline:hover{ background:#F7F7F9; }
    .input{ border:1px solid var(--line); background:#fff; }
    .input:focus{ outline:none; border-color:var(--brass); box-shadow:0 0 0 3px var(--brass-soft); }

    .badge{ font-size:11px; font-weight:600; padding:3px 9px; border-radius:99px; display:inline-flex; align-items:center; gap:5px; white-space:nowrap; }
    .badge-green{ background:var(--green-soft); color:var(--green); }
    .badge-amber{ background:var(--amber-soft); color:var(--amber); }
    .badge-red{ background:var(--red-soft); color:var(--red); }
    .badge-blue{ background:var(--blue-soft); color:var(--blue); }
    .badge-gray{ background:#EEF0F4; color:var(--muted); }

    .row-hover:hover{ background:#FAFAFC; }
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
  const [addOpen, setAddOpen] = useState(false);
  const [localProperties, setLocalProperties] = useState(properties);
  const [unitsState, setUnitsState] = useState(units);
  const [tenantsState, setTenantsState] = useState(tenants);
  const [leasesState, setLeasesState] = useState(leases);
  const [paymentsState, setPaymentsState] = useState(payments);
  const [maintenanceItems, setMaintenanceItems] = useState(maintenance);
  const [addTenantOpen, setAddTenantOpen] = useState(false);
  const [presetUnitId, setPresetUnitId] = useState(null);
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
    <div className="pms flex h-full w-full" style={{ minHeight: "640px" }}>
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
            <button onClick={() => (section === "tenants" ? setAddTenantOpen(true) : setAddOpen(true))} className="btn-brass rounded-lg px-3 py-2 fs-13 font-semibold flex items-center gap-1.5">
              <Plus size={15} /> <span className="hidden sm:inline">{section === "tenants" ? "Register tenant" : "Add"}</span>
            </button>
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
            <div className="w-9 h-9 rounded-full font-display font-semibold flex items-center justify-center text-white shrink-0" style={{ background: "var(--ink)" }}>JM</div>
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

          {section === "dashboard" && <Dashboard kpis={kpis} alerts={alerts} goTo={goTo} query={query} maintenanceItems={maintenanceItems} leases={leasesState} payments={paymentsState} tenantMap={tenantMap} unitMap={unitMap} propertyMap={propertyMap} />}
          {section === "properties" && <PropertiesView query={query} localProperties={localProperties} goTo={goTo} units={unitsState} />}
          {section === "units" && <UnitsView query={query} pendingFilter={pendingFilter} units={unitsState} propertyMap={propertyMap} tenantMap={tenantMap} onRegisterTenant={(unitId) => { setPresetUnitId(unitId); setAddTenantOpen(true); }} />}
          {section === "tenants" && <TenantsView query={query} onOpen={setDrawerTenant} tenants={tenantsState} propertyMap={propertyMap} unitMap={unitMap} onRegister={() => setAddTenantOpen(true)} />}
          {section === "leases" && <LeasesView query={query} pendingFilter={pendingFilter} leases={leasesState} tenantMap={tenantMap} unitMap={unitMap} propertyMap={propertyMap} />}
          {section === "maintenance" && <MaintenanceView query={query} pendingFilter={pendingFilter} items={maintenanceItems} setItems={setMaintenanceItems} unitMap={unitMap} propertyMap={propertyMap} />}
          {section === "payments" && <PaymentsView query={query} pendingFilter={pendingFilter} payments={paymentsState} tenantMap={tenantMap} propertyMap={propertyMap} />}
          {section === "reports" && <ReportsView properties={localProperties} units={unitsState} />}
          {section === "settings" && <SettingsView />}
        </main>
      </div>

      {drawerTenant && <TenantDrawer tenant={drawerTenant} onClose={() => setDrawerTenant(null)} propertyMap={propertyMap} unitMap={unitMap} leases={leasesState} payments={paymentsState} />}
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
    </div>
  );
}

/* ============================= KPI CARD ============================= */
function KpiCard({ label, value, delta, deltaGood, icon: Icon, accent }) {
  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="fs-125 font-medium c-muted">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent + "18" }}>
          <Icon size={15} style={{ color: accent }} />
        </div>
      </div>
      <div className="font-display font-semibold fs-26 leading-none">{value}</div>
      {delta && (
        <div className={`fs-12 font-medium flex items-center gap-1`} style={{ color: deltaGood ? "var(--green)" : "var(--red)" }}>
          {deltaGood ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta}
        </div>
      )}
    </div>
  );
}

/* ============================= DASHBOARD ============================= */
function Dashboard({ kpis, alerts, goTo, maintenanceItems, leases, payments, tenantMap, unitMap, propertyMap }) {
  const upcoming = leases.filter(l => daysUntil(l.end) <= 60 && daysUntil(l.end) >= 0).sort((a, b) => daysUntil(a.end) - daysUntil(b.end));
  const activity = [
    ...payments.filter(p => p.status !== "Paid").map(p => ({ kind: "payment", date: p.date === "—" ? "2026-07-01" : p.date, text: `${tenantMap[p.tenantId].name} — ${p.status.toLowerCase()} payment of ${fmtMoney(p.amount)}` })),
    ...maintenanceItems.slice(0, 5).map(m => ({ kind: "maintenance", date: m.created, text: `${m.title} reported at ${propertyMap[unitMap[m.unitId].propertyId].name}` })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Occupancy" value={`${kpis.occRate}%`} delta={`${kpis.occupied} of ${kpis.total} units`} deltaGood accent="var(--green)" icon={Home} />
        <KpiCard label="Monthly Rent Roll" value={fmtMoney(kpis.rentRoll)} delta="+2.1% vs last month" deltaGood accent="var(--brass)" icon={Wallet} />
        <KpiCard label="Collected This Cycle" value={fmtMoney(kpis.collected)} delta={`${fmtMoney(kpis.outstanding)} outstanding`} deltaGood={false} accent="var(--blue)" icon={TrendingUp} />
        <KpiCard label="Open Work Orders" value={kpis.openMaint} delta={`${kpis.urgentMaint} high priority`} deltaGood={false} accent="var(--red)" icon={Wrench} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="font-display font-semibold fs-15">Rent roll — billed vs. collected</div>
            <span className="fs-12 c-muted">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={rentRollTrend} margin={{ left: -20, right: 10, top: 5 }}>
              <defs>
                <linearGradient id="billed" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B08A3E" stopOpacity={0.25} /><stop offset="100%" stopColor="#B08A3E" stopOpacity={0} /></linearGradient>
                <linearGradient id="collected" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2F7A5D" stopOpacity={0.35} /><stop offset="100%" stopColor="#2F7A5D" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E6EC" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#68708A" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#68708A" }} axisLine={false} tickLine={false} tickFormatter={(v) => `KSh ${(v / 1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v) => fmtMoney(v)} contentStyle={{ borderRadius: 10, border: "1px solid #E4E6EC", fontSize: 12.5 }} />
              <Area type="monotone" dataKey="billed" stroke="#B08A3E" fill="url(#billed)" strokeWidth={2} name="Billed" />
              <Area type="monotone" dataKey="collected" stroke="#2F7A5D" fill="url(#collected)" strokeWidth={2} name="Collected" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <div className="font-display font-semibold fs-15 mb-3">Needs attention</div>
          <div className="flex flex-col gap-1 max-h-56 overflow-y-auto">
            {alerts.length === 0 && <div className="fs-13 c-muted py-6 text-center">Everything's on track.</div>}
            {alerts.slice(0, 6).map((a, i) => (
              <button key={i} onClick={a.go} className="text-left px-2.5 py-2 rounded-lg row-hover flex gap-2 items-start">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: a.severity === "red" ? "var(--red)" : "var(--amber)" }} />
                <span className="fs-125 leading-snug">{a.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="font-display font-semibold fs-15">Upcoming lease renewals</div>
            <button onClick={() => goTo("leases")} className="fs-125 font-medium" style={{ color: "var(--brass)" }}>View all →</button>
          </div>
          <table className="w-full pms-table">
            <thead><tr className="text-left"><th className="py-2">Tenant</th><th>Unit</th><th>Ends</th><th>Status</th></tr></thead>
            <tbody>
              {upcoming.slice(0, 5).map(l => {
                const t = tenantMap[l.tenantId], u = unitMap[l.unitId], p = propertyMap[l.propertyId];
                return (
                  <tr key={l.id} className="row-hover border-t divider">
                    <td className="py-2.5 font-medium fs-135">{t.name}</td>
                    <td className="fs-13 c-muted">{p.name} <span className="ledger-id">№{u.unitNumber}</span></td>
                    <td className="fs-13">{fmtDate(l.end)}</td>
                    <td><StatusBadge status={l.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

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
    </div>
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
        const hue = ["#B08A3E", "#3B5BA0", "#2F7A5D", "#C17A2C", "#8E6E2E", "#5B4A8A", "#3B5BA0"][i % 7];
        const isOpen = expanded === p.id;
        return (
          <div key={p.id} className="card overflow-hidden flex flex-col">
            <div className="h-24 flex items-end p-4" style={{ background: `linear-gradient(135deg, ${hue}, ${hue}CC)` }}>
              <Building2 size={26} className="text-white icon-90" />
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

function TenantDrawer({ tenant, onClose, propertyMap, unitMap, leases, payments }) {
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
        <div className="card p-3">
          <div className="fs-12 font-semibold c-muted uppercase tracking-wide mb-2">Payment history</div>
          {history.map(h => (
            <div key={h.id} className="flex justify-between items-center py-1.5 border-t divider first:border-t-0 fs-13">
              <span className="c-muted">{h.forMonth}</span>
              <span className="font-medium">{fmtMoney(h.amount)}</span>
              <StatusBadge status={h.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================= LEASES ============================= */
function LeasesView({ query, pendingFilter, leases, tenantMap, unitMap, propertyMap }) {
  const [statusFilter, setStatusFilter] = useState(pendingFilter?.status || "all");
  useEffect(() => { if (pendingFilter?.status) setStatusFilter(pendingFilter.status); }, [pendingFilter]);
  const q = query.trim().toLowerCase();
  const statuses = ["all", "Active", "Expiring Soon", "Ending — Notice Given"];
  const list = leases.filter(l => {
    const t = tenantMap[l.tenantId], p = propertyMap[l.propertyId];
    const matchQ = !q || t.name.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
    const matchS = statusFilter === "all" || l.status === statusFilter;
    return matchQ && matchS;
  }).sort((a, b) => daysUntil(a.end) - daysUntil(b.end));
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
          <thead><tr className="text-left"><th className="py-2.5 pl-4">Tenant</th><th>Property / Unit</th><th>Term</th><th>Rent</th><th>Ends in</th><th>Status</th></tr></thead>
          <tbody>
            {list.map(l => {
              const t = tenantMap[l.tenantId], u = unitMap[l.unitId], p = propertyMap[l.propertyId];
              const d = daysUntil(l.end);
              return (
                <tr key={l.id} className="row-hover border-t divider">
                  <td className="py-2.5 pl-4 font-medium fs-135">{t.name}</td>
                  <td className="fs-13 c-muted">{p.name} <span className="ledger-id">№{u.unitNumber}</span></td>
                  <td className="fs-13">{fmtDate(l.start)} – {fmtDate(l.end)}</td>
                  <td className="fs-13 font-medium">{fmtMoney(l.rent)}</td>
                  <td className="fs-13" style={{ color: d <= 30 ? "var(--red)" : d <= 60 ? "var(--amber)" : "var(--muted)" }}>{d} days</td>
                  <td><StatusBadge status={l.status} /></td>
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
function PaymentsView({ query, pendingFilter, payments, tenantMap, propertyMap }) {
  const [statusFilter, setStatusFilter] = useState(pendingFilter?.status || "all");
  useEffect(() => { if (pendingFilter?.status) setStatusFilter(pendingFilter.status); }, [pendingFilter]);
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
            <thead><tr className="text-left"><th className="py-2.5 pl-4">Tenant</th><th>Property</th><th>For</th><th>Method</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {list.map(pay => {
                const t = tenantMap[pay.tenantId], p = propertyMap[t.propertyId];
                return (
                  <tr key={pay.id} className="row-hover border-t divider">
                    <td className="py-2.5 pl-4 font-medium fs-135">{t.name}</td>
                    <td className="fs-13 c-muted">{p.name}</td>
                    <td className="fs-13 c-muted">{pay.forMonth}</td>
                    <td className="fs-13 c-muted">{pay.method}</td>
                    <td className="fs-13">{fmtDate(pay.date)}</td>
                    <td className="fs-13 font-medium">{fmtMoney(pay.amount)}</td>
                    <td><StatusBadge status={pay.status} /></td>
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
function ReportsView({ properties, units }) {
  const data = properties.map(p => {
    const pu = units.filter(u => u.propertyId === p.id);
    const occ = pu.filter(u => u.tenantId).length;
    const revenue = pu.filter(u => u.tenantId).reduce((s, u) => s + u.rent, 0);
    return { name: p.name.split(" ")[0], occRate: Math.round((occ / pu.length) * 100), revenue };
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card p-4">
        <div className="font-display font-semibold fs-15 mb-3">Occupancy by property</div>
        <ResponsiveContainer width="100%" height={260}>
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
        <ResponsiveContainer width="100%" height={260}>
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
  );
}

/* ============================= SETTINGS ============================= */
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
