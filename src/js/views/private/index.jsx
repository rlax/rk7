import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, NavLink } from 'react-router-dom';

import axios from 'axios';

import { actions as exampleActions } from '../../redux/modules/example';

require('../../../style/index.css');
require('../../../style/private.css');

const RestaurantInfo = props => (<li>
  <NavLink 
    to={`/${props.id}`}
    activeStyle={{
      fontStyle: 'italic',
      color: 'grey',
      backgroundColor: '#fdffe0',
      borderRight: '2px solid #ababe4',
    }}
  >
    <div className="restaurantCard-title">{props.id}</div>
    <div className="restaurantCard-row">{props.guid}</div>
    <div className="restaurantCard-row">{props.name}</div>
    <div className="restaurantCard-row">{props.code}</div>
  </NavLink>
</li>);

const EmployeesEditable = ({ match }) => (
  <div className="employeeCard">
    <div className="employeeCard-title">Rest - {match.params.restaurantId}</div>
    <div className="employeeCard-title">{match.params.restaurantId}</div>
  </div>
);

const EmployeeCard = props => (
  <div className="employeeCard">
    <div className="employeeCard-row card-header">Cardcode - {props.cardCode}</div>
    <div className="employeeCard-row">name - {props.name}</div>
    <div className="employeeCard-row">guid - {props.guid}</div>
    <div className="employeeCard-row">code - {props.code}</div>
    <div className="employeeCard-row">id - {props.id}</div>
    <div className="employeeCard-row card-meta">Role :: <pre>--^^--</pre></div>
  </div>
);

class PrivateView extends Component {
  static PropTypes = {
  }
  constructor(props) {
    super(props);

    this.state = {restaurantsList: [], employees: [], rolesList: []};
  }

  componentDidMount() {
    console.log(__CONFIG__);
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
      }
    };
    console.groupCollapsed('API call with token:', localStorage.getItem('rk7token'));
    
    axios.get(`${__CONFIG__.apiURL}/restaurants`, config)
        .then((res) => { 
        const restaurantsList = res.data.data;
        this.setState({ restaurantsList });
      })
      .then(() => {
        axios.get(`${__CONFIG__.apiURL}/roles`, config)
        // TODO: with RestGUID
          .then((res) => {
            const rolesList = res.data;
            this.setState({ rolesList });
          })
      })
      .then(() => {
        axios.get(`${__CONFIG__.apiURL}/employees`, config)
        // TODO: with roleGUID
          .then((res) => {
            const employees = res.data;
            this.setState({ employees });
          })
      })
      //.then(() => {
        /* let data = {
          "cardCode" : "100500",
          "roles" : {
              "1010175" : 0,
              "1" : 0
          },
          "guid" : "bb895ed6-faa9-4105-a844-4eb3b9250dd3",
          "id" : 1029624,
          "name" : "Меркушева Полина Андреевна",
          "code" : 1029624
        }; */
       /*  axios.put(`${__CONFIG__.apiURL}/employees/1029624`, data, config)
        // TODO: with roleGUID
          .then(() => {}) */
      //})
      .catch((err) => {
        console.groupCollapsed('Network Error', err);
      });
  }

  render() {
    return (
      <div className="rk-private">
        <div className="rk-restaurants-list">
          <ul>
            {
              this.state.restaurantsList.map(rest => (<RestaurantInfo {...rest} >--</RestaurantInfo>))
            }
          </ul>
        </div>
        <div className="rk-editarea">
          <Route path="/:restaurantId" component={EmployeesEditable} />
          {
            this.state.rolesList.map(role => (<h2 className="role-title">{role.name}</h2>))
          }
          <h1>Все сотрудники</h1>
          <div className="cards-container">
            <div className="cards">
              {
                this.state.employees.map(emp => (
                  <EmployeeCard {...emp} />
                ))
              }
            </div>
          </div>
          {/* <ul>
            <li>lorem</li>
            <li>ipsum</li>
            <li>3</li>
          </ul> */}
        </div>
      </div>
    )
  }
}

export default PrivateView;