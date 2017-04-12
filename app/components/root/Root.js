import './root.scss';

import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import uuid from 'uuid';

import Topbar from '../topbar/Topbar';
import Explore from '../explore/Explore';
import Playlists from '../playlists/Playlists';
import Player from '../player/Player';

export default class Root extends React.Component {
  constructor() {
    super();

    this.updateCurrentTrack = this.updateCurrentTrack.bind(this);
    this.editPlaylistTitle = this.editPlaylistTitle.bind(this);
    this.addNewPlaylist = this.addNewPlaylist.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);

    this.state = {
      addedNewPlaylist: false,
      currentTrack: {},
      playlists: [
        {
          id: uuid(),
          title: 'My 1st Playlist',
          songs: [
            {
              isInPlaylist: true,
              id: 250711755,
              title: "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              duration: 219082,
              stream_url: "https://api.soundcloud.com/tracks/250711755/stream",
              uri: "https://api.soundcloud.com/tracks/250711755",
              artwork_url: "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        },
        {
          id: uuid(),
          title: 'My 2nd Playlist',
          songs: [
            {
              isInPlaylist: true,
              "id": 250711755,
              "title": "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              "duration": 219082,
              "stream_url": "https://api.soundcloud.com/tracks/250711755/stream",
              "uri": "https://api.soundcloud.com/tracks/250711755",
              "artwork_url": "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        },
        {
          id: uuid(),
          title: 'My 3rd Playlist',
          songs: [
            {
              isInPlaylist: true,
              "id": 250711755,
              "title": "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              "duration": 219082,
              "stream_url": "https://api.soundcloud.com/tracks/250711755/stream",
              "uri": "https://api.soundcloud.com/tracks/250711755",
              "artwork_url": "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        },
      ]
    };
  }


  addNewPlaylist(song) {
    const copyofPlayLists = [...this.state.playlists];
    let newPlaylist = {
      id: uuid(),
      title: 'HILA LOVES ROI',
      songs: [
        {
          "id": 250711755,
          "title": "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
          "duration": 219082,
          "stream_url": "https://api.soundcloud.com/tracks/250711755/stream",
          "uri": "https://api.soundcloud.com/tracks/250711755",
          "artwork_url": "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
        }]
    };

    if (song) {
      newPlaylist.songs.pop();
      newPlaylist.songs.push(song);
    }

    copyofPlayLists.push(newPlaylist);
    this.setState({
      playlists: copyofPlayLists,
      addedNewPlaylist: true
    }, () => {
      this.setState({
        addedNewPlaylist: false
      });
    });
  }

  // we have to copy the array before applying changes to it such as playlist.title = newTitle,
  // then we setState of the copied-changed array
  editPlaylistTitle(playlistId, newTitle) {
    const copyofPlayLists = [...this.state.playlists];
    for (const playlist of copyofPlayLists) {
      if (playlist.id === playlistId) {
        playlist.title = newTitle;
        this.setState({
          playlists: copyofPlayLists
        })
      }
    }
  }

  updateCurrentTrack(newSong) {
    console.info('newsong in updatecurrent track', newSong);

    this.setState({
      currentTrack: Object.assign({}, newSong)
    })
  }

  addSongToPlaylist(playlistID, song) {
    const copyofPlayLists = [...this.state.playlists];
    for (const playlist of copyofPlayLists) {
      if (playlist.id === playlistID) {
        playlist.songs.push(song);
        this.setState({
          playlists: copyofPlayLists
        })
      }
    }
  }

  render() {
    return (

      <div className="root">
        <Topbar/>
        <Switch>

          {/*{default routes}*/}

          <Route exact path="/" component={() => (
            <Redirect to="/explore"/>
          )}/>

          <Route exact path="/explore" component={() => (
            <Redirect to="/explore/trance"/>
          )}/>

          {/*{App Routes}*/}

          {/*{we can't use component={explore} cause this way we can't give it properties}*/}
          <Route path="/explore/:genre" render={ (props) => {
            return <Explore playlists={this.state.playlists}
                            updateCurrentTrack={this.updateCurrentTrack}
                            addNewPlaylist={this.addNewPlaylist}
                            addSongToPlaylist={this.addSongToPlaylist}
                            {...props}/>
          } }/>

          <Route exact path="/playlists" render={(props) => {
            return <Playlists playlists={this.state.playlists}
                              updateCurrentTrack={this.updateCurrentTrack}
                              editPlaylistTitle={this.editPlaylistTitle}
                              addNewPlaylist={this.addNewPlaylist}
                              addedNewPlaylist={this.state.addedNewPlaylist}
                              {...props}/>
          } }/>


        </Switch>
        <Player song={this.state.currentTrack}/>
      </div>
    )
  }
}
