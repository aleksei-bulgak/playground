import React, { useCallback, useEffect, useRef, useState } from 'react';
import left from '../../assets/caret-square-left-regular.svg';
import right from '../../assets/caret-square-right-regular.svg';
import up from '../../assets/caret-square-up-regular.svg';
import bottom from '../../assets/caret-square-down-regular.svg';
import './Controls.css';
import { PartialRecord } from '../../custom';

type KeyCode = 'ArrowUp' | 'ArrowLeft' | 'ArrowDown' | 'ArrowRight';

interface ControlKeyData {
    id: string;
    img: string;
    keyCode: KeyCode;
    active?: boolean;
}

type Timers = PartialRecord<KeyCode, number>;

const updateActivityStatusForKeysWithCode = (keys: ControlKeyData[], keyCode: string, active: boolean) =>
    keys
        .map((key) => {
            if (key.keyCode === keyCode) {
                return { ...key, active };
            }
            return key;
        });

const ControlKey: React.FC<{ data: ControlKeyData; onClick: any }> = ({ data, onClick }) => {
    return (
        <button
            id={data.id}
            className={`controls__key ${data.active ? 'keyboard__key--active' : ''}`}
            onClick={() => onClick(data.keyCode)}
        >
            {data.id}
            <img src={data.img} alt="keyboard button" className="controls__image" />
        </button>
    );
};

const Controls = () => {
    const [keys, setKeys] = useState<ControlKeyData[]>([
        { id: 'up', img: up, keyCode: 'ArrowUp' },
        { id: 'left', img: left, keyCode: 'ArrowLeft' },
        { id: 'bottom', img: bottom, keyCode: 'ArrowDown' },
        { id: 'right', img: right, keyCode: 'ArrowRight' },
    ]);
    let timers = useRef<Timers>({});

    const onClick = (keyCode: KeyCode) => {
        clearTimeout(timers.current[keyCode] || undefined);

        setKeys((prev) => updateActivityStatusForKeysWithCode(prev, keyCode, true));
        timers.current[keyCode] = window.setTimeout(
            () => setKeys((prev) => updateActivityStatusForKeysWithCode(prev, keyCode, false)),
            1000,
        ) as number;
    };

    const keyHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            onClick(e.key);
        } else {
            return;
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', keyHandler);

        return () => {
            window.removeEventListener('keydown', keyHandler);
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
