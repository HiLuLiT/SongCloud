import './player.scss';

import React from 'react';
import { connect } from 'react-redux';


function Player(props) {
  if (!props.currentTrack) {
    return <div className="player shifted"/>
  }

  const songUrl = `${props.currentTrack.stream_url}?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z`;
  const songImage = props.currentTrack.artwork_url ? props.currentTrack.artwork_url : null;
  const songName = props.currentTrack.title;
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

function mapStateToProps(stateData) {
  return {
    currentTrack: stateData.currentTrack
  }
}

export default connect(mapStateToProps)(Player);
