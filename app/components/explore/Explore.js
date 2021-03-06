import './explore.scss';

import React from 'react';
import {NavLink} from 'react-router-dom';
import MDSpinner from "react-md-spinner";
import CreateSong from '../createsong/CreateSong';

export default class Explore extends React.Component {

  constructor() {
    super();
    this.state = {
      songs: [],
      loadingState: 'loading',
      offset: 0,
      limit: 15
    };
  }


  getSongs() {
    const xhr = new XMLHttpRequest();
    const genre = this.props.match.params.genre;
    const offset = this.state.offset;
    const limit = this.state.limit;

    const searchParams = new URLSearchParams(this.props.location.search);
    const searchTarget = searchParams.get('search') ? 'q' : 'tags';

    xhr.open('GET', `https://api.soundcloud.com/tracks?client_id=unnFdubicpq7RVFFsQucZzduDPQTaCYy&limit=${limit}&offset=${offset}&${searchTarget}=${genre}`);

    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), loadingState: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.setState({loadingState: 'error'});
    });
    xhr.send();
  }

  nextPage() {
    this.setState({
      offset: this.state.offset + this.state.limit,
      loadingState: 'loading'
    })
  }

  prevPage() {
    this.setState({
      offset: this.state.offset - this.state.limit,
      loadingState: 'loading'
    })
  }

  componentDidMount() {
    this.getSongs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
      this.setState({
        loadingState: 'loading'
      });
      this.setState({offset: 0}, () => {
        this.getSongs();
      });
    }
    if (this.state.offset !== prevState.offset) {
      this.getSongs();
    }

  }

  genreChooser() {
    return (
      <div>
        <ul className="genre-nav">
          <li><NavLink to="/explore/trance" activeClassName="selected-genre">Trance</NavLink></li>
          <li><NavLink to="/explore/house" activeClassName="selected-genre">House</NavLink></li>
          <li><NavLink to="/explore/hiphop" activeClassName="selected-genre">Hip-Hop</NavLink></li>
          <li><NavLink to="/explore/pop" activeClassName="selected-genre">Pop</NavLink></li>
          <li><NavLink to="/explore/rock" activeClassName="selected-genre">Rock</NavLink></li>
          <li><NavLink to="/explore/dubstep" activeClassName="selected-genre">Dubstep</NavLink></li>
          <li><NavLink to="/explore/electronic" activeClassName="selected-genre">Electronic</NavLink></li>
        </ul>
      </div>
    )
  }

  render() {
    const isFirstPage = this.state.offset === 0;

    switch (this.state.loadingState) {
      case 'loading':
        return <div className="spinner">
          <MDSpinner size={100}/>
        </div>;
      case 'error':
        return <div>Error!</div>;
      case 'loaded':
        return <div className="explore">
          <nav>
            {this.genreChooser()}
          </nav>
          <div className="songs-list-div">
            <ul className="songs-list">
              {this.state.songs.map((song) => <li key={song.id}>
                <CreateSong song={song}
                            mode="explore"/>
              </li>)}
            </ul>
          </div>

          <div className="page-nav-div">
            <button className="prev-btn" onClick={ this.prevPage.bind(this) }
                    disabled={isFirstPage}>
              Previous
            </button>
            <span>Page {(this.state.offset / this.state.limit) + 1 }</span>
            <button className="next-btn" onClick={ this.nextPage.bind(this)}>Next</button>
          </div>
        </div>
    }

  }
}

