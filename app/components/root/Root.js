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

          {/*{App Routes}*/}
          <Route exact path="/explore" component={() => (
            <Redirect to="/explore/trance"/>
          )}/>

          <Route path="/explore/:genre" component={Explore}/>

          <Route exact path="/playlists" component={Playlists}/>


        </Switch>
        <Player/>
      </div>
    )
  }
}


{/*{App Routes}*/}
{/*<Route path="/explore/:genre" render={ (props) => {*/}
{/*return <Explore playlists={this.state.playlists}*/}
{/*{...props}/>*/}
{/*this is example before the Redux refactor - passing the component props: we didn't use component={explore} cause this way we     can't give it properties}*/}
