import './player.scss';


import React from 'react';


export default function Player(props) {
  if (!props.song) {
    return <div className="player shifted"/>
  }

  const songUrl = `${props.song.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
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
