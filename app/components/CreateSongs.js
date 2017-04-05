import React from 'react';


export default function CreateSongs(props) {
  console.info('props inside createsongs', props);
  return (
    <div>
      <ul className="songs-list">
        { props.songs.map((song) => {
          const minutes = Math.floor(parseInt(song.duration) / 60000);
          const seconds = ((parseInt(song.duration % 60000) / 1000).toFixed(0));
          const songDuration = (seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
          const songName = (song.title).slice(0, 30) + '...';
          const imgURL = song.artwork_url? song.artwork_url.replace('large','t300x300'): song.artwork_url;
          return (
            <li key={song.id}>
              <div className="song-img"
                   style={{'backgroundImage': `url(${imgURL})`}}
                   onClick={ ()=> props.updateCurrentTrack(song)}>
              </div>
              <span className="span-song-name">{songName}</span>
              <div>
                <i className="fa fa-clock-o clock-font" aria-hidden="true"></i>
                <span className="span-song-duration">{songDuration}</span>
                <i className="fa fa-heart-o heart-font" aria-hidden="true"></i>
              </div>
            </li>
          )
        }) }

      </ul>
    </div>
  );
}
