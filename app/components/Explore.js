import React from 'react';
import {NavLink} from 'react-router-dom'
export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      loadingState: 'loading'
    };
  }

  GetXhr(){
    const xhr = new XMLHttpRequest();
    const genre = this.props.match.params.genre;

    xhr.open('GET', `https://create-bootcamp-songcloud-server.now.sh/tracks?genre=${genre}`);

    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), loadingState: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.setState({loadingState: 'error'});
    });
    xhr.send();
  }

  componentDidMount() {
    console.info('did mount');
    this.GetXhr();
  }

  componentDidUpdate(prevProps) {
    console.info(prevProps);
    if (prevProps.match.params.genre === this.props.match.params.genre)
      return;
    console.log('did update');
    this.GetXhr();
  }

  createSongs() {
    return (
      <div>
      <ul className="songs-list">
        { this.state.songs.map((song) => {
          const minutes = Math.floor(parseInt(song.duration) / 60000);
          const seconds = ((parseInt(song.duration % 60000) / 1000).toFixed(0));
          const songDuration = (seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
          const songName = (song.title).slice(0, 30) + '...';
          return (
            <li key={song.id}>
              <div className="song-img" style={{'backgroundImage': `url(${song.artwork_url.replace('large', 't300x300')})`}}></div>
              <span className="span-song-name">{songName}</span>
              <div>
                <i className="fa fa-clock-o clock-font" aria-hidden="true"></i>
                <span className="span-song-duration">{songDuration}</span>
                <i className="fa fa-heart-o heart-font" aria-hidden="true"></i>
              </div>
            </li>

          )
        }) }

      </ul>
      </div>
    );
  }

  genreChooser() {
    return (
      <div>
        <ul className="genre-nav">
         <li><NavLink to="/explore/trance" activeClassName="selected-genre">Trance</NavLink></li>
         <li><NavLink to="/explore/house" activeClassName="selected-genre">House</NavLink></li>
         <li><NavLink to="/explore/dubstep" activeClassName="selected-genre">Dubstep</NavLink></li>
        </ul>
      </div>
    )
  }


  render() {
    switch (this.state.loadingState) {
      case 'loading':
        return <div>Loading...</div>;
      case 'error':
        return <div>Error!</div>;
      case 'loaded':
        return (
          <div className="main">
            <nav>
              {this.genreChooser()}
            </nav>
            <div>
              {this.createSongs()}
            </div>
            <div className="page-nav-div">
            <button className="prev-btn">Previous</button>
            <span>Page 1</span>
            <button className="next-btn">Next</button>
            </div>
          </div>
        );
    }
  }
}
