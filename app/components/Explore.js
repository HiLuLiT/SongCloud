import React from 'react';

export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      loadingState: 'loading'
    };
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://create-bootcamp-songcloud-server.now.sh/tracks?genre=trance');

    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), loadingState: 'loaded'});
    });

    xhr.addEventListener('error', () => {
      this.setState({loadingState: 'error'});
    });

    xhr.send();

  }

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  createSongs() {
    return (
      <div>
      <ul className="songs-list">
        { this.state.songs.map((song) => {
          const minutes = Math.floor(parseInt(song.duration) / 60000);
          const seconds = ((parseInt(song.duration % 60000) / 1000).toFixed(0));
          const songDuration = (seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
          const songName = (song.title).slice(0, 30);
          console.info(songName);
          return (
            <li key={song.id}>
            <img className="song-img" src={song.artwork_url} alt="MDN"></img>
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


  render() {
    console.info(this.state.songs);
    console.info(this.state.loadingState);
    switch (this.state.loadingState) {
      case 'loading':
        return <div>Loading...</div>;
      case 'error':
        return <div>Error!</div>;
      case 'loaded':
        return (
          <div>
            <nav>
              <ul className="genre-nav">
                <li>Music Category</li>
                <li>Music Category</li>
                <li>Music Category</li>
                <li>Music Category</li>
                <li>Music Category</li>
                <li>Music Category</li>
              </ul>
            </nav>
            <div>
              {this.createSongs()}
            </div>
            <button>Previous</button>
            <span>current Page #</span>
            <button>Next</button>
          </div>
        );
    }
  }
}
