import React from 'react';

export default function Player(props) {
  console.info('props inside PLAYER', props);
  const songUrl = `${props.track.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
  const songImage = props.track.artwork_url? props.track.artwork_url :null;
  const songName = props.track.title;

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
