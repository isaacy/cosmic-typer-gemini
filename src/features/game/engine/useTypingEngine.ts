import { useState, useEffect, useCallback } from 'react';

interface TypingStats {
    wpm: number;
    accuracy: number;
    totalKeystrokes: number;
    correctKeystrokes: number;
}

interface UseTypingEngineProps {
    targetText: string;
    onComplete?: () => void;
    onError?: () => void;
}

export const useTypingEngine = ({ targetText, onComplete, onError }: UseTypingEngineProps) => {
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [stats, setStats] = useState<TypingStats>({
        wpm: 0,
        accuracy: 100,
        totalKeystrokes: 0,
        correctKeystrokes: 0
    });

    // Reset when target text changes
    useEffect(() => {
        setInput('');
        setStartTime(null);
        // Don't fully reset stats if we want to track session stats, but for now reset per word/sentence
    }, [targetText]);

    const calculateStats = useCallback(() => {
        if (!startTime) return;

        const timeElapsedMin = (Date.now() - startTime) / 60000;
        const wordsTyped = input.length / 5; // Standard WPM definition
        const wpm = timeElapsedMin > 0 ? Math.round(wordsTyped / timeElapsedMin) : 0;

        setStats(prev => ({
            ...prev,
            wpm
        }));
    }, [input.length, startTime]);

    // Update WPM periodically
    useEffect(() => {
        if (!startTime || input.length === targetText.length) return;

        const interval = setInterval(calculateStats, 1000);
        return () => clearInterval(interval);
    }, [calculateStats, input.length, targetText.length, startTime]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Ignore special keys
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        if (e.key === 'Backspace') {
            setInput(prev => prev.slice(0, -1));
            return;
        }

        if (e.key.length !== 1) return; // Ignore non-character keys

        setStartTime(prev => prev || Date.now());

        const char = e.key;

        // Check if correct
        const nextIndex = input.length;
        const expectedChar = targetText[nextIndex];

        if (char === expectedChar) {
            const newInput = input + char;
            setInput(newInput);

            setStats(prev => ({
                ...prev,
                totalKeystrokes: prev.totalKeystrokes + 1,
                correctKeystrokes: prev.correctKeystrokes + 1,
                accuracy: Math.round(((prev.correctKeystrokes + 1) / (prev.totalKeystrokes + 1)) * 100)
            }));

            if (newInput === targetText) {
                onComplete?.();
            }
        } else {
            // Error
            onError?.();
            setStats(prev => ({
                ...prev,
                totalKeystrokes: prev.totalKeystrokes + 1,
                accuracy: Math.round((prev.correctKeystrokes / (prev.totalKeystrokes + 1)) * 100)
            }));
        }
    }, [input, targetText, onComplete, onError]);

    // Bind to window for global typing
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return {
        input,
        stats,
        reset: () => {
            setInput('');
            setStartTime(null);
            setStats({
                wpm: 0,
                accuracy: 100,
                totalKeystrokes: 0,
                correctKeystrokes: 0
            });
        }
    };
};
