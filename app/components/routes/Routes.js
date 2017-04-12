import './routes.scss';

import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Signup from '../auth/Signup';
import Signin from '../auth/Signin';
import Root from '../root/Root';



export default class Routes extends React.Component {
  render() {

    return (
      <BrowserRouter className="routes">
        <Switch>
          <Route exact path="/signin" component={ Signin }/>
          <Route exact path="/signup" component={ Signup }/>
          <Route path="/" component={ Root }/>
        </Switch>
      </BrowserRouter>
    );
  };
}
