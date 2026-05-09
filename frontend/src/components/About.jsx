export default function About() {
    return (
        <section id="about" className="border-y border-white/10 bg-black/50 px-6 py-28 backdrop-blur-sm">
            <div className="mx-auto max-w-4xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">About</p>
                <h2 className="mb-12 font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-tight tracking-tight text-white">
                    Built by devs, for devs.
                </h2>

                <div className="grid gap-12 md:grid-cols-[1fr_180px]">
                    <div className="space-y-5">
                        <p className="text-sm leading-[1.9] text-white/60">
                            Null SMP started as a small group of programmers who wanted a place to decompress that wasn't another Slack channel Minecraft was the obvious answer.
                        </p>
                        <p className="text-sm leading-[1.9] text-white/60">
                            We're a whitelisted server, so the community stays small and the builds stay intact. Everyone here writes code for a living or for fun, which means we actually respect each other's work.
                        </p>
                        <p className="text-sm leading-[1.9] text-white/60">
                            No economy plugins, no pay-to-win, no drama. Just a vanilla-ish world where you can build something and it'll still be there next week.
                        </p>
                    </div>

                    <div className="flex flex-row gap-8 md:flex-col md:gap-8">
                        {[
                            { num: "11+", label: "Members" },
                            { num: "26.1.2", label: "Version" },
                        ].map((s) => (
                            <div key={s.label}>
                                <p className="font-serif text-3xl font-bold text-green-400">{s.num}</p>
                                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}