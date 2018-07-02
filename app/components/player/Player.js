import './player.scss';

import React from 'react';
import { connect } from 'react-redux';


class Player extends React.Component {
  constructor() {
    super();

    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isPlaying === true) {
      this.player.play();
    }
    if (this.props.isPlaying === false) {
      this.player.pause();
    }
  }

  onPlay() {
    const playingMode= true;
    this.props.handlePlayMode(playingMode)
  }

  onPause() {
    const playingMode= false;
    this.props.handlePlayMode(playingMode)
  }


  render() {
  if (!this.props.currentTrack) {
    return <div className="player shifted"/>
  }

  const songUrl = `${this.props.currentTrack.stream_url}?client_id=unnFdubicpq7RVFFsQucZzduDPQTaCYy`;
  const songImage = this.props.currentTrack.artwork_url ? this.props.currentTrack.artwork_url : null;
  const songName = this.props.currentTrack.title;

  return (
    <div className="player">
      <div className="player-left-wrap">
        <div className="player-img" style={{backgroundImage: `url(${songImage})`}}/>
        <span className="song-name">{ songName }</span>
      </div>

      <div className="player-display">
        <audio className="player-elm"
               src={ songUrl }
               controls
               ref={(elm) => {this.player = elm}}
               onPlay={this.onPlay}
               onPause={this.onPause}
               autoPlay
               />
      </div>
    </div>
  );}
}


function mapDispatchToProps(dispatch) {
  return {
    handlePlayMode(playingMode) {
      dispatch({
        type: 'IS_IN_PLAY_MODE',
        isPlaying: playingMode
      })
    },
  }
}

function mapStateToProps(stateData) {
  return {
    currentTrack: stateData.currentTrack,
    isPlaying: stateData.isInPlayMode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
