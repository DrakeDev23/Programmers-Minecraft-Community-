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

function DiscordIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.1.127 18.113a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
        </svg>
    );
}

function GithubIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export default function Footer() {
    const [ref, visible] = useScrollReveal(0.08);

    const fadeUp = (delay = 0) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    });

    return (
        <footer className="border-t border-white/10 bg-black/60 backdrop-blur-md" ref={ref}>
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col gap-12 border-b border-white/10 py-16 md:flex-row md:justify-between">
                    <div style={fadeUp(0)}>
                        <span className="mb-3 block font-serif text-lg font-bold text-white">Null SMP</span>
                        <p className="max-w-[200px] text-sm leading-relaxed text-white/40">
                            A Minecraft server for people who write code
                        </p>
                    </div>

                    <div className="flex gap-16" style={fadeUp(0.15)}>
                        <div>
                            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Navigate</h4>
                            <ul className="space-y-3 list-none">
                                {["home", "about", "rules", "updates"].map((l) => (
                                    < li key={l} >
                                        <a href={`#${l}`} className="text-sm capitalize text-white/50 transition-colors hover:text-white">
                                            {l.charAt(0).toUpperCase() + l.slice(1)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Community</h4>
                            <ul className="space-y-3 list-none">
                                <li><a href="https://discord.gg/yourlink" target="_blank" rel="noreferrer" className="text-sm text-white/50 transition-colors hover:text-white">Discord</a></li>
                                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-white/50 transition-colors hover:text-white">GitHub</a></li>
                                <li><a href="#" className="text-sm text-white/50 transition-colors hover:text-white">Apply</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between" style={fadeUp(0.25)}>
                    <p className="text-xs text-white/30">2025 Null SMP. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        <a href="https://discord.gg/yourlink" target="_blank" rel="noreferrer" className="text-white/30 transition-colors hover:text-white"><DiscordIcon /></a>
                        <a href="https://github.com/DrakeDev23" target="_blank" rel="noreferrer" className="text-white/30 transition-colors hover:text-white"><GithubIcon /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/30 transition-colors hover:text-white"><TwitterIcon /></a>
                    </div>
                </div>
            </div>
        </footer >
    );
}