import React, { Component } from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import LoginForm from './LoginForm';
import { Loading } from '../Utilities';
import './Login.css';
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
    error: state.auth.get('error'),
    loading: state.auth.get('loading'),
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

  login = (values) => {
    this.props.postLogin();
    // let data = {
    //   "user": "Сергеева Александра Анатольевна",
    //   "pass": "1"
    // };
    const data = values;
    // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    axios.post(`${__CONFIG__.apiURL}/login`, data) // TODO: config
      .then((res) => {
        console.log(res);
        if (!!res.data.error) {
          this.props.errorLogin({ user: 'Logged User', error: res.data.error.desc });
        } else {
          const fakeJWT = res.data.data;
          localStorage.setItem('rk7token', fakeJWT);
          this.props.successLogin({ user: data.user, fakeJWT });
          this.setState({ redirectToReferrer: true });
        }
      })
      .catch((err) => {
        console.warn('Login Network Error', err.response);
        // const fakeJWT = posts.length + Math.random();
        localStorage.removeItem('rk7token');
        this.props.errorLogin({ user: 'Logged User', error: err.response });
      });
    // this.props.successLogin({ auth: true, user: 'Fake Logged User', loading: false });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { auth, error, loading } = this.props;
    const { redirectToReferrer } = this.state;

    if (auth) {
      return (
        <Redirect to={'/'} />
      )
    }

    return (
      <div>
        <p>Для редактирования требуется войти, используя ваше имя и пароль</p>{/* from.pathname */}
        { !loading && 
          <LoginForm onSubmit={this.login} />
        }
        { loading &&
          <Loading />
        }
        { !!error &&
          <div className="error--wide80">
            {error}
          </div>
        }
        {/* <button onClick={this.login}>Log in</button> */}
      </div>
    )
  }
}  

export default Login;