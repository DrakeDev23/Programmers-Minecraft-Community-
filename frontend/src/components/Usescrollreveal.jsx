import { useEffect, useRef, useState } from "react";

/** 
 * @param {number} threshold  
 * @param {string} rootMargin 
 */
export function useScrollReveal(threshold = 0.15, rootMargin = "0px 0px -60px 0px") {
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