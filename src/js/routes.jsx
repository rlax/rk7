import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { Header } from './common/components/Header';
import { Login } from './common/components/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ExampleRouteHandler from './views/example';

import '../assets/fonts/fonts.css';

const JustAnotherPage = () => (
  <div>
    <h2>This is Just Another Page</h2>
    <p>Please remove this from your route, it is just to show case basic setup for router.</p>
  </div>
);

const HeaderWithRouter = withRouter(props => <Header {...props} />);

module.exports = (
  <MuiThemeProvider>
  <div className="container">
    <HeaderWithRouter />
    <hr />
    <div className="container__content">
      <Switch>
        {/* <Route exact path="/" component={ExampleRouteHandler} /> */}
        <Route exact path="/login" component={Login} />
        <Route path="/page" component={JustAnotherPage} />
        <Route path="*" component={ExampleRouteHandler} />
      </Switch>
    </div>
  </div>
  </MuiThemeProvider>
);
