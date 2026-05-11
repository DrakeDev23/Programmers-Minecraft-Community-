import { useState, useRef, useEffect } from "react";

export default function Header({ name }) {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const clicks = useRef(0);
    const timer = useRef(null);

    useEffect(() => {
        // Slight delay so the animation feels intentional
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleLogoClick = () => {
        clicks.current += 1;
        if (timer.current) clearTimeout(timer.current);
        if (clicks.current === 5) {
            clicks.current = 0;
            window.location.href = "/admin/login";
            return;
        }
        timer.current = setTimeout(() => { clicks.current = 0; }, 2000);
    };

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
    };

    const links = ["home", "about", "rules", "updates", "team"];

    const barStyle = (pos) => ({
        display: "block",
        height: "1.5px",
        width: "20px",
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: "2px",
        transition: "transform 0.25s ease, opacity 0.25s ease",
        transform:
            pos === "top" && open ? "translateY(7px) rotate(45deg)" :
                pos === "bot" && open ? "translateY(-7px) rotate(-45deg)" :
                    "none",
        opacity: pos === "mid" && open ? 0 : 1,
    });

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-18px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <span
                    onClick={handleLogoClick}
                    className="cursor-pointer select-none font-serif text-xl font-bold text-white"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(-8px)",
                        transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                    }}
                >
                    {name}
                </span>

                <nav
                    className="hidden items-center gap-8 md:flex"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(-8px)",
                        transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
                    }}
                >
                    <ul className="flex items-center gap-8 list-none">
                        {["home", "about", "rules", "updates", "team"].map((l, i) => (
                            <li key={l} style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0)" : "translateY(-6px)",
                                transition: `opacity 0.5s ease ${0.3 + i * 0.07}s, transform 0.5s ease ${0.3 + i * 0.07}s`,
                            }}>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); scrollTo(l); }}
                                    className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white"
                                >
                                    {l.charAt(0).toUpperCase() + l.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <a
                    href="https://discord.gg/yourlink"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden rounded bg-green-700 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-green-800 md:block"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(-8px)",
                        transition: "opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s",
                    }}
                >
                    Join
                </a>

                <button
                    onClick={() => setOpen(!open)}
                    className="flex flex-col gap-1.5 p-1 md:hidden"
                    aria-label="Menu"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    <span style={barStyle("top")} />
                    <span style={barStyle("mid")} />
                    <span style={barStyle("bot")} />
                </button>
            </div>

            <div className={`overflow-hidden bg-black/70 backdrop-blur-xl transition-all duration-300 md:hidden ${open ? "max-h-96" : "max-h-0"}`}>
                <ul className="flex flex-col items-center gap-6 py-8 list-none">
                    {links.map((l) => (
                        <li key={l}>
                            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(l); }} className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">{l}</a>
                        </li>
                    ))}
                    <li>
                        <a href="https://discord.gg/yourlink" target="_blank" rel="noreferrer" className="rounded bg-green-700 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white">Join</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}