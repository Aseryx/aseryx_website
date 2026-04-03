import React from 'react';

export const GeometricShield = ({ className = '' }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 20L170 55V110C170 145 140 175 100 190C60 175 30 145 30 110V55L100 20Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 40L155 65V105C155 135 130 160 100 172C70 160 45 135 45 105V65L100 40Z" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M100 60L140 78V100C140 122 120 142 100 152C80 142 60 122 60 100V78L100 60Z" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <path d="M85 100L95 110L115 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const GeometricCube = ({ className = '' }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 30L170 70V140L100 180L30 140V70L100 30Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 30V100" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 100L170 70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M100 100L30 70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M100 100V180" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M65 50L135 90V160L65 120V50Z" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.6" />
    </svg>
);

export const GeometricSphere = ({ className = '' }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="100" cy="100" rx="70" ry="25" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <ellipse cx="100" cy="100" rx="70" ry="25" stroke="currentColor" strokeWidth="0.75" opacity="0.4" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="70" ry="25" stroke="currentColor" strokeWidth="0.75" opacity="0.4" transform="rotate(120 100 100)" />
        <ellipse cx="100" cy="100" rx="45" ry="15" stroke="currentColor" strokeWidth="0.5" opacity="0.25" transform="rotate(30 100 100)" />
        <ellipse cx="100" cy="100" rx="45" ry="15" stroke="currentColor" strokeWidth="0.5" opacity="0.25" transform="rotate(90 100 100)" />
        <ellipse cx="100" cy="100" rx="45" ry="15" stroke="currentColor" strokeWidth="0.5" opacity="0.25" transform="rotate(150 100 100)" />
    </svg>
);

export const GeometricToroid = ({ className = '' }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="100" rx="80" ry="40" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="100" cy="100" rx="30" ry="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M70 100C70 85 83 72 100 72C117 72 130 85 130 100" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M55 100C55 78 75 60 100 60C125 60 145 78 145 100" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <ellipse cx="100" cy="100" rx="55" ry="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" transform="rotate(30 100 100)" />
        <ellipse cx="100" cy="100" rx="55" ry="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" transform="rotate(-30 100 100)" />
    </svg>
);

export const GeometricPrism = ({ className = '' }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 25L175 100L100 175L25 100L100 25Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 45L160 100L100 155L40 100L100 45Z" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M100 65L140 100L100 135L60 100L100 65Z" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="100" y1="25" x2="100" y2="175" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="25" y1="100" x2="175" y2="100" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.6" />
    </svg>
);

export const GeometricWave = ({ className = '' }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 100C20 100 45 60 70 60C95 60 95 140 120 140C145 140 180 100 180 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 100C20 100 45 70 70 70C95 70 95 130 120 130C145 130 180 100 180 100" stroke="currentColor" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <path d="M20 100C20 100 45 80 70 80C95 80 95 120 120 120C145 120 180 100 180 100" stroke="currentColor" strokeWidth="0.75" opacity="0.3" strokeLinecap="round" />
        <circle cx="70" cy="60" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="120" cy="140" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="20" cy="100" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="180" cy="100" r="2.5" fill="currentColor" opacity="0.4" />
    </svg>
);

export const GeometricHex = ({ className = '' }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 30L157 65V135L100 170L43 135V65L100 30Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 55L137 75V125L100 145L63 125V75L100 55Z" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M100 75L120 87V113L100 125L80 113V87L100 75Z" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
        <line x1="100" y1="30" x2="100" y2="55" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="100" y1="145" x2="100" y2="170" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="43" y1="65" x2="63" y2="75" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="157" y1="65" x2="137" y2="75" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="43" y1="135" x2="63" y2="125" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="157" y1="135" x2="137" y2="125" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.6" />
    </svg>
);

export const GeometricLattice = ({ className = '' }) => (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {[40, 80, 120, 160].map(x =>
            [40, 80, 120, 160].map(y => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="currentColor" opacity="0.4" />
            ))
        )}
        {[40, 80, 120, 160].map(y =>
            [40, 80, 120].map(x => (
                <line key={`h-${x}-${y}`} x1={x} y1={y} x2={x + 40} y2={y} stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
            ))
        )}
        {[40, 80, 120, 160].map(x =>
            [40, 80, 120].map(y => (
                <line key={`v-${x}-${y}`} x1={x} y1={y} x2={x} y2={y + 40} stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
            ))
        )}
        <line x1="40" y1="40" x2="160" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="160" y1="40" x2="40" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.8" />
    </svg>
);
