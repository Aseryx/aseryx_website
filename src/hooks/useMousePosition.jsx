import { useState, useEffect } from 'react';

/**
 * Custom hook to track mouse position
 * @returns {Object} Mouse position with x and y coordinates
 */
export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouse);
        
        return () => {
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return mousePosition;
};

export default useMousePosition;
