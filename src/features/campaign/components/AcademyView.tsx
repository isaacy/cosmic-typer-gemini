import { useState } from 'react';
import { useTypingEngine } from '../../game/engine/useTypingEngine';
import { useGameStore } from '../../../store/useGameStore';
import { VirtualKeyboard } from '../../game/components/VirtualKeyboard';
import { HandOverlay } from '../../game/components/HandOverlay';
import { HUD } from '../../game/components/HUD';
import { ACADEMY_LESSONS } from '../data/lessons';
import './AcademyView.css';

export const AcademyView = () => {
    const { setPhase, completeLesson, unlockLicense } = useGameStore();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const currentLesson = ACADEMY_LESSONS[currentLessonIndex];

    const { input, stats, reset } = useTypingEngine({
        targetText: currentLesson.text,
        onComplete: () => {
            // Lesson Complete!
            setTimeout(() => {
                completeLesson(currentLesson.id);
                if (currentLesson.licenseReward) {
                    unlockLicense(currentLesson.licenseReward);
                }

                if (currentLessonIndex < ACADEMY_LESSONS.length - 1) {
                    setCurrentLessonIndex(prev => prev + 1);
                    reset();
                } else {
                    // All lessons done
                    setPhase('MENU');
                }
            }, 1000);
        },
        onError: () => {
            // Error feedback
        }
    });

    const nextChar = currentLesson.text[input.length] || '';

    const renderText = () => {
        return currentLesson.text.split('').map((char, index) => {
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
        <div className="academy-view container">
            <HUD wpm={stats.wpm} accuracy={stats.accuracy} />

            <div className="lesson-header">
                <h2>{currentLesson.title}</h2>
                <p>{currentLesson.description}</p>
            </div>

            <div className="typing-area">
                <div className="text-display">
                    {renderText()}
                </div>
            </div>

            <div className="visual-aids">
                <div className="keyboard-container">
                    <VirtualKeyboard targetKey={nextChar} />
                </div>
                <div className="hands-container">
                    <HandOverlay targetKey={nextChar} />
                </div>
            </div>
        </div>
    );
};
