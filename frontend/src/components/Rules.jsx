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

const rules = [
    { num: "01", title: "Respect everyone's builds", desc: "Don't touch, break, or modify anything that isn't yours without asking first." },
    { num: "02", title: "No griefing", desc: "Any intentional destruction of other players' work results in a permanent ban." },
    { num: "03", title: "Keep it civil", desc: "Disagreements happen. Keep it out of the server and sort it in DMs like adults." },
    { num: "04", title: "Ask before claiming land", desc: "If you're building near someone else, talk to them first. We're not a land-rush server." },
    { num: "05", title: "Stay active", desc: "If you're inactive for 60+ days without notice, your whitelist spot may be given to someone else." },
];

function RuleCard({ rule, index, visible }) {
    return (
        <div
            className="rounded-md border border-white/10 bg-black/30 p-7 backdrop-blur-sm transition-colors hover:border-green-900"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(36px)",
                transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s`,
            }}
        >
            <span className="mb-3 block font-serif text-xs font-semibold tracking-widest text-green-400">{rule.num}</span>
            <h3 className="mb-2 text-sm font-semibold text-white">{rule.title}</h3>
            <p className="text-sm leading-relaxed text-white/50">{rule.desc}</p>
        </div>
    );
}

export default function Rules() {
    const [headingRef, headingVisible] = useScrollReveal(0.1);
    const [gridRef, gridVisible] = useScrollReveal(0.05);

    const fadeUp = (visible, delay = 0) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    });

    return (
        <section id="rules" className="px-6 py-28">
            <div className="mx-auto max-w-4xl">
                <div ref={headingRef}>
                    <p style={fadeUp(headingVisible, 0)} className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">
                        Rules
                    </p>
                    <h2 style={fadeUp(headingVisible, 0.1)} className="mb-2 font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-tight tracking-tight text-white">
                        How we keep it clean.
                    </h2>
                    <p style={fadeUp(headingVisible, 0.2)} className="mb-14 text-sm text-white/40">
                        Short list. Breaking any of these gets you removed.
                    </p>
                </div>

                <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {rules.map((r, i) => (
                        <RuleCard key={r.num} rule={r} index={i} visible={gridVisible} />
                    ))}
                </div>
            </div>
        </section>
    );
}