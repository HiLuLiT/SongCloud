import './playlist.scss';
import {connect} from 'react-redux';

import React from 'react';
import CreateSong from '../createsong/CreateSong';


class Playlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isInEditMode: false,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    let value = event.target.value;
    let playlistId = this.props.playlist.id;
    this.setState({
      value: value
    });
    this.props.editPlaylistTitle(value, playlistId);
  }

  componentDidUpdate() {
    if (this.state.isInEditMode === true) {
      this.nameElement.focus();
      this.props.resetNewPlaylist();
    }

    if (this.props.playlist.id === this.props.scrollTo) {
      this.playlistElm.scrollIntoView({block: "start", behavior: "smooth"});
    }
  }

  render() {
    const playlist = this.props.playlist;
    const inputClassName = this.state.isInEditMode ? '' : 'hidden';
    const titleClassName = this.state.isInEditMode ? 'hidden' : '';
    return (
      <div className="playlist" ref={(elm) => this.playlistElm = elm}>
        <div className="header-div">
          <div className="input-div">
            <label className={ titleClassName }
                   htmlFor={ playlist.id }
                   onClick={ () => this.inputEditMode() }>{ playlist.title }</label>
            <input onBlur={ () => this.inputEditMode() }
                   onChange={this.handleChange}
              // onkeydown={}
                   value={this.state.value}
                   className={ inputClassName }
                   id={ playlist.id }
                   type="text"
                   ref={ (element) => this.nameElement = element}>
            </input>
          </div>
          <button onClick={ () => this.props.deletePlaylist(playlist.id)} className="del-btn">Delete</button>
        </div>
        <div>
          <ul className="songs-list">
            {playlist.songs.map((song) => <li key={song.id}>
              <CreateSong song={song}
                          mode="playlists"
                          playlists={this.props.playlists}/>
            </li>)}
          </ul>
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
    deletePlaylist(Id) {
      dispatch({
        type: 'DELETE_PLAYLIST',
        playlistId: Id,
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
