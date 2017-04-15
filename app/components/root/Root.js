import './root.scss';

import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Topbar from '../topbar/Topbar';
import Explore from '../explore/Explore';
import Playlists from '../playlists/Playlists';
import Player from '../player/Player';

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      addedNewPlaylist: false,
    };
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
                            addNewPlaylist={this.addNewPlaylist}
                            {...props}/>
          } }/>

          <Route exact path="/playlists" render={(props) => {
            return <Playlists playlists={this.state.playlists}
                              addNewPlaylist={this.addNewPlaylist}
                              addedNewPlaylist={this.state.addedNewPlaylist}
                              {...props}/>
          } }/>


        </Switch>
        <Player/>
      </div>
    )
  }
}
