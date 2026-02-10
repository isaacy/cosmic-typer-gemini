import { useGameStore } from '../../../store/useGameStore';
import './HUD.css';

interface HUDProps {
    wpm?: number;
    accuracy?: number;
}

export const HUD = ({ wpm = 0, accuracy = 100 }: HUDProps) => {
    const { score, lives, level, mode, setPhase } = useGameStore();

    return (
        <div className="hud-overlay">
            <div className="hud-top">
                <div className="stat-group">
                    <span className="label">SCORE</span>
                    <span className="value">{score.toLocaleString()}</span>
                </div>

                <div className="stat-group center">
                    <span className="mode-label">{mode} - LEVEL {level}</span>
                </div>

                <div className="stat-group right">
                    <button className="btn-small" onClick={() => setPhase('MENU')}>EXIT</button>
                </div>
            </div>

            <div className="hud-bottom">
                <div className="stat-item">
                    <span className="icon">❤️</span>
                    {Array.from({ length: lives }).map((_, i) => (
                        <span key={i} className="heart"></span>
                    ))}
                </div>

                <div className="stat-item">
                    <span className="label">WPM:</span>
                    <span className="value">{wpm}</span>
                </div>

                <div className="stat-item">
                    <span className="label">ACC:</span>
                    <span className="value">{accuracy}%</span>
                </div>
            </div>
        </div>
    );
};
