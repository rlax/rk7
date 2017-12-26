import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Route, Link, NavLink } from 'react-router-dom';
// import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import { connect } from 'react-redux';
import { ErrorBoundary } from '../../common/components/Utilities';
import { actions as emploActions } from '../../redux/modules/emplo';

const mapDispatchToProps = { ...emploActions };

@connect(null, mapDispatchToProps)
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
    axios.get(`${__CONFIG__.apiURL}/roles?restaurantGuid=${restId}`, config)
      .then((res) => {
        const rolesList = res.data.data; // TODO: with data.data
        this.setState({ rolesList });
      })
      .then(() => this.props.getEmpl())
      .then(() => {
    // if (!!this.props.rolesList) {
        // debugger;
        let axiosFnArray = [];
        this.state.rolesList.forEach((role) => {
          const config = { headers: {'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),}};
          const getEmplForRole = (role) => {
            axios.get(`${__CONFIG__.apiURL}/employees?roleGuid=${role.guid}`, config)
            // TODO: with roleGUID
              .then((res) => {
                const employees = res.data.data;
                // console.log(employees);
                // this.setState({ employees });
                this.props.successEmpl({ employees });
              })
          }
          axiosFnArray.push(getEmplForRole(role));
        });
      })
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.restId !== nextProps.restId) {
      const {restId} = nextProps;
      const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
        }
      };
      axios.get(`${__CONFIG__.apiURL}/roles?restaurantGuid=${restId}`, config)
      .then((res) => {
        const rolesList = res.data.data; // TODO: with data.data
        this.setState({ rolesList });
      })
      .then(() => this.props.getEmpl())
      .then(() => {
        if (!!this.props.rolesList) {
        // debugger;
        let axiosFnArray = [];
        this.state.rolesList.forEach((role) => {
          const config = { headers: {'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),}};
          const getEmplForRole = (role) => {
            axios.get(`${__CONFIG__.apiURL}/employees?roleGuid=${role.guid}`, config)
            // TODO: with roleGUID
              .then((res) => {
                const employees = res.data.data;
                // console.log(employees);
                // this.setState({ employees });
                this.props.successEmpl({ employees });
              })
          }
          axiosFnArray.push(getEmplForRole(role));
        });
        }
      })
    // }
    }
  }

  render() {
    const { restId, roleId } = this.props;
    return (
      <div className="employeeCard">
        {/* {
          this.state.rolesList.length !== 0 && this.state.rolesList.map(role => (
            <div className="roles-header"><h2 className="role-title">{role.name}</h2><span>{role.id} || {role.guid}</span></div>
          ))
        } */}
        <div className="employeeCard-title">Rest - {restId}</div>
        <div className="roles-header">
          <h2 className="role-title">{roleId}</h2>
        </div>
      </div>
    );
  }
}

export default EmployeesRole;