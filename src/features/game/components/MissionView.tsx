import { useTypingEngine } from '../engine/useTypingEngine';
import { useGameStore } from '../../../store/useGameStore';
import { HUD } from './HUD';
import './MissionView.css';

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. Programming is fun and educational for everyone.";

export const MissionView = () => {
    const { addScore, setPhase } = useGameStore();

    const { input, stats } = useTypingEngine({
        targetText: SAMPLE_TEXT,
        onComplete: () => {
            addScore(1000);
            // Simulate level end for now
            setTimeout(() => setPhase('MENU'), 2000); // Back to menu after 2s
        },
        onError: () => {
            // Play sound or shake
        }
    });

    // Render text with highlighting
    const renderText = () => {
        return SAMPLE_TEXT.split('').map((char, index) => {
            let className = "char";
            if (index < input.length) {
                className += input[index] === char ? " correct" : " incorrect";
            } else if (index === input.length) {
                className += " active";
            }
            return <span key={index} className={className}>{char}</span>;
        });
    };

    return (
        <div className="mission-view container">
            <HUD wpm={stats.wpm} accuracy={stats.accuracy} />

            <div className="typing-area">
                <div className="text-display">
                    {renderText()}
                </div>
                <div className="instructions">
                    Type the text above!
                </div>
            </div>
        </div>
    );
};
