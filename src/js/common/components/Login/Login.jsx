import React, { Component } from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

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
    // axios.get(`${__CONFIG__.apiURL}/reactjs.json`, config)
    //   .then((res) => { 
    //     const posts = res.data.data.children.map(obj => obj.data);
    //     const fakeJWT = posts.length + Math.random();
    //     localStorage.setItem('rk7token', fakeJWT);
    //     // this.props.successLogin({ auth: true, user: 'Logged User', fakeJWT });
    //   })
    //   .then(() => {
    //     axios.get(`${__CONFIG__.apiURL}/reactjs.json`, config)
    //   })
    //   .catch((err) => {console.log(err)});
    this.props.successLogin({ auth: true, user: 'Fake Logged User' });
    this.setState({ redirectToReferrer: true });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { auth } = this.props;
    const { redirectToReferrer } = this.state;
    
    if (auth || redirectToReferrer) {
      return (
        <Redirect to={from}/>
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