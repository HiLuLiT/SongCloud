import './playlist.scss';

import React from 'react';
import CreateSong from '../createsong/CreateSong';


export default class Playlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isInEditMode: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }


  //updating state with playlist title from props AFTER it finishes rendering -
  // if we update directly into state.value it will be undefined since it's still rendering
  componentDidMount() {
    console.info('componentDidMount');
    if (this.props.isNewPlayList) {
      // this.nameElement.focus();

      this.setState({
        isInEditMode: true
      }, () => {
        // call resetAddedPlaylist
      });
    }
  }

  inputEditMode() {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }

  handleChange(event) {
    let newTitleValue = event.target.value;
    this.props.editPlaylistTitle(this.props.playlist.id, newTitleValue);
  }

  componentDidUpdate(prevProps, prevState) {
    console.info('componentDidUpdate');
    if (this.state.isInEditMode === true && prevState.isInEditMode === false) {
      this.nameElement.focus();
    }
  }

  render() {
    console.info('componentRendered');
    console.info(this.state.isInEditMode);
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
                   onChange={this.handleChange}
              // onkeydown={}
                   value={this.props.playlist.title}
              // placeholder={playlist.title}
                   className={ inputClassName }
                   id={ playlist.id }
                   type="text"
                   ref={ (element) => this.nameElement = element}>
            </input>
          </div>
          <button className="del-btn">Delete</button>
        </div>
        <div>
          <ul className="songs-list">
            {playlist.songs.map((song) => <li key={song.id}>
              <CreateSong song={song}
                          mode="playlists"
                          playlists={this.props.playlists}
                          updateCurrentTrack={this.props.updateCurrentTrack}/>
            </li>)}
          </ul>
        </div>
      </div>
    )
  }
}
