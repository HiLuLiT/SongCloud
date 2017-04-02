import React from 'react';

export default function Player() {

  return (
    <div className="player-div">
      <div className="song-display-div">
      <img className="player-img" alt="album picture" src="http://imgur.com/a/rFZDz"/>
      <span>Song name</span>
      </div>

      <div className="player-display">
      <audio controls>
        <source src="https://api.soundcloud.com/tracks/79973942/stream?client_id=e582b63d83a5fb2997d1dbf2f62705da" type="audio/ogg"/>
      </audio>
        {/*<i className="fa fa-volume-up volume-font" aria-hidden="true"></i>*/}
        {/*<input className="volume-bar" type="range" min="0" max="100" value="100" step="1"/>*/}
        {/*<i className="fa fa-download download-font" aria-hidden="true"></i>*/}
      </div>
    </div>
  );
};
