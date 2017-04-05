import React from 'react';
import CreateSong from './CreateSong';


export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = {
      isInputHidden: true,
      isTitleHidden: false
    }
  }

  inputEditMode() {
    let newInputVisible = !this.state.isInputHidden;
    let newTitleVisible = !this.state.isTitleHidden;

    this.setState({
      isInputHidden: newInputVisible,
      isTitleHidden: newTitleVisible
    });
  }

  render() {
    console.info('state in playlist', this.state);
    const playlist = this.props.playlist;

    const inputClassName = this.state.isInputHidden ? 'hidden' : '' ;
    const titleClassName = this.state.isTitleHidden ? 'hidden' : '' ;
    return (
      <div className="songs-div">
        <div className="header-div">
          <div className="input-div">
            <label className={ titleClassName } htmlFor={ playlist.id }
                   onClick={ () => this.inputEditMode() }
            >{ playlist.title }</label>
            <input onBlur={ () => this.inputEditMode() }
                   className={ inputClassName }
                   type="text"
                   id={ playlist.id }></input>
          </div>
          <button className="del-btn">Delete</button>
        </div>
        <div>
          <ul className="songs-list">
            {playlist.songs.map((song) => <li key={song.id}>
              <CreateSong song={song} updateCurrentTrack={this.props.updateCurrentTrack}/>
            </li>)}
          </ul>
        </div>
      </div>
    )
  }
}
