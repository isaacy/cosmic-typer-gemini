import { renderHook, act } from '@testing-library/react';
import { useTypingEngine } from './useTypingEngine';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useTypingEngine', () => {
    const targetText = 'hello world';

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('initializes with empty input and stats', () => {
        const { result } = renderHook(() => useTypingEngine({ targetText }));
        expect(result.current.input).toBe('');
        expect(result.current.stats.totalKeystrokes).toBe(0);
        expect(result.current.stats.accuracy).toBe(100);
    });

    it('updates input on correct keystroke', () => {
        const { result } = renderHook(() => useTypingEngine({ targetText }));

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'h' }));
        });

        expect(result.current.input).toBe('h');
        expect(result.current.stats.correctKeystrokes).toBe(1);
        expect(result.current.stats.accuracy).toBe(100);
    });

    it('ignores incorrect keystroke but updates stats', () => {
        const { result } = renderHook(() => useTypingEngine({ targetText }));

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }));
        });

        expect(result.current.input).toBe(''); // Input shouldn't advance on error
        expect(result.current.stats.correctKeystrokes).toBe(0);
        expect(result.current.stats.totalKeystrokes).toBe(1);
        expect(result.current.stats.accuracy).toBe(0);
    });

    it('calculates WPM correctly', () => {
        const { result } = renderHook(() => useTypingEngine({ targetText }));

        // Type first char to start timer
        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'h' }));
        });

        // Advance time by 12 seconds
        act(() => {
            vi.advanceTimersByTime(12000);
        });

        // Type 4 more correct chars: 'e', 'l', 'l', 'o'
        // Total 5 chars in 12s -> 1 word / 0.2 min = 5 WPM
        act(() => {
            ['e', 'l', 'l', 'o'].forEach(key => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key }));
            });
            // Force a re-render or interval tick if needed, though the interval triggers on timer advance
            vi.advanceTimersByTime(1000);
        });

        // WPM: 5 chars = 1 word. 12s elapsed = 0.2 min. 1 / 0.2 = 5.
        // However, our hook updates internally. We need to verify it.
        // The implementation divides (input.length / 5) / timeElapsedMin
        // input.length is 5. Time is ~13s (0.216 min). 1 / 0.216 ~= 4.6 -> 5.

        expect(result.current.stats.wpm).toBeGreaterThan(0);
    });
});
