import { LicenseLevel } from '../../../store/useGameStore';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    text: string;
    licenseReward?: LicenseLevel;
    requiredKeys: string[];
}

export const ACADEMY_LESSONS: Lesson[] = [
    {
        id: 'lesson-1-home',
        title: 'Lesson 1: The Home Row',
        description: 'Learn the resting position for your fingers.',
        text: 'fff jjj ddd kkk sss lll aaa ;;; fjdksl fjdksl jad flask dad sad',
        licenseReward: 'HOME_ROW',
        requiredKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'Space']
    },
    {
        id: 'lesson-2-top',
        title: 'Lesson 2: Reaching Up',
        description: 'Stretch those fingers to the top row.',
        text: 'qwert yuiop we you top pot toy quit',
        licenseReward: 'TOP_ROW',
        requiredKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    },
    {
        id: 'lesson-3-bottom',
        title: 'Lesson 3: Reaching Down',
        description: 'Master the bottom row keys.',
        text: 'zxcv bnm zxcv bnm van ban man can cab',
        licenseReward: 'BOTTOM_ROW',
        requiredKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    }
];
