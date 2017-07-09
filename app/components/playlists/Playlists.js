import './playlists.scss';

import uuid from 'uuid';
import React from 'react';
import Playlist from '../playlist/Playlist';
import {connect} from 'react-redux';
import {serverLocation} from '../../serverLocation';


class Playlists extends React.Component {
  constructor() {
    super();
    this.state = {
    };

    this.addNewPlaylistHandler = this.addNewPlaylistHandler.bind(this);
  }


  addNewPlaylistHandler() {
    let newID = uuid();
    let newPlaylist = {
      id: newID,
      title: 'UNTITLED',
      songs: []
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/add-new-playlist`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', () => {
      this.props.addNewPlaylist(newPlaylist);
    });

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    xhr.send(JSON.stringify(newPlaylist));
  }

  buildLeftList() {
    const playlists = this.props.playlists;
    return playlists.map((playlist) => {
                     return <li key={playlist.id}>{playlist.title}</li>
    })
  }

  buildExplore() {
    return this.props.playlists.map((playlist, i) => <Playlist key={playlist.id}
                                                               playlist={playlist}/>
    )
  };

  render() {
    return (
      <div className="playlists">
        <div className="left-nav">
          <div className="btn-div">
            <button className="new-playlist-btn"
                    onClick={ () => this.addNewPlaylistHandler()}>Add New Playlist(!)
            </button>
          </div>
          <ul className="left-list">
            {this.buildLeftList()}
          </ul>
        </div>
        <div className="playlist-explore">
          {this.buildExplore()}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPlaylist(newPlaylist) {
      dispatch({
        type: 'IS_NEW_LIST',
        isNewPlaylist: true
      });
      dispatch({
        type: 'ADD_NEW_PLAYLIST',
        newPlaylistData: newPlaylist
      });
    }
  };
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
