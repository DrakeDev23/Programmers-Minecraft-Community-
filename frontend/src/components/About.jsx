import { useEffect, useRef, useState } from "react";

function useScrollReveal(threshold = 0.15, rootMargin = "0px 0px -60px 0px") {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, isVisible];
}

export default function About() {
    const [sectionRef, sectionVisible] = useScrollReveal(0.1);
    const [textRef, textVisible] = useScrollReveal(0.15);
    const [statsRef, statsVisible] = useScrollReveal(0.2);

    const fadeUp = (visible, delay = 0) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    });

    return (
        <section id="about" className="border-y border-white/10 bg-black/50 px-6 py-28 backdrop-blur-sm">
            <div className="mx-auto max-w-4xl">
                <div ref={sectionRef}>
                    <p style={fadeUp(sectionVisible, 0)} className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">
                        About
                    </p>
                    <h2 style={fadeUp(sectionVisible, 0.1)} className="mb-12 font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-tight tracking-tight text-white">
                        Built by devs, for devs.
                    </h2>
                </div>

                <div className="grid gap-12 md:grid-cols-[1fr_180px]">
                    <div ref={textRef} className="space-y-5">
                        {[
                            "Null SMP started as a small group of programmers who wanted a place to decompress that wasn't another Slack channel. Minecraft was the obvious answer.",
                            "We're a whitelisted server, so the community stays small and the builds stay intact. Everyone here writes code for a living or for fun, which means we actually respect each other's work.",
                            "No economy plugins, no pay-to-win, no drama. Just a vanilla-ish world where you can build something and it'll still be there next week.",
                        ].map((text, i) => (
                            <p
                                key={i}
                                className="text-sm leading-[1.9] text-white/60"
                                style={fadeUp(textVisible, i * 0.12)}
                            >
                                {text}
                            </p>
                        ))}
                    </div>

                    <div ref={statsRef} className="flex flex-row gap-8 md:flex-col md:gap-8">
                        {[
                            { num: "11+", label: "Members" },
                            { num: "26.1.2", label: "Version" },
                        ].map((s, i) => (
                            <div key={s.label} style={fadeUp(statsVisible, i * 0.15)}>
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