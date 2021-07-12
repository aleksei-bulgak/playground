import React from 'react';
import Overlay from '../overlay';

const Player: React.FC<{videoId?: number}> = ({videoId}) => {

    return (
        <>
            <video>
                <source src={`${process.env.REACT_APP_VIDEO_URL}/${videoId}`} />
            </video>
            <Overlay zIndex={1} />
        </>
    );
};

export default Player;
