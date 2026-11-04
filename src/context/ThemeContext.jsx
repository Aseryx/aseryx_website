import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

const STORAGE_KEY = 'aseryx-theme';

// Storage throws when the browser blocks site data. The theme then just isn't
// remembered; unguarded, the throw took the whole page down with it. The
// first-paint script in index.html guards it the same way.
const readSavedTheme = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved === 'dark' || saved === 'light' ? saved : null;
    } catch {
        return null;
    }
};

const saveTheme = (theme) => {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // Not remembered for next time; the page still switches.
    }
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const saved = readSavedTheme();
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
        saveTheme(theme);
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
