import { useState, useEffect } from "react";
import { auth } from "../../api/client";

export default function AdminLogin() {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await auth.login(username, password);
            window.location.href = "/admin/dashboard";
        } catch (err) {
            setLoading(false);
            setError(err.message || "Invalid credentials.");
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    const fadeUp = (delay = 0) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    });

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black px-6 overflow-hidden">
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(34,197,94,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

            <div className="relative w-full max-w-sm" style={{ animation: shake ? "shake 0.4s ease" : "none" }}>
                <style>{`
                    @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
                    @keyframes spin  { to{transform:rotate(360deg)} }
                    input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0px 1000px #0a0a0a inset!important;-webkit-text-fill-color:rgba(255,255,255,0.85)!important;caret-color:white}
                `}</style>

                <div className="mb-10 text-center" style={fadeUp(0.1)}>
                    <a href="/" className="inline-block mb-6 text-white/20 text-xs uppercase tracking-widest hover:text-white/40 transition-colors">← Back to site</a>
                    <div className="mb-2 font-serif text-3xl font-black text-white">Null <span className="text-green-400">SMP</span></div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/30">Admin Access</p>
                </div>

                <div className="rounded-lg border border-white/10 p-8 backdrop-blur-sm" style={{ ...fadeUp(0.2), background: "rgba(255,255,255,0.03)" }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-white/30">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required
                                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "11px 14px", color: "rgba(255,255,255,0.85)", fontSize: "14px", outline: "none", transition: "border-color 0.2s ease", boxSizing: "border-box" }}
                                onFocus={(e) => e.target.style.borderColor = "rgba(34,197,94,0.5)"}
                                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                placeholder="admin" />
                        </div>
                        <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-white/30">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required
                                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "11px 14px", color: "rgba(255,255,255,0.85)", fontSize: "14px", outline: "none", transition: "border-color 0.2s ease", boxSizing: "border-box" }}
                                onFocus={(e) => e.target.style.borderColor = "rgba(34,197,94,0.5)"}
                                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                placeholder="••••••••" />
                        </div>

                        {error && <p className="text-xs text-red-400 tracking-wide">{error}</p>}

                        <button type="submit" disabled={loading}
                            style={{ width: "100%", background: loading ? "rgba(34,197,94,0.4)" : "rgb(21,128,61)", border: "none", borderRadius: "6px", padding: "12px", color: "white", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                            onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = "rgb(22,101,52)"; }}
                            onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = "rgb(21,128,61)"; }}>
                            {loading && <span style={{ width: "13px", height: "13px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />}
                            {loading ? "Verifying…" : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-[10px] text-white/15" style={fadeUp(0.35)}>Unauthorized access is prohibited.</p>
            </div>
        </div>
    );
}