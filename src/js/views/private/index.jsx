import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { restaListSelector, restaByIdSelector } from '../../redux/selectors/restaSelector';
import { employeeTotalSelector, emploMapByIdDataSelector, employeeSelectedSelector } from '../../redux/selectors/emploSelector';
import { rolesData } from '../../redux/selectors/rolesSelector';
import { ErrorBoundary } from '../../common/components/Utilities';
import { Loading } from '../../common/components/Utilities';

import axios from 'axios';

import Form from '../pageSpecific/Form';
import EmployeesRole from '../pageSpecific/EmployeesRole';
import CardExampleExpandable from '../pageSpecific/CardExampleExpandable';

import { connect } from 'react-redux';
import { getRolesByRest } from '../../redux/modules/roles';

// import { actions as exampleActions } from '../../redux/modules/example';
// import { actions as restaActions } from '../../redux/modules/resta';
// import { actions as rolesActions } from '../../redux/modules/roles';

require('../../../style/index.css');
require('../../../style/private.css');

const RestaurantInfo = props => (<li>
  <NavLink 
    to={`/${props.restMap.get('guid')}`}
    activeStyle={{
      fontStyle: 'italic',
      color: 'grey',
      backgroundColor: '#fdffe0',
      borderRight: '2px solid #ababe4',
    }}
  >
    {/* <div className="restaurantCard-title">{props.restMap.get('id')}</div> */}
    {/* <div className="restaurantCard-row">{props.restMap.get('guid')}</div> */}
    <div className="restaurantCard-row">{props.restMap.get('name')}</div>
    <div className="restaurantCard-row rk-remove">Код ресторана: {props.restMap.get('code')}</div>
  </NavLink>
  { props.isSelected &&
    <div className="restaurantRoles">{
      props.rolesMap.valueSeq().map((role) => {
        return (
          <div className="restaurantRoles-row" key={`${role}`}>
            <NavLink 
              to={`/${props.restMap.get('guid')}/${role.get('id')}`} // .../restGuid/roleGuid
              activeStyle={{
                fontStyle: 'bold',
                backgroundColor: '#abc',
              }}
            >
              <span>{role.get('name')}</span><span className="rk-remove">{role.get('id')}</span>
            </NavLink>
          </div>
        )
      })
    }</div>
  }
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

const mapStateToProps = (state) => {
  return {
    restaurants: restaListSelector(state),
    firstR: restaByIdSelector(state, '1'),
    employees: emploMapByIdDataSelector(state),
    employeeTotal: employeeTotalSelector(state),
    roles: rolesData(state),
    ui: {
      selectedGuidForEdit: employeeSelectedSelector(state),
      loadingRestaurants: state.resta.get('loading'),
      loadingRoles: state.roles.get('loading'),
      loadingEmplo: state.emplo.get('loading'),
    },
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

  componentDidMount() {
    console.log(__CONFIG__);
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
      }
    };
    console.info('API call with token:', localStorage.getItem('rk7token'));

    this.props.getResta();

    axios.get(`${__CONFIG__.apiURL}/restaurants/`, config)
      .then((res) => { 
        const restaurantsList = res.data.data;
        console.log(restaurantsList);
        // this.setState({ restaurantsList });
        this.props.successResta({ restaurantsList });
        return restaurantsList
      })
      .then((restaurantsList) => {
        let axiosFnArray = [];
        restaurantsList.forEach((rest) => {
          const getRolesForRest = (resta) => {
            axios.get(`${__CONFIG__.apiURL}/roles?restaurantGuid=${resta.guid}`, config)
            .then((res) => {
              const roles = res.data.data;
              this.props.successRolesByRest({ roles, restGuid: resta.guid });
            })
            .catch((err) => {
              console.warn('Network Error', err);
            });
          }
          axiosFnArray.push(getRolesForRest(rest));
        });
        // console.log(axiosFnArray);
        // return axios.all(axiosFnArray)
        //   .then((res) => {
        //     let temp = res.map(r => r);
        //     console.log(temp);
        //   })
      })
      .catch((err) => {
        console.warn('Network Error', err);
      });

    if (this.props.selectedRestId) {
      this.props.getRolesByRest();
      axios.get(`${__CONFIG__.apiURL}/roles?restaurantGuid=${this.props.selectedRestId}`, config)
    // TODO: with roleGUID
      .then((res) => {
        const roles = res.data.data;
        this.props.successRolesByRest({ roles, restGuid: this.props.selectedRestId });
      })
      .catch((err) => {
        console.warn('Network Error', err);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedRestId !== this.props.selectedRestId ||
      nextProps.selectedRoleId !== this.props.selectedRoleId
    ) {
      if (nextProps.selectedRestId !== this.props.selectedRestId) {
        // TODO: if roles are the same
        const config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
          }
        };
        this.props.getRolesByRest();
        axios.get(`${__CONFIG__.apiURL}/roles?restaurantGuid=${nextProps.selectedRestId}`, config)
      // TODO: with roleGUID
        .then((res) => {
          const roles = res.data.data;
          console.info('private >> cWRP: new selectedRestId');
          this.props.successRolesByRest({ roles, restGuid: this.props.selectedRestId });
        })
        .catch((err) => {
          console.warn('Network Error', err);
        });
      }
      if (nextProps.selectedRoleId !== undefined && nextProps.selectedRoleId !== this.props.selectedRoleId) {
        this.props.getEmpl();
        const config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
          }
        };
        const currentRoleGuid = this.props.roles.getIn([nextProps.selectedRoleId, 'guid']);
        axios.get(`${__CONFIG__.apiURL}/employees?roleGuid=${currentRoleGuid}`, config)
        // TODO: with roleGUID
          .then((res) => {
            const employees = res.data.data;
            // console.log(employees);
            // this.setState({ employees });
            this.props.successEmpl({ employees });
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
      }
    }
  }

  componentWillUnmount() {
    
  }

  saveEmployee = (empMap, values) => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
      }
    };
    const currentRestId = this.props.restaurants.valueSeq().find(rest => this.props.selectedRestId === rest.get('guid')).get('id');
    const currentRoleGuid = this.props.roles.getIn([this.props.selectedRoleId, 'guid']);
    let restWithSelectedRoleGuid;
    if ( values.role !== 0 && values.role !== '0' ) {
      restWithSelectedRoleGuid = this.props.roles.valueSeq().find(role => values.role === role.get('id')).get('restGuid');
    } else {
      restWithSelectedRoleGuid = this.props.selectedRestId;
    }
    const restWithSelectedRoleId = this.props.restaurants.valueSeq().find(rest => restWithSelectedRoleGuid === rest.get('guid')).get('id');
    console.log(empMap, values, restWithSelectedRoleGuid, this.props.selectedRestId);
    let putValues = {};
    if ( restWithSelectedRoleGuid !== this.props.selectedRestId ) {
      let prevRoles = empMap.get('roles');
      let roleObj = prevRoles.toObject();
      roleObj[restWithSelectedRoleId] = values.role;
      delete roleObj[currentRestId];
      values.roles = roleObj;
      putValues = (
        ({ cardCode, code, guid, id, name, roles }) => ({cardCode, code, guid, id, name, roles})
      )(values);
    } else {
      let prevRoles = empMap.get('roles');
      let roleObj = prevRoles.toObject();
      roleObj[currentRestId] = values.role;
      values.roles = roleObj;
      putValues = (
        ({ cardCode, code, guid, id, name, roles }) => ({cardCode, code, guid, id, name, roles})
      )(values);
    }
    // this.props.updateEmpl(putValues);
    axios.put(`${__CONFIG__.apiURL}/employees/${putValues.guid}`, putValues, config)
      .then((res)=>{
        this.props.updateEmpl(res.data.data);
      })
      // .then(() =>
      //   axios.get(`${__CONFIG__.apiURL}/employees?roleGuid=${currentRoleGuid}`, config)
      // // TODO: with roleGUID
      //     .then((res) => {
      //       const employees = res.data.data;
      //       // console.log(employees);
      //       // this.setState({ employees });
      //       this.props.successEmpl({ employees });
      //     })  
      // )
      // .then(
      //   () => this.forceUpdate()
      // )  
      .catch((err) => {
        console.warn('PUT employee network error:', err);
      });
  }

  selectEmployee = (guid) => {
    if (this.props.ui.selectedGuidForEdit === guid) {
      console.log('same');
      this.props.selectEmpl({ guid: '' });
    } else {
      this.props.selectEmpl({ guid });
    }
  } 

  render() {
    const { loadingRestaurants, loadingRoles, loadingEmplo } = this.props.ui;
    let filteredEmpl = ''; let selectedRestSimpleId = ''; let selectedRoleGuid = ''; let selectedRoleIdNum = '';
    console.log(this.props.restaurants)
    if (!!this.props.selectedRestId && this.props.restaurants.size > 0) {
      selectedRestSimpleId = this.props.restaurants.valueSeq()
        .find(rest => rest.get('guid') === this.props.selectedRestId)
        .get('id')
        .toString();
    } else { selectedRestSimpleId = '' };
    if (!!this.props.selectedRoleId) {
      selectedRoleIdNum = parseInt(this.props.selectedRoleId);
      selectedRoleGuid = this.props.roles.getIn([this.props.selectedRoleId, 'guid'])
      // .toString();
    } else  { selectedRoleGuid = '' };
    console.log(selectedRestSimpleId, selectedRoleIdNum);
    filteredEmpl = this.props.employees
      .filter((empl) => {
      // console.log(empl.get('roles'));
        let roles = empl.get('roles');
        if (selectedRestSimpleId !== '') {
          if (selectedRoleGuid !== '') {
            return (roles.has(selectedRestSimpleId) && roles.contains(selectedRoleIdNum));
          } else {
            return (roles.has(selectedRestSimpleId));
          } 
        }
      });
    console.log(filteredEmpl);
    return (
      <div className="rk-private">
      <ErrorBoundary>
        <div className="rk-restaurants-list">
          {
            (loadingRestaurants || loadingRoles) && <Loading />
          }
          {
            (!loadingRestaurants && !loadingRoles) &&
            <ul>
              {
                !!this.props.restaurants && this.props.restaurants.valueSeq().map(rest => (
                  <RestaurantInfo
                    isSelected={this.props.selectedRestId === rest.get('guid')}
                    restMap={rest}
                    rolesMap={this.props.roles.valueSeq().filter(
                      role => { return rest.get('guid') == role.get('restGuid')} // TODO: strict equal?
                    )}
                    key={`rest_${rest.get('guid')}`}
                  >--</RestaurantInfo>)
                )
              }
            </ul>
          }
        </div>
        <div className="rk-editarea">
          <Switch>
            <Route 
              path="/:restaurantId/:roleId"
              render={props => (
                <EmployeesRole restId={this.props.selectedRestId} roleId={this.props.selectedRoleId} />
              )}/>
            {/* <Form employeeGuid="A1-KUN" /> */}
            <Route 
              path="/:restaurantId"
              render={() => (
                <h1>Все сотрудники</h1>
              )}/>
          </Switch>
          {
            this.props.selectedRestId !== undefined && !loadingEmplo &&
            // this.props.selectedRoleId !== undefined &&
          <div className="cards-container">
            <div className="cards">
              {
                filteredEmpl.valueSeq()
                // .filter((emp) =>
                //   {emp.hasthis.props.selectedRestId}
                // )
                  .sort((a,b) => a.get('name') > b.get('name'))
                  .map((emp, index) => {
                    const curRestForRole = this.props.restaurants.valueSeq().find(rest => this.props.selectedRestId === rest.get('guid')).get('id');
                    return (<CardExampleExpandable key={`cee${index}`} saveEmployeeFn={this.saveEmployee} selectEmployeeFn={this.selectEmployee} 
                      empMap={emp}
                      isExpandedForEdit={this.props.ui.selectedGuidForEdit === emp.get('guid')}
                      values={{
                        guid: emp.get('guid'),
                        name: emp.get('name'),
                        id: emp.get('id'),
                        code: emp.get('code'),
                        cardCode: emp.get('cardCode'),
                        role: emp.getIn(['roles', String(curRestForRole)]),
                        availableRoles: this.props.roles.valueSeq().filter(role => this.props.selectedRestId === role.get('restGuid')),
                        otherRoles: this.props.roles.valueSeq()
                          .filter(role => this.props.selectedRestId !== role.get('restGuid'))
                          .map((role) => {
                            return role.set(
                              'restaurantName', // key
                              this.props.restaurants.valueSeq().find(rest => role.get('restGuid') === rest.get('guid')).get('name') // value
                            );
                          }),
                    }}
                  />)
                })
              }
            </div>
          </div>
          }
          { loadingEmplo && <Loading /> }
          {/* <CardExampleExpandable /> */}
          {/* <ul>
            <li>lorem</li>
            <li>ipsum</li>
            <li>3</li>
          </ul> */}
        </div>
        </ErrorBoundary>
      </div>
    )
  }
}

export default PrivateView;