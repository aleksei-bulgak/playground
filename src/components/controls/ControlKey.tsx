import React, { useEffect, useCallback, useRef } from 'react';
import { KeyCode } from '../../types/key';
import { OnActionType } from './Controls';
import Button from '@material-ui/core/Button';

//Events to trigger button click animations programaticaly
const initActionEvent = document.createEvent('MouseEvents');
initActionEvent.initEvent('mousedown', true, false);

const endActionEvent = document.createEvent('MouseEvents');
endActionEvent.initEvent('mouseup', true, false);

const triggerButtonAnimation = (button: HTMLButtonElement): void => {
    const element = button.querySelector('.MuiButton-label');
    element?.dispatchEvent(initActionEvent);
    setTimeout(() => element?.dispatchEvent(endActionEvent), 500);
};

export interface ControlKeyData {
    id: KeyCode;
}

const ControlKey: React.FC<{ id: KeyCode; onClick: OnActionType; active: boolean }> = ({ id, onClick, active }) => {
    const ref = useRef<HTMLButtonElement>(null);

    const triggerOnClick = useCallback(():void => {
        onClick(id, 'keydown');
        setTimeout(() => {
            onClick(id, 'keyup')
        }, 500);
    }, [id, onClick]);

    useEffect(() => {
        if (ref.current && active) {
            triggerButtonAnimation(ref.current);
            triggerOnClick();
        }
    }, [active, triggerOnClick]);

    return (
        <Button id={id} className="controls__key" onClick={triggerOnClick} ref={ref}>
            {id}
        </Button>
    );
};

export default ControlKey;
