export const generateCodename = (): string => {
    const prefixes = ['Cosmic', 'Neon', 'Lunar', 'Solar', 'Astro', 'Cyber', 'Quantum', 'Stellar', 'Galactic', 'Void'];
    const suffixes = ['Viper', 'Eagle', 'Drifter', 'Pilot', 'Rider', 'Knight', 'Surfer', 'Walker', 'Ghost', 'Ace'];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const num = Math.floor(Math.random() * 99) + 1;

    return `${prefix} ${suffix} ${num}`;
};
