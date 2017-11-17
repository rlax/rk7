import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { restaListSelector, restaByIdSelector } from '../../redux/selectors/restaSelector';

import axios from 'axios';

import Form from '../pageSpecific/Form';
import EmployeeEditForm from '../pageSpecific/EmployeeEditForm';
import EmployeesEditable from '../pageSpecific/EmployeesEditable';

import { connect } from 'react-redux';

import { actions as exampleActions } from '../../redux/modules/example';
import { actions as restaActions } from '../../redux/modules/resta';

require('../../../style/index.css');
require('../../../style/private.css');

const RestaurantInfo = props => (<li>
  <NavLink 
    to={`/${props.restMap.get('id')}`}
    activeStyle={{
      fontStyle: 'italic',
      color: 'grey',
      backgroundColor: '#fdffe0',
      borderRight: '2px solid #ababe4',
    }}
  >
    <div className="restaurantCard-title">{props.restMap.get('id')}</div>
    <div className="restaurantCard-row">{props.restMap.get('guid')}</div>
    <div className="restaurantCard-row">{props.restMap.get('name')}</div>
    <div className="restaurantCard-row">{props.restMap.get('code')}</div>
  </NavLink>
</li>);

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
        actAsExpander={false}
        showExpandableButton={false}
      />
      {/* <CardActions>
        <FlatButton disabled label="- - -" />
        <FlatButton disabled label="+ + +" />
      </CardActions> */}
      <CardText expandable={false}>
        <EmployeeEditForm onSubmit={props.saveEmployeeFn} empData={{name: props.name, cardCode: props.cardCode, guid: props.guid, id: props.id}} />
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

const mapStateToProps = (state) => {
  return {
    restaurants: restaListSelector(state),
    firstR: restaByIdSelector(state, '1'),
  }
};

@connect(mapStateToProps)
class PrivateView extends Component {
  static PropTypes = {
  }
  constructor(props) {
    super(props);

    this.state = {restaurantsList: [], employees: [], rolesList: []};
  }

  saveEmployee = (values) => {
    console.log(values);
    
    let data = values;
    axios.put(`${__CONFIG__.apiURL}/employees/1029624`, data) //TODO: add config
        // TODO: with roleGUID
      .catch((err) => {
        console.groupCollapsed('Login Network Error', err);
      });
    // this.props.successLogin({ auth: true, user: 'Fake Logged User', loading: false });
  }

  componentDidMount() {
    console.log(__CONFIG__);
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
      }
    };
    console.groupCollapsed('API call with token:', localStorage.getItem('rk7token'));

    this.props.getResta();
    
    axios.get(`${__CONFIG__.apiURL}/restaurants/`, config)
        .then((res) => { 
        const restaurantsList = res.data.data;
        this.setState({ restaurantsList });
        this.props.successResta({ restaurantsList });
      })
      .then(() => {
        setTimeout(() => {
          axios.get(`${__CONFIG__.apiURL}/employees`, config)
          // TODO: with roleGUID
            .then((res) => {
              const employees = res.data;
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
              !!this.props.restaurants && this.props.restaurants.valueSeq().map(rest => (
                <RestaurantInfo restMap={rest} >--</RestaurantInfo>)
              )
            }
          </ul>
        </div>
        <div className="rk-editarea">
          <Route 
            path="/:restaurantId"
            render={props => (
              <EmployeesEditable restId={props.match.params.restaurantId} />
            )}/>
          {/* <Form employeeGuid="A1-KUN" /> */}
          <h1>Все сотрудники</h1>
          <div className="cards-container">
            <div className="cards">
              {
                this.state.employees.length !== 0 && this.state.employees.map((emp, index) => (
                  <CardExampleExpandable key={`cee${index}`} saveEmployeeFn={this.saveEmployee} {...emp} />
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