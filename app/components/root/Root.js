import './root.scss';

import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import Topbar from '../topbar/Topbar';
import Explore from '../explore/Explore';
import Playlists from '../playlists/Playlists';
import Player from '../player/Player';

class Root extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.readData()
  };


  readData() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${serverLocation}/playlists`);

    xhr.addEventListener('load', () => {
      const playlist = JSON.parse(xhr.responseText);
      this.props.updatePlaylistFromServer(playlist)
      // setTimeout(readData, 3000);
    });

    xhr.addEventListener('error', () => {
      alert('problem!');
    });
    xhr.send();
  }


  render() {
    return (

      <div className="root">
        <Topbar history={this.props.history}/>
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

function mapDispatchToProps(dispatch) {
  return {
    updatePlaylistFromServer(playlists) {
      dispatch({
        type: 'SET_PLAYLIST_DATA',
        firstdata: playlists
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Root);

{/*{App Routes}*/
}
{/*<Route path="/explore/:genre" render={ (props) => {*/
}
{/*return <Explore playlists={this.state.playlists}*/
}
{/*{...props}/>*/
}
{/*this is example before the Redux refactor - passing the component props: we didn't use component={explore} cause this way we     can't give it properties}*/
}
