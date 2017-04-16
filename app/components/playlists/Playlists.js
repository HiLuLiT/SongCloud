import './playlists.scss';

import React from 'react';
import Playlist from '../playlist/Playlist';
import {connect} from 'react-redux';

class Playlists extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scrollTo: ''
    };

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(playlist) {
    this.setState ({
      scrollTo:playlist.id
    })
  }

  render() {
    return (
      <div className="playlists">
        <div className="left-nav">
          <div className="btn-div">
            <button className="new-playlist-btn"
                    onClick={ () => this.props.addNewPlaylist()}>Add New Playlist
            </button>
          </div>
          <ul className="left-list">
            {this.props.playlists.map((playlist) => <li key={playlist.id} onClick={ () => this.handleScroll(playlist)}>
              {playlist.title}</li>
            )}
          </ul>
        </div>
        <div className="playlist-explore">
          {this.props.playlists.map((playlist, i) => <Playlist key={playlist.id}
                                                          playlist={playlist}
                                                          scrollTo={this.state.scrollTo}/>
          )}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPlaylist() {
      dispatch({
        type: 'IS_NEW_LIST',
        isNewPlaylist: true
      });
      dispatch({
        type: 'ADD_NEW_PLAYLIST',
      });
    }
  };
}

function mapStateToProps(stateData) {
  return {
    playlists: stateData.playlists
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
