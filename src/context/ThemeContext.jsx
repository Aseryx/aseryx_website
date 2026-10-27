import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = localStorage.getItem('aseryx-theme');
        if (saved) {
            setTheme(saved);
        }
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const root = document.documentElement;
        root.classList.add('theme-switching');
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('aseryx-theme', theme);
        // Two frames: the first paints the new theme with transitions off.
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
    }, [theme, isMounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
