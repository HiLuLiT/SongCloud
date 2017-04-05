import React from 'react';

export default function CreateSong(props) {
  console.info('updatecurrent', props.updateCurrentTrack);
  const song = props.songs;
  const minutes = Math.floor(parseInt(song.duration) / 60000);
  const seconds = ((parseInt(song.duration % 60000) / 1000).toFixed(0));
  const songDuration = (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  const imgURL = song.artwork_url ? song.artwork_url.replace('large', 't300x300') : song.artwork_url;
  const songName = (song.title).slice(0, 30) + '...';
  return (
    <div>
      <div className="song-img"
           style={{'backgroundImage': `url(${imgURL})`}}
           onClick={ () => props.updateCurrentTrack(song)}>
      </div>
      <span className="span-song-name">{songName}</span>
      <div>
        <i className="fa fa-clock-o clock-font" aria-hidden="true"></i>
        <span className="span-song-duration">{ songDuration }</span>

        <div className="heart-playlist-div">
        <i className="fa fa-heart-o heart-font" aria-hidden="true"></i>

          <div className="add-playlist-dropdown">
            <div className="add-edit-div">
              <span>Add To Playlist</span>
              <button>Create Playlist +</button>
            </div>
            <div className="playlist-checkbox-div">

              <label for="cbox1"> First
                <input type="checkbox" id="cb1" value="cb1"/>
              </label>


              <label for="cbox2">Second
                <input type="checkbox" id="cb2" value="cb1"/>
              </label>

              <label for="cbox3">Third
                <input type="checkbox" id="cb3" value="cb1"/>
              </label>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}
