import { useCallback, useEffect, useRef, useState } from 'react';
import { PartialRecord } from '../../custom';
import ControlKey, { ControlKeyData } from './ControlKey';
import { updateActivityStatusForKeysWithCode } from '../../utils';

import { KeyCode, KeyType } from '../../types/key';

import left from '../../assets/caret-square-left-regular.svg';
import right from '../../assets/caret-square-right-regular.svg';
import up from '../../assets/caret-square-up-regular.svg';
import bottom from '../../assets/caret-square-down-regular.svg';

import './Controls.css';

type Timers = PartialRecord<KeyCode, number>;
export type OnActionType = (keyCode: KeyCode, type: KeyType) => void;

const INITIAL_KEYS_DATA: ControlKeyData[] = [
    { id: 'w', img: up },
    { id: 'a', img: left },
    { id: 's', img: bottom },
    { id: 'd', img: right },
];

const Controls: React.FC<{ onAction: OnActionType }> = ({ onAction }) => {
    const [keys, setKeys] = useState<ControlKeyData[]>(INITIAL_KEYS_DATA);
    let timers = useRef<Timers>({});

    const onClick = useCallback(
        (keyCode: KeyCode, type: KeyType) => {
            clearTimeout(timers.current[keyCode] || undefined);

            setKeys((prev) => updateActivityStatusForKeysWithCode(prev, keyCode, true));
            onAction(keyCode, type);
            timers.current[keyCode] = window.setTimeout(
                () => setKeys((prev) => updateActivityStatusForKeysWithCode(prev, keyCode, false)),
                1000,
            ) as number;
        },
        [onAction],
    );

    const keyHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
                onClick(e.key, e.type as KeyType);
            } else {
                return;
            }
        },
        [onClick],
    );

    useEffect(() => {
        window.addEventListener('keydown', keyHandler);
        window.addEventListener('keyup', keyHandler);

        return () => {
            window.removeEventListener('keydown', keyHandler);
            window.removeEventListener('keyup', keyHandler);
        };
    }, [keyHandler]);

    return (
        <section className="controls">
            {keys.map((key) => (
                <ControlKey key={key.id} data={key} onClick={onClick} />
            ))}
        </section>
    );
};

export default Controls;
