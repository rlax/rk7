import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { actions as exampleActions } from '../../redux/modules/example';
import { ErrorBoundary } from '../../common/components/Utilities';

require('../../../style/index.css');
require('../../../style/private.css');

class PrivateView extends Component {
  static PropTypes = {
  }

  componentDidMount() {
    this.props.getAwesomeCode();
    console.log(__CONFIG__);
    const config = {
      // headers: {
      //   // 'Authorization': 'Bearer ' + localStorage.getItem('rk7token'),
      // }
    };
    console.groupCollapsed('API call with token:', localStorage.getItem('rk7token'));

  }

  render() {
    return (
      <div className="rk-private">
        <div className="rk-restaurants-list">
          <ul>
            <li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li>
            <li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li>
            <li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li>
            <li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li>
            <li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li>
            <li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li>
            <li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
        <div className="rk-editarea">
          <ul>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default PrivateView;