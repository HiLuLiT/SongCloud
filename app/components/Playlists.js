import React from 'react';
import CreateSong from './CreateSong';

export default function Playlists(props) {
  console.info('PROPS IN PLAYLISTS', props);
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

      <div className="playlist-explore">
        {props.playlists.map((playlist) => {
        console.info('how many times did i run', 'and with what:', playlist);
        return (
          <div key={playlist.id} className="songs-div">
            <div className="header-div">
              <h2>{ playlist.title }</h2>
              <button className="del-btn">Delete</button>
            </div>
            <div>
              <ul className="songs-list">
                {playlist.songs.map((song) => <li key={song.id}>
                  <CreateSong songs={song} updateCurrentTrack={playlist.updateCurrentTrack}/>
                </li>)}
              </ul>
            </div>
            {/*<CreateSong songs={playlist.songs}/>*/}
          </div>
          )
        }) }
          </div>




    </div>
    )};
