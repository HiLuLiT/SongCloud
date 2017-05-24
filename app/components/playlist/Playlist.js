import './playlist.scss';
import {connect} from 'react-redux';

import React from 'react';
import CreateSong from '../createsong/CreateSong';
import {serverLocation} from '../../serverLocation';

class Playlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isInEditMode: false,
      value: '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  //updating state with playlist title from props AFTER it finishes rendering -
  // if we update directly into state.value it will be undefined since it's still rendering
  componentDidMount() {
    this.setState({
      value: this.props.playlist.title
    });

    if (this.props.isNewPlaylist === true) {
      this.setState({
        isInEditMode: true,
      })
    }

  }

  inputEditMode() {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    });
  }

  handleTitleChange(event) {
    let value = event.target.value;
    let playlistId = this.props.playlist.id;
    this.setState({
      value: value
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverLocation}/edit-title`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', () => {
      // update store with reducer
      this.props.editPlaylistTitle(value, playlistId);
    });

    xhr.addEventListener('error', () => {
      alert('problem!');
    });

    let data = {
      value: value,
      playlistId: playlistId
    };

    // update JSON on server
    xhr.send(JSON.stringify(data));
  }


  handleDeleteList(playlistID) {
    const playlists = this.props.playlists;
    for (const playlist of playlists) {
      if (playlist.id === playlistID) {
        const indexOfList = playlists.indexOf(playlist);
        const isSure = confirm(`Are you sure you want to delete ${playlists[indexOfList].title} ?`);
        if (isSure === true) {

          // update in server
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `${serverLocation}/delete-list`);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.addEventListener('load', () => {
            // update in store
            this.props.deletePlaylist(indexOfList);
          });
          xhr.addEventListener('error', () => {
            alert('problem!');
          });

          let data = {
            indexOfList: indexOfList
          };

          xhr.send(JSON.stringify(data));
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isInEditMode === true) {
      this.nameElement.focus();
      this.props.resetNewPlaylist();
    }
  }

  render() {
    const playlist = this.props.playlist;
    const inputClassName = this.state.isInEditMode ? '' : 'hidden';
    const titleClassName = this.state.isInEditMode ? 'hidden' : '';
    return (
      <div className="playlist">
        <div className="header-div">
          <div className="input-div">
            <label className={ titleClassName }
                   htmlFor={ playlist.id }
                   onClick={ () => this.inputEditMode() }>{ playlist.title }</label>
            <input onBlur={ () => this.inputEditMode() }
                   onChange={this.handleTitleChange}
                   value={this.state.value}
                   className={ inputClassName }
                   id={ playlist.id }
                   type="text"
                   ref={ (element) => this.nameElement = element}>
            </input>
            <div className="counter-bg">
              <span className="counter">{ this.props.playlist.songs.length }</span>
            </div>
          </div>
          <button onClick={ () => this.handleDeleteList(playlist.id)} className="del-btn">Delete</button>
        </div>
        <div>
          { (playlist.songs.length === 0) && <ul className="songs-list">
            <span className="add-songs-msg">Add some songs to this playlist</span>
          </ul>
          }
          { (playlist.songs.length > 0) && <ul className="songs-list">

            {playlist.songs.map((song) => <li key={song.id}>
              <CreateSong song={song}
                          mode="playlists"
                          playlists={this.props.playlists}/>
            </li>)}
          </ul>
          }
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editPlaylistTitle(event, Id) {
      dispatch({
        type: 'EDIT_PLAYLIST_TITLE',
        newTitle: event,
        playlistId: Id,
      });
    },
    resetNewPlaylist() {
      dispatch({
        type: 'IS_NEW_LIST',
        isNewPlaylist: false,
      })
    },
    deletePlaylist(indexOfList) {
      dispatch({
        type: 'DELETE_PLAYLIST',
        indexOfList: indexOfList
      })
    }
  }
}


function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists,
    isNewPlaylist: stateData.isNewPlaylist
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
