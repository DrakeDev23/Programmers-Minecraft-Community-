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

// Placeholder updates shown when no admin announcements exist
const PLACEHOLDER_UPDATES = [
    {
        id: 1,
        title: "Server Launched",
        msg: "Null SMP is officially live. Whitelist applications are open — apply on Discord.",
        tag: "update",
        date: "January 10, 2024",
    },
    {
        id: 2,
        title: "Scheduled Maintenance",
        msg: "Server will be down for ~30 minutes on Sunday for world backup and plugin updates.",
        tag: "maintenance",
        date: "February 3, 2024",
    },
    {
        id: 3,
        title: "Build Event",
        msg: "First community build event this weekend. Theme: Brutalist Architecture. No prizes, just vibes.",
        tag: "event",
        date: "March 15, 2024",
    },
];

const tagStyle = (t) => {
    const map = {
        general: { color: "rgba(255,255,255,0.4)" },
        update: { color: "rgb(74,222,128)" },
        maintenance: { color: "rgb(250,204,21)" },
        event: { color: "rgb(196,181,253)" },
        urgent: { color: "rgb(252,165,165)" },
    };
    return map[t] || map.general;
};

export default function Updates({ announcements = [] }) {
    const [headingRef, headingVisible] = useScrollReveal(0.1);
    const [listRef, listVisible] = useScrollReveal(0.05);

    const fadeUp = (visible, delay = 0) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    });

    const items = announcements.length > 0 ? announcements : PLACEHOLDER_UPDATES;

    return (
        <section id="updates" className="border-t border-white/10 px-6 py-28">
            <div className="mx-auto max-w-4xl">
                <div ref={headingRef}>
                    <p style={fadeUp(headingVisible, 0)} className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">
                        Updates
                    </p>
                    <h2 style={fadeUp(headingVisible, 0.1)} className="mb-2 font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-tight tracking-tight text-white">
                        What's going on.
                    </h2>
                    <p style={fadeUp(headingVisible, 0.2)} className="mb-14 text-sm text-white/40">
                        Server news, events, and maintenance notices.
                    </p>
                </div>

                <div ref={listRef} className="flex flex-col gap-0">
                    {items.map((a, i) => {
                        const ts = tagStyle(a.tag);
                        return (
                            <div
                                key={a.id}
                                style={{
                                    display: "flex",
                                    gap: "24px",
                                    ...fadeUp(listVisible, i * 0.1),
                                }}
                            >
                                {/* Timeline */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                                    <div style={{
                                        width: "8px", height: "8px", borderRadius: "50%",
                                        background: ts.color, flexShrink: 0,
                                        boxShadow: `0 0 8px ${ts.color}`,
                                    }} />
                                    {i < items.length - 1 && (
                                        <div style={{ width: "1px", flex: 1, background: "rgba(255,255,255,0.07)", marginTop: "6px", minHeight: "48px" }} />
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, paddingBottom: i < items.length - 1 ? "32px" : "0" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                                        <span style={{ fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{a.title}</span>
                                        <span style={{
                                            fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "3px",
                                            letterSpacing: "0.12em", textTransform: "uppercase",
                                            background: "rgba(255,255,255,0.05)", color: ts.color,
                                            border: `1px solid ${ts.color}22`,
                                        }}>
                                            {a.tag}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.75", marginBottom: "8px" }}>{a.msg}</p>
                                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>{a.date}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}