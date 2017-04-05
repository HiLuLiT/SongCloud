import React from 'react';
import {NavLink} from 'react-router-dom';
import MDSpinner from "react-md-spinner";
import CreateSong from './CreateSong';

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

    xhr.open('GET', `https://api.soundcloud.com/tracks?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&limit=${limit}&offset=${offset}&tags=${genre}`);

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
      offset: this.state.offset + this.state.limit
    })
  }

  prevPage() {
    this.setState({
      offset: this.state.offset - this.state.limit
    })
  }

  componentDidMount() {
    console.info('did mount');
    this.getSongs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
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
          <li><NavLink to="/explore/dubstep" activeClassName="selected-genre">Dubstep</NavLink></li>
          <li><NavLink to="/explore/pop" activeClassName="selected-genre">Pop</NavLink></li>
          <li><NavLink to="/explore/indie" activeClassName="selected-genre">Indie</NavLink></li>
          <li><NavLink to="/explore/deep" activeClassName="selected-genre">Deep</NavLink></li>
          <li><NavLink to="/explore/hiphop" activeClassName="selected-genre">HipHop</NavLink></li>
        </ul>
      </div>
    )
  }

  render(props) {
    console.info('I was rendered');
    console.info('here are props from EXPLORE, do i have updatecurrent?', props);
    const isFirstPage = this.state.offset === 0;

    switch (this.state.loadingState) {
      case 'loading':
        return <div className="spinner">
          <MDSpinner size={100}/>
        </div>;
      case 'error':
        return <div>Error!</div>;
      case 'loaded':
        return <div className="main">
          <nav>
            {this.genreChooser()}
          </nav>
          <div>
            <ul className="songs-list">
            {this.state.songs.map((song) => <li key={song.id}>
              <CreateSong songs={song} updateCurrentTrack={this.props.updateCurrentTrack}/>
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

