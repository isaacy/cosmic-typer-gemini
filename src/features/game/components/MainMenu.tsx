import { useEffect, useState } from 'react';
import { useGameStore } from '../../../store/useGameStore';
import { generateCodename } from '../utils/nameGenerator';
import './MainMenu.css';

export const MainMenu = () => {
    const { setPhase, setMode, license, completedLessons, playerName, setPlayerName } = useGameStore();
    const [nameInput, setNameInput] = useState(playerName);

    useEffect(() => {
        if (!playerName) {
            const newName = generateCodename();
            setPlayerName(newName);
            setNameInput(newName);
        }
    }, [playerName, setPlayerName]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNameInput(val);
        setPlayerName(val);
    };

    const handleStartAcademy = () => {
        setMode('ACADEMY');
        setPhase('PLAYING');
    };

    const handleStartSurvival = () => {
        setMode('SURVIVAL');
        setPhase('PLAYING');
    };

    return (
        <div className="main-menu container text-center">
            <h1 className="title">COSMIC TYPER</h1>
            <p className="subtitle">Master the Galaxy, One Keystroke at a Time</p>

            <div className="name-container">
                <label className="name-label">PILOT IDENTITY</label>
                <input
                    type="text"
                    className="name-input"
                    value={nameInput}
                    onChange={handleNameChange}
                    spellCheck={false}
                />
            </div>

            <div className="menu-options">
                <button className="btn-primary" onClick={handleStartAcademy}>
                    <span className="icon">🎓</span>
                    <div className="btn-text">
                        <strong>Generic Academy</strong>
                        <small>Lessons & Training</small>
                    </div>
                </button>

                <button className="btn-secondary" onClick={handleStartSurvival}>
                    <span className="icon">☄️</span>
                    <div className="btn-text">
                        <strong>Survival Mode</strong>
                        <small>Defend against asteroids</small>
                    </div>
                </button>
            </div>

            <div className="profile-summary">
                <p>Welcome, <strong>{nameInput}</strong></p>
                <p>License: <strong>{license.replace('_', ' ')}</strong></p>
                <p>Lessons Completed: {completedLessons.length}</p>
            </div>
        </div>
    );
};
