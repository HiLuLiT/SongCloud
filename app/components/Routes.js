import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Signup from './Signup'
import Signin from './Signin'
import Root from './Root';



export default class Routes extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={ Signin }/>
          <Route exact path="/signup" component={ Signup }/>
          <Route path="/" component={ Root }/>
        </Switch>
      </BrowserRouter>
    );
  };
}
