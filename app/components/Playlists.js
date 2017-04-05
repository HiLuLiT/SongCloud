import React from 'react';
import Playlist from './Playlist';

export default function Playlists(props) {
  return (
    <div className="playlist-section">
      <div className="left-nav">
        <div className="btn-div">
          <button className="new-playlist-btn">Add New Playlist</button>
        </div>
        <ul className="left-list">
          {props.playlists.map((playlist) => <li key={playlist.id}>
            {playlist.title}</li>
          )}
        </ul>
      </div>

      <div className="playlist-explore">
        {props.playlists.map((playlist) => <Playlist key={playlist.id} playlist={playlist} updateCurrentTrack={props.updateCurrentTrack}/>
          )}
      </div>


    </div>
  )
};
