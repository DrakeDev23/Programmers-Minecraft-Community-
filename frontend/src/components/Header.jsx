import { useState, useRef } from "react";

export default function Header({ name }) {
    const [open, setOpen] = useState(false);
    const clicks = useRef(0);
    const timer = useRef(null);

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
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <span onClick={handleLogoClick} className="cursor-pointer select-none font-serif text-xl font-bold text-white">{name}</span>

                <nav className="hidden items-center gap-8 md:flex">
                    <ul className="flex items-center gap-8 list-none">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("home"); }} className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">Home</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("about"); }} className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">About</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("rules"); }} className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">Rules</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("updates"); }} className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">Updates</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); scrollTo("team"); }} className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white">Team</a></li>
                    </ul>
                </nav>

                <a href="https://discord.gg/yourlink" target="_blank" rel="noreferrer" className="hidden rounded bg-green-700 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-green-800 md:block">Join</a>

                <button onClick={() => setOpen(!open)} className="flex flex-col gap-1.5 p-1 md:hidden" aria-label="Menu" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <span style={barStyle("top")} />
                    <span style={barStyle("mid")} />
                    <span style={barStyle("bot")} />
                </button>
            </div>

            <div className={`overflow-hidden bg-black/70 backdrop-blur-xl transition-all duration-300 md:hidden ${open ? "max-h-96" : "max-h-0"}`}>
                <ul className="flex flex-col items-center gap-6 py-8 list-none">
                    {links.map((l) => (
                        <li key={l}>
                            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo(l); }} className="text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white"> {l} </a>
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