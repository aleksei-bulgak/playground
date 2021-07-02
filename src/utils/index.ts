import { KeyCode } from '../types/key';
import { ControlKeyData } from '../components/controls/ControlKey';

export const updateActivityStatusForKeysWithCode = (keys: ControlKeyData[], keyCode: KeyCode, active: boolean) =>
    keys.map((key) => {
        if (key.id === keyCode) {
            return { ...key, active };
        }
        return key;
    });
