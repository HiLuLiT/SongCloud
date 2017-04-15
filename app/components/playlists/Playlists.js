import './playlists.scss';

import React from 'react';
import Playlist from '../playlist/Playlist';
import {connect} from 'react-redux';

function Playlists(props) {
  console.info('props from PLAYLISTS', props);
  return (
    <div className="playlists">
      <div className="left-nav">
        <div className="btn-div">
          <button className="new-playlist-btn"
                  onClick={ () => props.addNewPlaylist()}>Add New Playlist
          </button>
        </div>
        <ul className="left-list">
          {props.playlists.map((playlist) => <li key={playlist.id}>
            {playlist.title}</li>
          )}
        </ul>
      </div>

      <div className="playlist-explore">
        {props.playlists.map((playlist, i) => <Playlist key={playlist.id}
                                                        isNewPlayList={props.addedNewPlaylist && i === props.playlists.length - 1}
                                                        playlist={playlist}
                                                        playlists={props.playlists}/>
        )}
      </div>


    </div>
  )
};


function mapDispatchToProps(dispatch) {
  return {
    addNewPlaylist(song) {
      dispatch({
        type: 'IS_NEW_LIST',
        isNewPlaylist: true
      });

      dispatch({
        type: 'ADD_NEW_PLAYLIST',
        song: song,
      })
    }
  }
}


function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
