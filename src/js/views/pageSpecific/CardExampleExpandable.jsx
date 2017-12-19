import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import EmployeeEditForm from '../pageSpecific/EmployeeEditForm';

class CardExampleExpandable extends Component {
  static PropTypes = {
  }
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    if (expanded) {
      this.props.selectEmployeeFn(this.props.empMap.get('guid'));
    } else {
      this.props.selectEmployeeFn('');
    }
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    const { empMap, values } = this.props;
    const { isExpandedForEdit } = this.props;
    return (
      <div className="employeeCard">
        <Card expanded={isExpandedForEdit}>
          <CardHeader
            title={empMap.get('name')}
            subtitle={`Код карты: ${empMap.get('cardCode')}`}
            actAsExpander={false}
            showExpandableButton={false}
          >
            <div className="employeeCard-subheader">
              {/* <div className="employeeCard-row">Cardcode - {empMap.get('cardCode')}</div>
              <div className="employeeCard-row">name - {empMap.get('name')}</div>
              <div className="employeeCard-row">guid - {empMap.get('guid')}</div>
              <div className="employeeCard-row">code - {empMap.get('code')}</div>
              <div className="employeeCard-row">id - {empMap.get('id')}</div>           */}
            </div>
            <Toggle
              toggled={isExpandedForEdit}
              onToggle={()=>this.props.selectEmployeeFn(empMap.get('guid'))}
              labelPosition="right"
              label="Редактировать"
            />
          </CardHeader>
          {/* <CardActions>
            <FlatButton disabled label="- - -" />
            <FlatButton disabled label="+ + +" />
          </CardActions> */}
          <CardText expandable>
            <EmployeeEditForm
              onSubmit={(values)=>this.props.saveEmployeeFn(empMap,values)}
              form={`${empMap.get('guid')}`}
              initialValues={
                {name: empMap.get('name'), cardCode: empMap.get('cardCode'), code: empMap.get('code'), guid: empMap.get('guid'), id: empMap.get('id'),
                role: values.role
                }
              }
              empData={
                {name: empMap.get('name'), cardCode: empMap.get('cardCode'), code: empMap.get('code'), guid: empMap.get('guid'), id: empMap.get('id'),
                availableRoles: values.availableRoles, otherRoles: values.otherRoles}
              }
            />
            {/* <div className="employeeCard-row card-meta">Role :: <pre>--^^--</pre></div> */}
          </CardText>
        </Card>
      </div>
    )
  }
}

export default CardExampleExpandable;