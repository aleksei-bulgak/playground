import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PartialRecord } from '../../custom';
import { ApiContext } from '../../hooks/ApiProvider';
import ControlKey, { ControlKeyData } from './ControlKey';
import { updateActivityStatusForKeysWithCode } from '../../utils';

import { KeyCode, KeyType } from '../../types/key';
import { Api } from '../../types/api';

import left from '../../assets/caret-square-left-regular.svg';
import right from '../../assets/caret-square-right-regular.svg';
import up from '../../assets/caret-square-up-regular.svg';
import bottom from '../../assets/caret-square-down-regular.svg';

import './Controls.css';

type Timers = PartialRecord<KeyCode, number>;

const INITIAL_KEYS_DATA: ControlKeyData[] = [
    { id: 'w', img: up },
    { id: 'a', img: left },
    { id: 's', img: bottom },
    { id: 'd', img: right },
];

const Controls = () => {
    const api = useContext<Api | undefined>(ApiContext);
    const [keys, setKeys] = useState<ControlKeyData[]>(INITIAL_KEYS_DATA);
    let timers = useRef<Timers>({});

    const onClick = useCallback(
        (keyCode: KeyCode, type: KeyType) => {
            clearTimeout(timers.current[keyCode] || undefined);

            setKeys((prev) => updateActivityStatusForKeysWithCode(prev, keyCode, true));
            api?.onAction(keyCode, type);
            timers.current[keyCode] = window.setTimeout(
                () => setKeys((prev) => updateActivityStatusForKeysWithCode(prev, keyCode, false)),
                1000,
            ) as number;
        },
        [api],
    );

    const keyHandler = useCallback(
        (e: KeyboardEvent) => {
            console.log(e)
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
