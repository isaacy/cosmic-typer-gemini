import { LicenseLevel } from '../../../store/useGameStore';

export const WORDS_HOME = [
    'sad', 'dad', 'fad', 'gas', 'had', 'lag', 'lad', 'fall', 'ask', 'dash', 'hall', 'flash', 'glass', 'sass', 'flag', 'hash', 'alf', 'gag', 'shall', 'lass', 'slash', 'salad'
];

export const WORDS_TOP = [
    'type', 'rope', 'wire', 'tire', 'wrote', 'query', 'power', 'quiet', 'quite', 'try', 'tower', 'route', 'outer', 'upper', 'yep', 'we', 'you', 'your', 'two', 'quote', 'equip'
];

export const WORDS_BOTTOM = [
    'van', 'ban', 'man', 'can', 'cab', 'zest', 'vest', 'best', 'nest', 'cave', 'name', 'bane', 'mane', 'cane', 'zone', 'bone', 'move'
];

export const WORDS_FULL = [
    'planet', 'rocket', 'meteor', 'galaxy', 'orbit', 'comet', 'stars', 'nebula', 'launch', 'space', 'lunar', 'solar', 'cosmos', 'gravity', 'crater', 'module', 'saturn', 'venus', 'mercury', 'jupiter', 'asteroid', 'signal', 'telescope', 'astronaut', 'mission', 'science', 'future', 'robot', 'cursor', 'engine'
];

export const WORDS_MASTER = [
    'stardust,', 'orbital.', 'gravity,', 'cosmic.', 'mission,', 'trajectory.', 'navigation,', 'booster.', 'launchpad,', 'science.', 'telescope,', 'explorer.', 'asteroids,', 'galactic.', 'magnetism,', 'discovery.'
];

export const getWordsForLicense = (license: LicenseLevel): string[] => {
    let words: string[] = [...WORDS_HOME];

    if (license === 'TOP_ROW' || license === 'BOTTOM_ROW' || license === 'FULL') {
        words = [...words, ...WORDS_TOP];
    }

    if (license === 'BOTTOM_ROW' || license === 'FULL') {
        words = [...words, ...WORDS_BOTTOM];
    }

    if (license === 'FULL') {
        // Include everything for full license
        words = [...words, ...WORDS_FULL, ...WORDS_MASTER];
    }

    return words;
};

export const getRandomWord = (license: LicenseLevel): string => {
    const words = getWordsForLicense(license);
    return words[Math.floor(Math.random() * words.length)];
};
