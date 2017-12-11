import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Header } from './common/components/Header';
import { Login } from './common/components/Login';
import ExampleRouteHandler from './views/example';
import JustAnotherPage from './views/pageSpecific/JustAnotherPage';

import '../assets/fonts/fonts.css';

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
