import React from 'react';

/**
 * Floating cursor glow effect that follows mouse movement
 * @param {Object} mousePosition - Mouse position object with x and y coordinates
 */
const CursorGlow = ({ mousePosition }) => {
    return (
        <div 
            className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 transition-all duration-1000 ease-out opacity-20"
            style={{
                background: 'radial-gradient(circle, rgba(252,95,43,0.15) 0%, transparent 70%)',
                left: mousePosition.x - 250,
                top: mousePosition.y - 250,
            }}
        />
    );
};

export default CursorGlow;
