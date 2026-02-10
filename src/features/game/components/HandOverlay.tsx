import { getFingerForKey } from '../../../utils/keyboardLayout';
import './HandOverlay.css';

interface HandOverlayProps {
    targetKey: string;
}

export const HandOverlay = ({ targetKey }: HandOverlayProps) => {
    const activeFinger = getFingerForKey(targetKey);

    // Helper to check if a finger is active
    const isFingerActive = (hand: 'L' | 'R', fingerName: string) => {
        if (!activeFinger) return false;
        const [fHand, fName] = activeFinger.split('_');
        if (activeFinger === 'THUMB') return fingerName === 'THUMB'; // Both thumbs or space thumb
        return fHand === hand && fName === fingerName;
    };

    return (
        <div className="hand-overlay">
            {/* Left Hand */}
            <div className="hand left-hand">
                <div className={`finger pinky ${isFingerActive('L', 'PINKY') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-l-pinky)' } as any}></div>
                <div className={`finger ring ${isFingerActive('L', 'RING') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-l-ring)' } as any}></div>
                <div className={`finger middle ${isFingerActive('L', 'MIDDLE') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-l-middle)' } as any}></div>
                <div className={`finger index ${isFingerActive('L', 'INDEX') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-l-index)' } as any}></div>
                <div className={`finger thumb ${isFingerActive('L', 'THUMB') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-thumb)' } as any}></div>
                <div className="palm"></div>
            </div>

            {/* Right Hand */}
            <div className="hand right-hand">
                <div className={`finger thumb ${isFingerActive('R', 'THUMB') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-thumb)' } as any}></div>
                <div className={`finger index ${isFingerActive('R', 'INDEX') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-r-index)' } as any}></div>
                <div className={`finger middle ${isFingerActive('R', 'MIDDLE') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-r-middle)' } as any}></div>
                <div className={`finger ring ${isFingerActive('R', 'RING') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-r-ring)' } as any}></div>
                <div className={`finger pinky ${isFingerActive('R', 'PINKY') ? 'active' : ''}`} style={{ '--finger-color': 'var(--color-finger-r-pinky)' } as any}></div>
                <div className="palm"></div>
            </div>
        </div>
    );
};
