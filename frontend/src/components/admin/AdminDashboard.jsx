import { useState, useEffect } from "react";

const NAV = [
    { id: "overview", label: "Overview", icon: IconGrid },
    { id: "members", label: "Members", icon: IconUsers },
    { id: "whitelist", label: "Whitelist", icon: IconList },
    { id: "announcements", label: "Announcements", icon: IconBell },
    { id: "settings", label: "Settings", icon: IconGear },
];

const MEMBERS = [
    { name: "drakedev", role: "Owner", joined: "2024-01-10", active: true },
    { name: "veloxn", role: "Admin", joined: "2024-02-03", active: true },
    { name: "nullbyte", role: "Member", joined: "2024-03-15", active: true },
    { name: "hexcraft", role: "Member", joined: "2024-04-22", active: false },
    { name: "stackpixel", role: "Member", joined: "2024-05-08", active: true },
    { name: "rustling", role: "Member", joined: "2024-06-01", active: true },
];

const STATS = [
    { label: "Total Members", value: "11", sub: "+2 this month" },
    { label: "Online Now", value: "4", sub: "36% of members" },
    { label: "Pending Apps", value: "3", sub: "Awaiting review" },
    { label: "Server Uptime", value: "99%", sub: "Last 30 days" },
];

function IconGrid() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>; }
function IconUsers() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }
function IconList() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>; }
function IconBell() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>; }
function IconGear() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>; }
function IconLogout() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>; }

