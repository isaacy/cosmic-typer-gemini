import { KEYBOARD_ROWS } from '../../../utils/keyboardLayout';
import './VirtualKeyboard.css';

interface VirtualKeyboardProps {
    targetKey: string;
}

export const VirtualKeyboard = ({ targetKey }: VirtualKeyboardProps) => {
    return (
        <div className="virtual-keyboard">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((keyConfig, keyIndex) => {
                        const isActive = keyConfig.key.toLowerCase() === targetKey.toLowerCase() ||
                            (keyConfig.key === 'Space' && targetKey === ' ');

                        // Map finger to color CSS var
                        const fingerColorVar = `--color-finger-${keyConfig.finger.toLowerCase().replace('_', '-')}`;

                        return (
                            <div
                                key={keyIndex}
                                className={`key ${isActive ? 'active' : ''}`}
                                style={{
                                    flex: keyConfig.width || 1,
                                    borderColor: isActive ? `var(${fingerColorVar})` : undefined,
                                    backgroundColor: isActive ? `rgba(var(${fingerColorVar}-rgb), 0.2)` : undefined,
                                    boxShadow: isActive ? `0 0 15px var(${fingerColorVar})` : undefined
                                }}
                            >
                                {keyConfig.label || keyConfig.key.toUpperCase()}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
