import React from 'react';

export default function Player(props) {
  const songUrl = `${props.song.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
  const songImage = props.song.artwork_url? props.song.artwork_url :null;
  const songName = props.song.title;

  return (
    <div className="player-div">

      <div className="player-left-wrap">
      <div className="player-img" style={{backgroundImage:`url(${songImage})`}}/>
      <span className="song-name">{ songName }</span>
      </div>

      <div className="player-display">
      <audio className="player"
             src={ songUrl }
             controls
             autoPlay/>
      </div>
    </div>
  );
};
