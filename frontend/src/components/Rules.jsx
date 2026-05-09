const rules = [
    { num: "01", title: "Respect everyone's builds", desc: "Don't touch, break, or modify anything that isn't yours without asking first." },
    { num: "02", title: "No griefing", desc: "Any intentional destruction of other players' work results in a permanent ban." },
    { num: "03", title: "Keep it civil", desc: "Disagreements happen. Keep it out of the server and sort it in DMs like adults." },
    { num: "04", title: "Ask before claiming land", desc: "If you're building near someone else, talk to them first. We're not a land-rush server." },
    { num: "05", title: "Stay active", desc: "If you're inactive for 60+ days without notice, your whitelist spot may be given to someone else." },
];

export default function Rules() {
    return (
        <section id="rules" className="px-6 py-28">
            <div className="mx-auto max-w-4xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Rules</p>
                <h2 className="mb-2 font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-tight tracking-tight text-white">
                    How we keep it clean.
                </h2>
                <p className="mb-14 text-sm text-white/40">Short list. Breaking any of these gets you removed.</p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {rules.map((r) => (
                        <div
                            key={r.num}
                            className="rounded-md border border-white/10 bg-black/30 p-7 backdrop-blur-sm transition-colors hover:border-green-900"
                        >
                            <span className="mb-3 block font-serif text-xs font-semibold tracking-widest text-green-400">{r.num}</span>
                            <h3 className="mb-2 text-sm font-semibold text-white">{r.title}</h3>
                            <p className="text-sm leading-relaxed text-white/50">{r.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}