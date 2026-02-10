import { useEffect, useRef, useState, useCallback } from 'react';
import { useGameStore, LicenseLevel } from '../../../store/useGameStore';
import { getRandomWord } from '../utils/wordGenerator';
import { HUD } from '../../game/components/HUD';
import './SurvivalView.css';

import { SURVIVAL_LEVELS } from '../data/levels';

interface Asteroid {
    id: string;
    word: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    speed: number;
    typed: string; // Characters typed so far
}

export const SurvivalView = () => {
    const { addScore, damageConfig, phase, license } = useGameStore();
    const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
    const requestRef = useRef<number>(null);
    const lastTimeRef = useRef<number>(null);
    const spawnTimerRef = useRef<number>(0);

    // Determine current level config based on User's License
    // For now, simpler mapping: NONE/HOME -> Novice, TOP -> Apprentice, etc.
    const currentLevelConfig = SURVIVAL_LEVELS.find(l => l.requiredLicense === license) || SURVIVAL_LEVELS[0];

    // Game Configuration
    const SPAWN_RATE = currentLevelConfig.spawnMs;
    const BASE_SPEED = (currentLevelConfig.speedMin + currentLevelConfig.speedMax) / 2;

    // Active target asteroid (the one being typed)
    const [targetId, setTargetId] = useState<string | null>(null);

    // Lanes: 5 columns at 10%, 30%, 50%, 70%, 90%
    const LANES = [10, 30, 50, 70, 90];

    const spawnAsteroid = useCallback(() => {
        // If no license, default to home row (or we could force a tutorial)
        const effectiveLicense: LicenseLevel = license === 'NONE' ? 'HOME_ROW' : license;

        const word = getRandomWord(effectiveLicense);
        const id = Math.random().toString(36).substr(2, 9);

        // Pick a random lane
        const laneX = LANES[Math.floor(Math.random() * LANES.length)];

        // Check if lane is currently crowded logic could go here, but random is okay for now

        setAsteroids(prev => [
            ...prev,
            {
                id,
                word,
                x: laneX,
                y: -10, // Start above screen
                speed: BASE_SPEED * (0.8 + Math.random() * 0.4), // Randomize speed slightly
                typed: ''
            }
        ]);
    }, [license]);

    const updateGame = useCallback((time: number) => {
        if (lastTimeRef.current !== undefined) {
            const deltaTime = (time - (lastTimeRef.current || time)) / 1000;

            // Spawning
            spawnTimerRef.current += deltaTime * 1000;
            if (spawnTimerRef.current > SPAWN_RATE) {
                spawnAsteroid();
                spawnTimerRef.current = 0;
            }

            // Movement & Collisions
            setAsteroids(prev => {
                const nextAsteroids: Asteroid[] = [];
                let hitBottom = false;

                prev.forEach(ast => {
                    const nextY = ast.y + (ast.speed * deltaTime);
                    if (nextY > 90) {
                        hitBottom = true;
                    } else {
                        nextAsteroids.push({ ...ast, y: nextY });
                    }
                });

                // Queue side effects (using setTimeout to break the synchronous render cycle ensures safety)
                if (hitBottom) {
                    setTimeout(() => {
                        damageConfig();
                        const field = document.querySelector('.survival-view');
                        field?.classList.add('shake');
                        setTimeout(() => field?.classList.remove('shake'), 200);
                    }, 0);
                }

                return nextAsteroids;
            });
        }
        lastTimeRef.current = time;
        requestRef.current = requestAnimationFrame(updateGame);
    }, [spawnAsteroid, damageConfig, SPAWN_RATE]);

    // Game Ready State
    const [isReady, setIsReady] = useState(false);

    // Start/Stop Loop
    useEffect(() => {
        if (phase === 'PLAYING' && isReady) {
            requestRef.current = requestAnimationFrame(updateGame);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
    }, [phase, isReady, updateGame]);


    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (phase !== 'PLAYING' || !isReady) return;
            if (e.key.length !== 1) return; // Ignore non-char keys

            const char = e.key;

            setAsteroids(prev => {
                // Find target
                let target = prev.find(a => a.id === targetId);

                // If no target or target destroyed, find new target matching the key
                if (!target) {
                    const potentialTargets = prev.filter(a => a.word.startsWith(char));
                    // Prioritize closest (highest Y)
                    target = potentialTargets.sort((a, b) => b.y - a.y)[0];

                    if (target) {
                        setTargetId(target.id);
                    } else {
                        return prev;
                    }
                }

                if (target) {
                    const nextCharIndex = target.typed.length;
                    if (target.word[nextCharIndex] === char) {
                        const newTyped = target.typed + char;

                        // Add hit class trigger? (React re-render might suffice for small scale)

                        if (newTyped === target.word) {
                            // Destroyed!
                            addScore(target.word.length * 10);
                            setTargetId(null);
                            // Filter out destroyed
                            return prev.filter(a => a.id !== target.id);
                        } else {
                            // Update typed progress
                            return prev.map(a => a.id === target.id ? { ...a, typed: newTyped } : a);
                        }
                    } else {
                        // Wrong key
                    }
                }

                return prev;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [phase, isReady, targetId, addScore]);

    return (
        <div className="survival-view">
            <div className="game-area">
                {asteroids.map(ast => (
                    <div
                        key={ast.id}
                        className={`asteroid ${ast.id === targetId ? 'target' : ''}`}
                        style={{ left: `${ast.x}%`, top: `${ast.y}%` }}
                    >
                        <span className="typed">{ast.typed}</span>
                        <span className="untyped">{ast.word.slice(ast.typed.length)}</span>
                    </div>
                ))}
            </div>

            {/* Ship / Base at bottom */}
            <div className="ship-base">
                🛡️
            </div>

            <HUD />

            {!isReady && phase === 'PLAYING' && (
                <div className="game-over-overlay">
                    <h1>MISSION BRIEFING</h1>
                    <p>Defend the base from incoming asteroids.</p>
                    <p>Type the words to destroy them.</p>
                    <button className="btn-primary" onClick={() => setIsReady(true)}>
                        START MISSION
                    </button>
                    <button className="btn-secondary" onClick={() => useGameStore.getState().setPhase('MENU')}>
                        ABORT
                    </button>
                </div>
            )}

            {phase === 'GAME_OVER' && (
                <div className="game-over-overlay">
                    <h1>MISSION FAILED</h1>
                    <p>The asteroid defense has been breached.</p>
                    <button className="btn-primary" onClick={() => useGameStore.getState().setPhase('MENU')}>
                        RETURN TO BASE
                    </button>
                    <button className="btn-secondary" onClick={() => window.location.reload()}>
                        RETRY
                    </button>
                </div>
            )}
        </div>
    );
};
