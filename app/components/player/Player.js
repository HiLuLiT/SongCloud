import './player.scss';

import React from 'react';
import store from '../../store'

export default function Player(props) {
  const storeData = store.getState();
  console.info(storeData);

  if (!storeData.currentTrack) {
    return <div className="player shifted"/>
  }

  console.info('storeData.CurrentTrack', storeData.currentTrack);
  const songUrl = `${storeData.currentTrack.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
  const songImage = props.song.artwork_url ? props.song.artwork_url : null;
  const songName = props.song.title;
  return (
    <div className="player">

      <div className="player-left-wrap">
        <div className="player-img" style={{backgroundImage: `url(${songImage})`}}></div>
        <span className="song-name">{ songName }</span>
      </div>

      <div className="player-display">
        <audio className="player-elm"
               src={ songUrl }
               controls
               autoPlay/>
      </div>

    </div>
  );
};
