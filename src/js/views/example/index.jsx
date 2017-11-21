import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';

import axios from 'axios';

import { actions as exampleActions } from '../../redux/modules/example';
import { actions as authActions } from '../../redux/modules/auth';
import { actions as restaActions } from '../../redux/modules/resta';
import { actions as emploActions } from '../../redux/modules/emplo';
import { actions as rolesActions } from '../../redux/modules/roles';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { Example, ExampleWithError } from '../../common/components/Example';
import { PrivateRoute, Login } from '../../common/components/Login';
import { default as PrivateView } from '../private';
import { ErrorBoundary } from '../../common/components/Utilities';

require('../../../style/index.css');

const mapStateToProps = (state) => {
  const token = localStorage.getItem('rk7token');
  console.log(token);
  return {
    example: exampleSelector(state),
    auth: !!token ? true : state.auth.get('auth'),
    user: state.auth.get('user'),
  }
};

const mapDispatchToProps = {
  ...exampleActions,
  ...authActions,
  ...restaActions,
  ...emploActions,
  ...rolesActions,
};

@connect(mapStateToProps, mapDispatchToProps)
class ExampleView extends Component {
  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  componentDidMount() {
    // this.props.getAwesomeCode();
    console.log(__CONFIG__);
    const config = {
      // headers: {
      //   // 'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
      // }
    };
    console.log('Auth >>> with token', localStorage.getItem('rk7token'));
    /* axios.get(`${__CONFIG__.apiURL}/reactjs.json`, config)
      .then((res) => { 
        const posts = res.data.data.children.map(obj => obj.data);
        const fakeJWT = posts.length + Math.random();
        localStorage.setItem('rk7token', fakeJWT);
        // this.props.successLogin({ auth: true, user: 'Logged User', fakeJWT });
      })
      .then(() => {
        axios.get(`${__CONFIG__.apiURL}/reactjs.json`, config)
      })
      .catch((err) => {console.log(err)}); */
  }

  render() {
    return (
      <div>
        {
          this.props.auth &&
          <Switch>
            <Route 
              path="/"
              exact
              render={() => (<PrivateView {...this.props} />)}
            />
            <Route 
              path="/:restaurantId/:roleId"
              render={props => (
                <PrivateView {...this.props} selectedRestId={props.match.params.restaurantId} selectedRoleId={props.match.params.roleId} />
            )}/>
            <Route 
              path="/:restaurantId"
              render={props => (
                <PrivateView {...this.props} selectedRestId={props.match.params.restaurantId} />
            )}/>
          </Switch>  
        }
        {
          !this.props.auth &&
          <div className="rk-hint">
            <Link to="/login">Страница логина</Link>
          </div>
        }
        {/* <ErrorBoundary>
          <ExampleWithError {...this.props} />
        </ErrorBoundary> */}
      </div>
    )
  }
}

export default ExampleView;
