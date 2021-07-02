import { KeyCode, KeyType } from './key';

export type Api = {
    onAction: (keyCode: KeyCode, keyType: KeyType) => void;
    subscribe: (callback: () => 'close' | 'open') => void;
};
