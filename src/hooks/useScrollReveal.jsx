import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal that never hides content by default.
 *
 * Elements render visible on the server and on first paint, so the page reads
 * fine without JavaScript or if IntersectionObserver never fires (background
 * tabs, crawlers, screenshots). After mount, only elements still below the
 * viewport are hidden, then revealed once as they scroll in. Reduced-motion
 * users always get the static version.
 *
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1) to trigger animation
 * @param {string} options.rootMargin - Margin around root element
 * @returns {[React.RefObject, 'static' | 'hidden' | 'shown']} - Ref to attach and reveal phase
 */
export const useScrollReveal = (options = {}) => {
    const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options;
    const ref = useRef(null);
    const [phase, setPhase] = useState('static');

    useEffect(() => {
        const element = ref.current;
        if (!element || typeof IntersectionObserver === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        // Already on screen or scrolled past: leave it as rendered.
        if (element.getBoundingClientRect().top < window.innerHeight) return;

        setPhase('hidden');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPhase('shown');
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, phase];
};

const OFFSETS = {
    up: (d) => `translateY(${d}px)`,
    down: (d) => `translateY(-${d}px)`,
    left: (d) => `translateX(${d}px)`,
    right: (d) => `translateX(-${d}px)`,
    none: () => 'none',
};

/**
 * Component wrapper for scroll reveal animations
 */
export const ScrollReveal = ({
    children,
    className = '',
    delay = 0,
    direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
    duration = 600,
    distance = 30,
    ...options
}) => {
    const [ref, phase] = useScrollReveal(options);

    let style;
    if (phase === 'hidden') {
        style = { opacity: 0, transform: (OFFSETS[direction] ?? OFFSETS.none)(distance) };
    } else if (phase === 'shown') {
        style = {
            opacity: 1,
            transform: 'none',
            transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        };
    }

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
};

export default useScrollReveal;
