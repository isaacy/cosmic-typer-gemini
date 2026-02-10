import { LicenseLevel } from '../../../store/useGameStore';


export interface LevelConfig {
    id: string;
    name: string;
    target: number; // Words to clear to pass
    spawnMs: number;
    speedMin: number;
    speedMax: number;
    lives: number;
    requiredLicense: LicenseLevel;
}

export const SURVIVAL_LEVELS: LevelConfig[] = [
    {
        id: 'novice',
        name: 'Novice',
        target: 14,
        spawnMs: 1500,
        speedMin: 5,
        speedMax: 10,
        lives: 5,
        requiredLicense: 'HOME_ROW'
    },
    {
        id: 'apprentice',
        name: 'Apprentice',
        target: 18,
        spawnMs: 1200,
        speedMin: 10,
        speedMax: 15,
        lives: 4,
        requiredLicense: 'TOP_ROW'
    },
    {
        id: 'expert',
        name: 'Expert',
        target: 25,
        spawnMs: 1000,
        speedMin: 15,
        speedMax: 20,
        lives: 3,
        requiredLicense: 'BOTTOM_ROW'
    },
    {
        id: 'master',
        name: 'Master',
        target: 30,
        spawnMs: 800,
        speedMin: 20,
        speedMax: 30,
        lives: 3,
        requiredLicense: 'FULL'
    }
];
