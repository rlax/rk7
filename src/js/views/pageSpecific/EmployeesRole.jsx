import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Route, Link, NavLink } from 'react-router-dom';
// import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import { ErrorBoundary } from '../../common/components/Utilities';

class EmployeesRole extends Component {
  static PropTypes = {
  }
  constructor(props) {
    super(props);

    this.state = {rolesList: []};
  }

  componentDidMount() {
    const {restId} = this.props;
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
      }
    };
    // axios.get(`${__CONFIG__.apiURL}/roles?restaurantGuid=${restId}`, config)
    //   .then((res) => {
    //     const rolesList = res.data; // TODO: with data.data
    //     this.setState({ rolesList });
    // })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.restId !== nextProps.restId) {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
        }
      };
      // axios.get(`${__CONFIG__.apiURL}/roles?restaurantGuid=${nextProps.restId}`, config)
      //   .then((res) => {
      //     const rolesList = res.data; // TODO: with data.data
      //     this.setState({ rolesList });
      //   })
    }
  }

  render() {
    const { restId, restName, roleName, roleId } = this.props;
    return (
      <div className="empListInfoCard">
        {/* {
          this.state.rolesList.length !== 0 && this.state.rolesList.map(role => (
            <div className="roles-header"><h2 className="role-title">{role.name}</h2><span>{role.id} || {role.guid}</span></div>
          ))
        } */}
        <div className="employeeCard-title">
          {!!restName ? restName : `--- (${restId})`}
        </div>
        <div className="roles-header">
          <h2 className="role-title">{!!roleName ? roleName : `Роль ${roleId}`}</h2>
        </div>
      </div>
    );
  }
}

export default EmployeesRole;