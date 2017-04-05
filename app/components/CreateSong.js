import React from 'react';

export default class CreateSong extends React.Component {
  constructor() {
    super();
    this.state = {
      isDropDownOpen: false
    }
  }

  songDuration(song) {
    const minutes = Math.floor(parseInt(song.duration) / 60000);
    const seconds = ((parseInt(song.duration % 60000) / 1000).toFixed(0));
    return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  }

  songTitleLimiter(title) {
    if (title.length > 35) {
      return title.slice(0, 34) + '...'
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


  render() {
    const song = this.props.song;
    const imgURL = song.artwork_url ? song.artwork_url.replace('large', 't300x300') : song.artwork_url;
    const heartClassName = this.state.isDropDownOpen ? "fa fa-heart heart-font" : "fa fa-heart-o heart-font-o";
    return (
      <div>
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
               className= { heartClassName }
               aria-hidden="true"/>

  {/* Logical Operator -  Returns expr1 if it can be converted to false; otherwise, returns expr2.*/}
            {this.state.isDropDownOpen && <div className="add-playlist-dropdown">
              <div className="add-edit-div">
                <span>Add To Playlist</span>
                <button>Create Playlist +</button>
              </div>
              <div className="playlist-checkbox-div">

                <label className="label"> First
                  <input type="checkbox" id="cb1" value="cb1"/>
                </label>


                <label className="label">Second
                  <input type="checkbox" id="cb2" value="cb1"/>
                </label>

                <label className="label">Third
                  <input type="checkbox" id="cb3" value="cb1"/>
                </label>
              </div>
            </div>
            }


          </div>
        </div>
      </div>
    )
  }
}
