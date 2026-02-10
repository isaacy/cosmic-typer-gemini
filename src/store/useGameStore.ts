import { create } from 'zustand';

export type GamePhase = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'VICTORY';
export type GameMode = 'ACADEMY' | 'SURVIVAL';
export type LicenseLevel = 'NONE' | 'HOME_ROW' | 'TOP_ROW' | 'BOTTOM_ROW' | 'FULL';

interface GameState {
    phase: GamePhase;
    mode: GameMode;
    score: number;
    lives: number;
    level: number;
    combo: number;

    // Progression
    license: LicenseLevel;
    completedLessons: string[];
    playerName: string;

    // Actions
    setPhase: (phase: GamePhase) => void;
    setMode: (mode: GameMode) => void;
    setPlayerName: (name: string) => void;
    addScore: (points: number) => void;
    completeLesson: (lessonId: string) => void;
    unlockLicense: (license: LicenseLevel) => void;
    damageConfig: () => void; // Reduce lives
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    phase: 'MENU',
    mode: 'ACADEMY',
    score: 0,
    lives: 3,
    level: 1,
    combo: 0,
    license: 'NONE',
    completedLessons: [],
    playerName: '',

    setPhase: (phase) => set({ phase }),
    setMode: (mode) => set({ mode }),
    setPlayerName: (name) => set({ playerName: name }),

    addScore: (points) => set((state) => ({
        score: state.score + points,
        combo: state.combo + 1
    })),

    completeLesson: (lessonId) => set((state) => ({
        completedLessons: [...state.completedLessons, lessonId]
    })),

    unlockLicense: (license) => set({ license }),

    damageConfig: () => set((state) => {
        const newLives = state.lives - 1;
        return {
            lives: newLives,
            combo: 0, // Reset combo on hit
            phase: newLives <= 0 ? 'GAME_OVER' : state.phase
        };
    }),

    resetGame: () => set({
        phase: 'MENU',
        score: 0,
        lives: 3,
        level: 1,
        combo: 0
    })
}));
