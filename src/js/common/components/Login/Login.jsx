import React, { Component } from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

import { actions as authActions } from '../../../redux/modules/auth';

export const PrivateRoute = ({ component: NamedComponent, ...rest }) => (
  <Route 
    {...rest}
    render={
      props => (
        props.isAuthenticated ? (
          <NamedComponent {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}
  />
)

const mapStateToProps = (state) => {
  return {
    auth: state.auth.get('auth'),
    user: state.auth.get('user'),
  }
};

const mapDispatchToProps = {
  ...authActions,
};

@connect(mapStateToProps, mapDispatchToProps)
class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  login = () => {
    this.props.postLogin();
    let data = {
      "user": "Сергеева Александра Анатольевна",
      "pass": "1"
    };
    // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    axios.post(`${__CONFIG__.apiURL}/login`, data) // TODO: config
      .then((res) => { 
        const fakeJWT = res.data.data;
        localStorage.setItem('rk7token', fakeJWT);
        this.props.successLogin({ user: 'Logged User', fakeJWT });
      })
      .catch((err) => {
        console.groupCollapsed('Login Network Error', err);
        // const fakeJWT = posts.length + Math.random();
        // localStorage.setItem('rk7token', fakeJWT);
        // this.props.successLogin({ user: 'Logged User', fakeJWT });
      });
    // this.props.successLogin({ auth: true, user: 'Fake Logged User', loading: false });
    this.setState({ redirectToReferrer: true });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { auth } = this.props;
    const { redirectToReferrer } = this.state;
    
    if (auth || redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}  

export default Login;