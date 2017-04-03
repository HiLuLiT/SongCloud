import {
  BrowserRouter, Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Signup from './Signup'
import Signin from './Signin'
import Topbar from './Topbar'
import Explore from './Explore'
import Playlists from './Playlists'
import Player from './Player'

export default function Root() {

    return (
      <BrowserRouter>
      <div className="root-div">
        <Topbar/>
          <Switch>

            <Route exact path="/" component={() => (
              <Redirect to="/explore" />
            )}/>

            <Route exact path="/explore" component={() => (
              <Redirect to="/explore/trance" />
            )}/>


            <Route exact path="/playlists" component= { Playlists } />
            <Route path="/explore/:genre" component={ Explore }/>
          </Switch>
        {/*<Signup/>*/}
        {/*<Signin/>*/}
        <Player/>
      </div>
      </BrowserRouter>
    );
}
