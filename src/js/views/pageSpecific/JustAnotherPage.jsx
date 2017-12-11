import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as authActions } from '../../redux/modules/auth';

const mapDispatchToProps = { ...authActions };
@connect(null, mapDispatchToProps)
class JustAnotherPage extends Component {
  componentDidMount() {
    localStorage.removeItem('rk7token');
    this.props.errorLogin({ user: 'Logged User', error: 'Вы вышли из сеанса редактирования. Выберите другого пользователя...' });
  }
  render() {
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }}
      />
    );
  }
}

export default JustAnotherPage;