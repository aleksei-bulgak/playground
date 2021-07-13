import React from 'react';
import Overlay from '../overlay';
import flvjs from 'flv.js';

class Player extends React.Component {
  private videoNode!: HTMLVideoElement
  private player!: flvjs.Player

  componentDidMount() {
    this.player = flvjs.createPlayer(
      {
        type: 'flv',
        isLive: true,
        url: 'http://18.192.37.20:8080/live/livestream.flv',
        hasAudio: true,
        hasVideo: true,
      },
      {
        enableStashBuffer: true,
        stashInitialSize: 128,
      }
    )

    flvjs.LoggingControl.enableError = false;
    flvjs.LoggingControl.enableWarn = true;

    this.player.attachMediaElement(this.videoNode);
    this.player.load();
    this.player.play(); // REQUIRES BROWSER PERMISSION!!!
    this.player.on('error', (err) => {
      console.log(err);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return (
      <>
        <video
          controls={true}
          ref={node => this.videoNode = node!}
          height='100%'
          width='100%'
          style={{width: '100vw', height: '100vh'}}
        />
        <Overlay zIndex={1} />
      </>
    );
  }
}

export default Player;
