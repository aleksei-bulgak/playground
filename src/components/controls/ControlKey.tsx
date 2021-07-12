import React from 'react';
import { KeyCode } from '../../types/key';
import { OnActionType } from './Controls';

export interface ControlKeyData {
    id: KeyCode;
    img: string;
    active?: boolean;
}

const ControlKey: React.FC<{ data: ControlKeyData; onClick: OnActionType }> = ({ data, onClick }) => {
    return (
        <button
            id={data.id}
            className={`controls__key ${data.active ? 'keyboard__key--active' : ''}`}
            onClick={() => onClick(data.id, 'keydown')}
        >
            {data.id}
            <img src={data.img} alt="keyboard button" className="controls__image" />
        </button>
    );
};

export default ControlKey;
