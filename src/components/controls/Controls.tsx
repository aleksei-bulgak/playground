import { useCallback, useEffect } from 'react';
import ControlKey, { ControlKeyData } from './ControlKey';

import { KeyCode, KeyType } from '../../types/key';

import './Controls.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectionActionKey, setActionKey } from '../../store/slices/gameSlice';

export type OnActionType = (keyCode: KeyCode, type: KeyType) => void;

const keyCodes: KeyCode[] = ['q', 'w', 'e', 'a', 's', 'd'];
const keys: ControlKeyData[] = keyCodes.map((keyCode: KeyCode) => ({id: keyCode}));

const Controls: React.FC<{ onAction: OnActionType }> = ({ onAction }) => {
    const dispatch = useAppDispatch();
    const { actionKey, actionType } = useAppSelector(selectionActionKey);

    const onClick = useCallback(
        (keyCode: KeyCode, type: KeyType) => {
            onAction(keyCode, type);
            dispatch(setActionKey());
        },
        [onAction, dispatch],
    );

    const keyHandler = useCallback(
        (e: KeyboardEvent) => {
            if (keyCodes.indexOf(e.key as KeyCode) !== -1) {
                dispatch(setActionKey({ key: e.key as KeyCode, type: e.type as KeyType }));
            } else {
                return;
            }
        },
        [dispatch],
    );

    useEffect(() => {
        window.addEventListener('keydown', keyHandler);

        return () => {
            window.removeEventListener('keydown', keyHandler);
        };
    }, [keyHandler]);

    return (
        <section className="controls">
            {keys.map((key) => (
                <ControlKey key={key.id} id={key.id} onClick={onClick} active={key.id === actionKey && actionType === 'keydown'}/>
            ))}
        </section>
    );
};

export default Controls;
