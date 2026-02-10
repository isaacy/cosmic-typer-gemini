export type Finger = 'L_PINKY' | 'L_RING' | 'L_MIDDLE' | 'L_INDEX' | 'R_INDEX' | 'R_MIDDLE' | 'R_RING' | 'R_PINKY' | 'THUMB';

export interface KeyConfig {
    key: string;
    label?: string; // For shifted keys or special keys like Enter
    width?: number; // Relative width (1 = standard key)
    finger: Finger;
}

export const KEYBOARD_ROWS: KeyConfig[][] = [
    [
        { key: '`', finger: 'L_PINKY' },
        { key: '1', finger: 'L_PINKY' },
        { key: '2', finger: 'L_RING' },
        { key: '3', finger: 'L_MIDDLE' },
        { key: '4', finger: 'L_INDEX' },
        { key: '5', finger: 'L_INDEX' },
        { key: '6', finger: 'R_INDEX' },
        { key: '7', finger: 'R_INDEX' },
        { key: '8', finger: 'R_MIDDLE' },
        { key: '9', finger: 'R_RING' },
        { key: '0', finger: 'R_PINKY' },
        { key: '-', finger: 'R_PINKY' },
        { key: '=', finger: 'R_PINKY' },
        { key: 'Backspace', width: 2, finger: 'R_PINKY', label: '⌫' },
    ],
    [
        { key: 'Tab', width: 1.5, finger: 'L_PINKY', label: 'Tab' },
        { key: 'q', finger: 'L_PINKY' },
        { key: 'w', finger: 'L_RING' },
        { key: 'e', finger: 'L_MIDDLE' },
        { key: 'r', finger: 'L_INDEX' },
        { key: 't', finger: 'L_INDEX' },
        { key: 'y', finger: 'R_INDEX' },
        { key: 'u', finger: 'R_INDEX' },
        { key: 'i', finger: 'R_MIDDLE' },
        { key: 'o', finger: 'R_RING' },
        { key: 'p', finger: 'R_PINKY' },
        { key: '[', finger: 'R_PINKY' },
        { key: ']', finger: 'R_PINKY' },
        { key: '\\', width: 1.5, finger: 'R_PINKY' },
    ],
    [
        { key: 'CapsLock', width: 1.8, finger: 'L_PINKY', label: 'Caps' },
        { key: 'a', finger: 'L_PINKY' },
        { key: 's', finger: 'L_RING' },
        { key: 'd', finger: 'L_MIDDLE' },
        { key: 'f', finger: 'L_INDEX' },
        { key: 'g', finger: 'L_INDEX' },
        { key: 'h', finger: 'R_INDEX' },
        { key: 'j', finger: 'R_INDEX' },
        { key: 'k', finger: 'R_MIDDLE' },
        { key: 'l', finger: 'R_RING' },
        { key: ';', finger: 'R_PINKY' },
        { key: "'", finger: 'R_PINKY' },
        { key: 'Enter', width: 2.2, finger: 'R_PINKY', label: '↵' },
    ],
    [
        { key: 'Shift', width: 2.4, finger: 'L_PINKY', label: 'Shift' },
        { key: 'z', finger: 'L_PINKY' },
        { key: 'x', finger: 'L_RING' },
        { key: 'c', finger: 'L_MIDDLE' },
        { key: 'v', finger: 'L_INDEX' },
        { key: 'b', finger: 'L_INDEX' },
        { key: 'n', finger: 'R_INDEX' },
        { key: 'm', finger: 'R_INDEX' },
        { key: ',', finger: 'R_MIDDLE' },
        { key: '.', finger: 'R_RING' },
        { key: '/', finger: 'R_PINKY' },
        { key: 'ShiftRight', width: 2.4, finger: 'R_PINKY', label: 'Shift' },
    ],
    [
        { key: 'Space', width: 6.2, finger: 'THUMB', label: ' ' },
    ]
];

export const getFingerForKey = (key: string): Finger | null => {
    const normKey = key.toLowerCase();
    for (const row of KEYBOARD_ROWS) {
        const found = row.find(k => k.key.toLowerCase() === normKey || k.label?.toLowerCase() === normKey);
        if (found) return found.finger;
    }
    if (key === ' ') return 'THUMB';
    return null;
};