function Overview() {
    return (
        <div>
            <h2 className="mb-8 font-serif text-2xl font-black text-white">Overview</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-10">
                {STATS.map((s) => (
                    <div key={s.label} className="rounded-md border border-white/10 bg-white/[0.03] p-6">
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{s.label}</p>
                        <p className="font-serif text-3xl font-bold text-green-400">{s.value}</p>
                        <p className="mt-1 text-xs text-white/30">{s.sub}</p>
                    </div>
                ))}
            </div>

            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-white/30">Recent Activity</h3>
            <div className="rounded-md border border-white/10 bg-white/[0.03] divide-y divide-white/5">
                {[
                    { msg: "nullbyte joined the server", time: "2 hours ago" },
                    { msg: "stackpixel submitted a whitelist application", time: "5 hours ago" },
                    { msg: "Server restarted (scheduled maintenance)", time: "Yesterday" },
                    { msg: "hexcraft was marked inactive", time: "2 days ago" },
                ].map((a, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-4">
                        <p className="text-sm text-white/60">{a.msg}</p>
                        <p className="text-xs text-white/25 ml-4 shrink-0">{a.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Members() {
    const [members, setMembers] = useState(MEMBERS);

    const toggleActive = (name) => {
        setMembers(m => m.map(mem => mem.name === name ? { ...mem, active: !mem.active } : mem));
    };

    const kickMember = (name) => {
        setMembers(m => m.filter(mem => mem.name !== name));
    };

    return (
        <div>
            <h2 className="mb-8 font-serif text-2xl font-black text-white">Members</h2>
            <div className="rounded-md border border-white/10 overflow-hidden">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                            {["Username", "Role", "Joined", "Status", "Actions"].map(h => (
                                <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((m, i) => (
                            <tr key={m.name} style={{ borderBottom: i < members.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                                <td style={{ padding: "14px 20px", fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{m.name}</td>
                                <td style={{ padding: "14px 20px" }}>
                                    <span style={{
                                        fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                                        padding: "3px 8px", borderRadius: "4px",
                                        background: m.role === "Owner" ? "rgba(34,197,94,0.15)" : m.role === "Admin" ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)",
                                        color: m.role === "Owner" ? "rgb(74,222,128)" : m.role === "Admin" ? "rgb(147,197,253)" : "rgba(255,255,255,0.4)",
                                    }}>{m.role}</span>
                                </td>
                                <td style={{ padding: "14px 20px", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>{m.joined}</td>
                                <td style={{ padding: "14px 20px" }}>
                                    <span style={{
                                        display: "inline-flex", alignItems: "center", gap: "5px",
                                        fontSize: "11px", color: m.active ? "rgb(74,222,128)" : "rgba(255,255,255,0.25)",
                                    }}>
                                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: m.active ? "rgb(74,222,128)" : "rgba(255,255,255,0.2)", display: "inline-block" }} />
                                        {m.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td style={{ padding: "14px 20px" }}>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                            onClick={() => toggleActive(m.name)}
                                            style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
                                        >
                                            {m.active ? "Deactivate" : "Activate"}
                                        </button>
                                        {m.role !== "Owner" && (
                                            <button
                                                onClick={() => kickMember(m.name)}
                                                style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "rgba(239,68,68,0.7)", cursor: "pointer" }}
                                            >
                                                Kick
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Whitelist() {
    const [apps, setApps] = useState([
        { name: "codebreaker99", note: "Full-stack dev, loves redstone automation", date: "2025-05-09" },
        { name: "pixelforge", note: "Game dev, plays since 2012", date: "2025-05-08" },
        { name: "asyncawait", note: "Backend engineer, big into infra builds", date: "2025-05-07" },
    ]);

    const resolve = (name) => setApps(a => a.filter(x => x.name !== name));

    return (
        <div>
            <h2 className="mb-2 font-serif text-2xl font-black text-white">Whitelist Applications</h2>
            <p className="mb-8 text-sm text-white/30">{apps.length} pending</p>
            {apps.length === 0 && (
                <p className="text-sm text-white/20 mt-16 text-center">No pending applications.</p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {apps.map((a) => (
                    <div key={a.name} className="rounded-md border border-white/10 bg-white/[0.03] p-5">
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                            <div>
                                <p className="text-sm font-semibold text-white mb-1">{a.name}</p>
                                <p className="text-sm text-white/40 mb-2">{a.note}</p>
                                <p className="text-[11px] text-white/20">{a.date}</p>
                            </div>
                            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                                <button
                                    onClick={() => resolve(a.name)}
                                    style={{ fontSize: "11px", fontWeight: 600, padding: "6px 14px", borderRadius: "5px", border: "none", background: "rgb(21,128,61)", color: "white", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => resolve(a.name)}
                                    style={{ fontSize: "11px", fontWeight: 600, padding: "6px 14px", borderRadius: "5px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "rgba(239,68,68,0.7)", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}
                                >
                                    Deny
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Announcements() {
    const [text, setText] = useState("");
    const [sent, setSent] = useState([]);

    const post = () => {
        if (!text.trim()) return;
        setSent(s => [{ msg: text, date: new Date().toLocaleString() }, ...s]);
        setText("");
    };

    return (
        <div>
            <h2 className="mb-8 font-serif text-2xl font-black text-white">Announcements</h2>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-6 mb-6">
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-white/30">New Announcement</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    placeholder="Write your message here…"
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "12px 14px", color: "rgba(255,255,255,0.8)", fontSize: "14px", outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                    <button
                        onClick={post}
                        style={{ padding: "9px 20px", background: "rgb(21,128,61)", border: "none", borderRadius: "5px", color: "white", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                    >
                        Post
                    </button>
                </div>
            </div>

            {sent.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {sent.map((s, i) => (
                        <div key={i} className="rounded-md border border-white/10 bg-white/[0.02] p-5">
                            <p className="text-sm text-white/70 mb-2">{s.msg}</p>
                            <p className="text-[11px] text-white/20">{s.date}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Settings() {
    return (
        <div>
            <h2 className="mb-8 font-serif text-2xl font-black text-white">Settings</h2>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-6 mb-4">
                <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-white/30">Server Info</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                        { label: "Server Name", val: "Null SMP" },
                        { label: "Version", val: "1.21.4" },
                        { label: "Max Players", val: "20" },
                    ].map(f => (
                        <div key={f.label}>
                            <label style={{ display: "block", marginBottom: "6px", fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{f.label}</label>
                            <input
                                defaultValue={f.val}
                                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "10px 14px", color: "rgba(255,255,255,0.75)", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                            />
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                    <button style={{ padding: "9px 20px", background: "rgb(21,128,61)", border: "none", borderRadius: "5px", color: "white", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="rounded-md border border-red-900/40 bg-red-950/10 p-6">
                <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-red-500/60">Danger Zone</h3>
                <p className="text-sm text-white/30 mb-4">These actions are irreversible.</p>
                <button style={{ padding: "8px 16px", background: "transparent", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "5px", color: "rgba(239,68,68,0.7)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                    Reset Whitelist
                </button>
            </div>
        </div>
    );
}

const PAGES = { overview: Overview, members: Members, whitelist: Whitelist, announcements: Announcements, settings: Settings };

export default function AdminDashboard() {
    const [active, setActive] = useState("overview");
    const [sideOpen, setSideOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 60);
        return () => clearTimeout(t);
    }, []);

    const Page = PAGES[active];

    return (
        <div style={{
            display: "flex", minHeight: "100vh", background: "#080808",
            opacity: visible ? 1 : 0, transition: "opacity 0.5s ease",
        }}>
            <aside style={{
                width: "220px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(0,0,0,0.6)", display: "flex", flexDirection: "column",
                position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40,
                transform: sideOpen ? "translateX(0)" : undefined,
            }} className="hidden md:flex">
                <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontFamily: "serif", fontWeight: 900, fontSize: "18px", color: "white" }}>
                        Null <span style={{ color: "rgb(74,222,128)" }}>SMP</span>
                    </span>
                    <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>Admin Panel</p>
                </div>

                <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    {NAV.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActive(id)}
                            style={{
                                display: "flex", alignItems: "center", gap: "10px",
                                padding: "9px 12px", borderRadius: "6px", border: "none", cursor: "pointer",
                                background: active === id ? "rgba(34,197,94,0.1)" : "transparent",
                                color: active === id ? "rgb(74,222,128)" : "rgba(255,255,255,0.35)",
                                fontSize: "13px", fontWeight: active === id ? 600 : 400,
                                transition: "all 0.15s ease", textAlign: "left", width: "100%",
                            }}
                            onMouseOver={(e) => { if (active !== id) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = active === id ? "rgb(74,222,128)" : "rgba(255,255,255,0.6)"; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = active === id ? "rgba(34,197,94,0.1)" : "transparent"; e.currentTarget.style.color = active === id ? "rgb(74,222,128)" : "rgba(255,255,255,0.35)"; }}
                        >
                            <Icon /> {label}
                        </button>
                    ))}
                </nav>

                <div style={{ padding: "16px 10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button
                        onClick={() => window.location.href = "/"}
                        style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "9px 12px", borderRadius: "6px", border: "none", background: "transparent", color: "rgba(255,255,255,0.25)", fontSize: "13px", cursor: "pointer" }}
                    >
                        <IconLogout /> Log out
                    </button>
                </div>
            </aside>

            <main style={{ flex: 1, marginLeft: "220px", padding: "48px 40px", maxWidth: "100%" }} className="ml-0 md:ml-[220px] p-6 md:p-10">
                <Page />
            </main>
        </div>
    );
}