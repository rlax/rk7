import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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
    {<div className="employeeCard-row card-meta">Role :: <pre>--^^--</pre></div>}
  </div>
);

const CardExampleExpandable = props => (
  <div className="employeeCard">
    <Card>
      <CardHeader
        title={props.name}
        subtitle={props.code}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardActions>
        <FlatButton label="Action1" />
        <FlatButton label="Action2" />
      </CardActions>
      <CardText expandable={true}>
        <div className="employeeCard-row card-header">Cardcode - {props.cardCode}</div>
        <div className="employeeCard-row">name - {props.name}</div>
        <div className="employeeCard-row">guid - {props.guid}</div>
        <div className="employeeCard-row">code - {props.code}</div>
        <div className="employeeCard-row">id - {props.id}</div>
        {/* <div className="employeeCard-row card-meta">Role :: <pre>--^^--</pre></div> */}
      </CardText>
    </Card>
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
    
    axios.get(`${__CONFIG__.apiURL}/restaurants/`, config)
        .then((res) => { 
        const restaurantsList = res.data.data;
        this.setState({ restaurantsList });
      })
      .then(() => {
        axios.get(`${__CONFIG__.apiURL}/roles?restaurantGuid=7aaae94a-6a77-4ab8-9665-b9675e025ea1`, config)
        // TODO: with RestGUID
          .then((res) => {
            const rolesList = res.data.data;
            this.setState({ rolesList });
          })
      })
      .then(() => {
        setTimeout(() => {
          axios.get(`${__CONFIG__.apiURL}/employees?roleGuid=f917a1b4-5227-401e-9bbe-a718148087df`, config)
          // TODO: with roleGUID
            .then((res) => {
              const employees = res.data.data;
              console.log(employees);
              this.setState({ employees });
            })
        }, 500)
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
            console.log(this.state.rolesList) && this.state.rolesList.length !== 0 && this.state.rolesList.map(role => (<h2 className="role-title">{role.name}</h2>))
          }
          <h1>Все сотрудники</h1>
          <div className="cards-container">
            <div className="cards">
              {
                this.state.employees.length !== 0 && this.state.employees.map(emp => (
                  <CardExampleExpandable {...emp} />
                ))
              }
            </div>
          </div>
          {/* <CardExampleExpandable /> */}
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