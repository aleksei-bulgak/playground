import React from 'react';
import { useContext } from 'react';
import Overlay from '../overlay';
import { ApiContext } from '../../hooks/ApiProvider';
import { Store } from '../../types/store';
import { Api } from '../../types/api';

const Player: React.FC<{}> = () => {
    const data = useContext<(Api & Store) | undefined>(ApiContext);

    return (
        <>
            <video>
                <source src={`${process.env.REACT_APP_VIDEO_URL}/${data?.videoId}`} />
            </video>
            <Overlay zIndex={1} />
        </>
    );
};

export default Player;
