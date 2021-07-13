import { useCallback, useEffect } from 'react';
import ControlKey, { ControlKeyData } from './ControlKey';

import { KeyCode, KeyType } from '../../types/key';

import './Controls.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectionActionKey, setActionKey } from '../../store/slices/gameSlice';

export type OnActionType = (keyCode: KeyCode, type: KeyType) => void;

const keys: ControlKeyData[] = [{ id: 'w' }, { id: 'a' }, { id: 's' }, { id: 'd' }];

const Controls: React.FC<{ onAction: OnActionType }> = ({ onAction }) => {
    const dispatch = useAppDispatch();
    const actionKey = useAppSelector(selectionActionKey);

    const onClick = useCallback(
        (keyCode: KeyCode, type: KeyType) => {
            onAction(keyCode, type);
            dispatch(setActionKey());
        },
        [onAction, dispatch],
    );

    const keyHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
                dispatch(setActionKey(e.key));
            } else {
                return;
            }
        },
        [dispatch],
    );

    useEffect(() => {
        window.addEventListener('keydown', keyHandler);
        window.addEventListener('keyup', keyHandler);

        return () => {
            window.removeEventListener('keydown', keyHandler);
            window.removeEventListener('keyup', keyHandler);
        };
    }, [keyHandler]);

    useEffect(() => {
        if (actionKey) {
            (document.querySelector(`#${actionKey} > span.MuiTouchRipple-root`) as HTMLButtonElement)?.click();
        }
    }, [actionKey]);

    return (
        <section className="controls">
            {keys.map((key) => (
                <ControlKey key={key.id} id={key.id} onClick={onClick} />
            ))}
        </section>
    );
};

export default Controls;
