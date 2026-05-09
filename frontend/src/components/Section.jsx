export default function Section() {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="home" className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
            <h1 className="font-serif text-[clamp(3.5rem,12vw,7.5rem)] font-black leading-none tracking-tight text-white" style={{ textShadow: "0 2px 40px rgba(0,0,0,0.7)" }}>
                Null <span className="text-green-400">SMP</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}>
                A Minecraft server for programmers. Build, collaborate, and hang out with people who think in code.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a href="https://discord.gg/yourlink" target="_blank" rel="noreferrer" className="rounded bg-green-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-green-800">
                    Join the Server
                </a>
                <button onClick={() => scrollTo("about")} className="rounded border border-white/20 px-8 py-3 text-sm font-medium uppercase tracking-widest text-white/70 transition-colors hover:border-white/50 hover:text-white"> Learn More </button>
            </div>

            <button onClick={() => scrollTo("about")} className="mt-20 flex flex-col items-center gap-2 opacity-30 transition-opacity hover:opacity-60">
                <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <line x1="7" y1="0" x2="7" y2="14" stroke="white" strokeWidth="1.2" />
                    <polyline points="2,9 7,15 12,9" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            </button>
        </section>
    );
}