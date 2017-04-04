import React from 'react';
import CreateSongs from './CreateSongs';

export default function Playlists(props) {
  console.info(props);
  return (
    <div className="playlist-section">
      <div className="left-nav">
        <div className="btn-div">
          <button className="new-playlist-btn">Add New Playlist</button>
        </div>
        <ul className="left-list">
          <li>My Songs</li>
          <li>Cool Trance Music</li>
          <li>House Party 2017</li>
          <li>Old</li>
          <li>Reggae</li>
        </ul>
      </div>

      {props.playlists.map((playlist) => {
        console.info(playlist);
        return (
        <div className="playlist-explore">
          <div className="songs-div">
            <div className="header-div">
              <h2>{ playlist.title }</h2>
              <button className="del-btn">Delete</button>
            </div>
            <CreateSongs songs={playlist.songs}/>
          </div>
        </div>
        )
      }) }

    </div>
    )};
