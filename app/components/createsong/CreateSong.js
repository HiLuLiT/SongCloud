import './createsong.scss';
import {Link} from 'react-router-dom';
import React from 'react';

export default class CreateSong extends React.Component {
  constructor() {
    super();
    this.state = {
      isDropDownOpen: false,
      isInPlaylist: false

    };

    // this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this);
  }

  songDuration(song) {
    const minutes = Math.floor(parseInt(song.duration) / 60000);
    const seconds = ((parseInt(song.duration % 60000) / 1000).toFixed(0));
    return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  }

  songTitleLimiter(title) {
    if (title.length > 35) {
      return title.slice(0, 30) + '...'
    }
    else {
      return title;
    }
  }

  openDropDown() {
    let newVisible = !this.state.isDropDownOpen;

    this.setState({
      isDropDownOpen: newVisible
    });
  }

  componentDidMount() {
    // this.checkIfSongInPlaylist();
  }
  //
  // removeSongFromPlaylist() {
  //   const playlists = this.props.playlists;
  //   const songInPlaylist = this.props.song;
  //   for (const playlist of playlists) {
  //
  //     for (const song of playlist.songs) {
  //
  //       if (songInPlaylist.id === song.id) {
  //
  //       }
  //     }
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isInPlaylist) {
      this.heartElm.className="fa fa-heart heart-font"
    }
    else {
      this.heartElm.className="fa fa-heart-o heart-font-o";
    }
  }

  render() {
    const song = this.props.song;
    const imgURL = song.artwork_url ? song.artwork_url.replace('large', 't300x300') : song.artwork_url;
    const heartClassName = this.state.isDropDownOpen ? "fa fa-heart heart-font" : "fa fa-heart-o heart-font-o";
    const handleHeart = this.state.isInPlaylist ? "fa fa-heart heart-font" : heartClassName;
    let checkIfInPlaylist = false;

    return (
      <div className="createsong">
        <div className="song-img"
             style={{'backgroundImage': `url(${imgURL})`}}
             onClick={ () => this.props.updateCurrentTrack(song)}>
        </div>
        <span className="span-song-name">{this.songTitleLimiter(song.title)}</span>
        <div>
          <i className={"fa fa-clock-o clock-font" } aria-hidden="true"/>
          <span className="span-song-duration">{ this.songDuration(song) }</span>

          <div className="heart-playlist-div">
            <i onClick={ () => this.openDropDown()}
               className={ handleHeart }
               aria-hidden="true"
               ref={(elm) => this.heartElm = elm}/>

            {/* Conditional Rendering with Logical Operator -  Returns expr1 if it can be converted to false; otherwise, returns expr2.*/}
            {this.state.isDropDownOpen && <div className="add-playlist-dropdown">
              { (this.props.mode === "explore") && <div className="add-edit-div">
                <span>Add To Playlist</span>
                <Link to="/playlists" onClick={() => this.props.addNewPlaylist(song)}>Create Playlist +</Link>

              </div>
              }
              {(this.props.mode === 'playlists') && <span>Edit Playlist</span>}

              <div className="playlist-checkbox-div">
                {this.props.playlists.map((playlist) => {
                  checkIfInPlaylist = false;
                    playlist.songs.map((songInPlaylist) => {
                      if (songInPlaylist.id === song.id) {
                        checkIfInPlaylist = true;
                      }
                    });

                    return <label key={playlist.id} className="label"
                                  onClick={() => this.props.addSongToPlaylist(playlist.id, song)}>{playlist.title}
                      <input type="checkbox" defaultChecked={ checkIfInPlaylist }/>
                    </label>
                  })
                }
              </div>
            </div>
            }


          </div>
        </div>
      </div>
    )
  }
}
