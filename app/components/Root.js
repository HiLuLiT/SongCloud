import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import uuid from 'uuid';

import Topbar from './Topbar'
import Explore from './Explore'
import Playlists from './Playlists'
import Player from './Player'

export default class Root extends React.Component {
  constructor() {
    super();

    this.updateCurrentTrack = this.updateCurrentTrack.bind(this);

    this.state = {
      currentTrack: {},
      playlists: [
        {
          id: uuid(),
          title: 'My 1st Playlist',
          songs: [
            {
              "id": 250711755,
              "title": "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              "duration": 219082,
              "stream_url": "https://api.soundcloudcom/tracks/250711755/stream",
              "uri": "https://api.soundcloud.com/tracks/250711755",
              "artwork_url": "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        },
        {
          id: uuid(),
          title: 'My 2nd Playlist',
          songs: [
            {
              "id": 250711755,
              "title": "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              "duration": 219082,
              "stream_url": "https://api.soundcloudcom/tracks/250711755/stream",
              "uri": "https://api.soundcloud.com/tracks/250711755",
              "artwork_url": "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        },
        {
          id: uuid(),
          title: 'My 3rd Playlist',
          songs: [
            {
              "id": 250711755,
              "title": "The Chainsmokers - Don't Let Me Down (Illenium Remix)",
              "duration": 219082,
              "stream_url": "https://api.soundcloudcom/tracks/250711755/stream",
              "uri": "https://api.soundcloud.com/tracks/250711755",
              "artwork_url": "https://i1.sndcdn.com/artworks-000150027827-4exjil-large.jpg"
            }]
        },
      ]
    };
  }

  updateCurrentTrack(newSong) {
    console.info('newsong in updatecurrent track', newSong);

    this.setState({
      currentTrack: Object.assign({}, newSong)
    })
  }

  render(props) {
    return (

      <div className="root-div">
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
                            {...props}
                            updateCurrentTrack={this.updateCurrentTrack}
                            {...props}/>
          } }/>

          <Route exact path="/playlists" render={(props) => {
            return <Playlists playlists= {this.state.playlists}
                              updateCurrentTrack={this.updateCurrentTrack}
                              {...props}/>
          } }/>



        </Switch>
        <Player song={this.state.currentTrack} />
      </div>
    )
  }
}
