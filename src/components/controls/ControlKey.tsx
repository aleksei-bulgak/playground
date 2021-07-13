import React from 'react';
import { KeyCode } from '../../types/key';
import { OnActionType } from './Controls';
import Button from '@material-ui/core/Button';

export interface ControlKeyData {
    id: KeyCode;
}

const ControlKey: React.FC<{ id: KeyCode; onClick: OnActionType; }> = ({ id, onClick }) => {

    return (
        <Button
            id={id}
            className='controls__key'
            onClick={() => onClick(id, 'keydown')}
        >
            {id}
        </Button>
    );
};

export default ControlKey;
