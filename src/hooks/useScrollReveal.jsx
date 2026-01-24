import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1) to trigger animation
 * @param {string} options.rootMargin - Margin around root element
 * @param {boolean} options.triggerOnce - Only trigger animation once
 * @returns {[React.RefObject, boolean]} - Ref to attach and visibility state
 */
export const useScrollReveal = (options = {}) => {
    const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
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
    const [ref, isVisible] = useScrollReveal(options);
    
    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case 'up': return `translateY(${distance}px)`;
                case 'down': return `translateY(-${distance}px)`;
                case 'left': return `translateX(${distance}px)`;
                case 'right': return `translateX(-${distance}px)`;
                default: return 'none';
            }
        }
        return 'translateY(0) translateX(0)';
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default useScrollReveal;
