import React from 'react';
import YouTube from 'react-youtube';
import Overlay from '../overlay';

const Player: React.FC<{ videoId: string }> = ({ videoId }) => {
    return (
        <>
            <YouTube
                id="player"
                containerClassName="player"
                videoId={videoId}
                opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        autoplay: 1,    // start video after player loaded
                        mute: 1,        // volume 0
                        controls: 0,    // disable controls
                        loop: 1,        // repeat video after finish
                        rel: 0,         // view relevant videos disabled
                        showinfo: 0,    // hide video info
                        disablekb: 1,   //disable keyboard
                        fs: 0,          // disable fullscreen button
                        modestbranding: 1,  // less branding
                        iv_load_policy: 3 // disable annotations
                    },
                }}
            />
            <Overlay zIndex={1} />
        </>
    );
};

export default Player;
