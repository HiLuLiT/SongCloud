import './createsong.scss';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';

class CreateSong extends React.Component {
  constructor() {
    super();
    this.state = {
      isDropDownOpen: false,
      heartClass: "fa fa-heart-o heart-font-o"
    };

    this.handleChecked = this.handleChecked.bind(this);
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
    this.setState({
      isDropDownOpen: !this.state.isDropDownOpen
    });
  }

  componentDidMount() {
    this.handleHeart();
  }

  componentDidUpdate(prevProps, prevState) {
   if ((prevState.isDropDownOpen === false) && (this.state.isDropDownOpen === true)) {
     this.setState({
       heartClass: "fa fa-heart heart-font"
     });
   }
    if ((prevState.isDropDownOpen === true) && (this.state.isDropDownOpen === false)) {
     this.setState({
       heartClass: "fa fa-heart-o heart-font-o"
     });
      this.handleHeart();
   }
  }

  handleHeart() {
    return this.props.playlists.map((playlist) => {
      playlist.songs.map((song)=> {
        if (song.id === this.props.song.id) {
          this.setState({
            heartClass: "fa fa-heart heart-font"
          });
        }
      })
    })
  }

  handleChecked(event) {
    const target = event.target.checked;
    const listID = event.target.id;
    this.props.handleSongsInPlaylist(target, this.props.song, listID)
  }

  renderCheckboxInDropDown() {
    const song = this.props.song;
    return this.props.playlists.map((playlist) => {
      let checkIfInPlaylist = false;

      playlist.songs.forEach((songInPlaylist) => {
        if (songInPlaylist.id === song.id) {
          checkIfInPlaylist = true;
        }
      });
      return <label key={playlist.id} className="label">{playlist.title}
        <input type="checkbox" defaultChecked={ checkIfInPlaylist } onChange={this.handleChecked} id={playlist.id}/>
      </label>
    })
  }

  render() {
    const song = this.props.song;
    const imgURL = song.artwork_url ? song.artwork_url.replace('large', 't300x300') : song.artwork_url;

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
               className={ this.state.heartClass }
               aria-hidden="true"/>

            {/* Conditional Rendering with Logical Operator -  Returns expr1 if it can be converted to false; otherwise, returns expr2.*/}
            {this.state.isDropDownOpen && <div className="add-playlist-dropdown">
              { (this.props.mode === "explore") && <div className="add-edit-div">
                <span>Add To Playlist</span>
                <Link to="/playlists" onClick={() => this.props.addNewPlaylist(song)}>Create Playlist +</Link>

              </div>
              }
              {(this.props.mode === 'playlists') && <span>Edit Playlist</span>}

              <div className="playlist-checkbox-div">
                { this.renderCheckboxInDropDown() }
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrentTrack(song) {
      dispatch({
        type: 'UPDATE_CURRENT_TRACK',
        song: song
      })
    },
    addNewPlaylist(song) {
      dispatch({
        type:'IS_NEW_LIST',
        isNewPlaylist: true
      });

      dispatch({
        type: 'ADD_NEW_PLAYLIST',
        song: song
      })
    },
    handleSongsInPlaylist(isChecked, song, listID) {
      dispatch({
        type: 'UPDATE_SONGS_IN_PLAYLIST',
        song: song,
        playlistID: listID,
        isChecked: isChecked
      })
    }
  }
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateSong);
