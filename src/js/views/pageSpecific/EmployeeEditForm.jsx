import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import { connect } from 'react-redux';
import { required, integer } from '../../utility/validation';
require('../../../style/emplForm.css');

const fieldStyle = { width: '260px'};
const disabledFieldStyle = { width: '160px', height: '72px'};
const selectedMenuItemStyle = {color: '#a51d1d', backgroundColor: '#f9d6d0'} ;
const dividerColor = {};

let EmployeeEditForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, initialValues, form, empData } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="employeeCard__field-wrap">
        <label>Код карты</label>
        <div>
          <Field
            name="cardCode"
            style={fieldStyle}
            component={TextField}
            hintText="Код карты"
            floatingLabelText="Код карты - число"
            validate={[integer]}
          />
        </div>
      </div>
      <div className="employeeCard__field-wrap">
        <label>Роль</label>
        <div>
          <Field
            name="role"
            autoWidth
            // style={fieldStyle}
            selectedMenuItemStyle={selectedMenuItemStyle}
            component={SelectField}
            hintText="Роль"
            floatingLabelText="Роль"
          >
            {empData.availableRoles.map((role) => (
              <MenuItem 
                key={`${role.get('id')}`}
                label={`${role.get('name')}`}
                value={role.get('id')}
                >
                <span>{`${role.get('name')} `}</span>
                <span className="rk-remove">{role.get('id')}</span>
              </MenuItem>)
            )}
            <MenuItem value="0" primaryText="Сбросить роль" />
            <Divider style={dividerColor} />
            <div style={{textAlign:'center'}}>
              <span className="rk-select-info">
                Для переноса в другой ресторан можно выбрать его роль из списка ниже
              </span>
            </div>
            <Divider style={dividerColor} />
            {empData.otherRoles
            .sort((a,b) => a.get('restaurantName') < b.get('restaurantName'))
            .map((role) => (
                <MenuItem 
                  key={`${role.get('id')}`}
                  label={`${role.get('name')} (${role.get('restaurantName')})`}
                  value={role.get('id')}
                  rightIcon={<PersonAdd />}
                  >
                  <div className="rk-select-hint">{role.get('restaurantName')}</div>
                  <span>{`${role.get('name')} `}</span><span className="rk-remove">{role.get('id')}</span>
                </MenuItem>
            )
            )}
          </Field>
        </div>
      </div>
      <div className="employeeCard__field-wrap">
        <label>Имя</label>
        <div>
          <Field
            name="name"
            style={disabledFieldStyle}
            component={TextField}
            disabled
            hintText="Имя"
          />
        </div>
      </div>
      <div className="employeeCard__field-wrap">
        <label>Внутренний ID</label>
        <div>
          <Field
            name="id"
            style={disabledFieldStyle}
            component={TextField}
            disabled
            hintText="ID"
          />
        </div>
      </div>
      <div className="employeeCard__field-wrap">
        <label>Код сотрудника</label>
        <div>
          <Field
            name="code"
            style={disabledFieldStyle}
            component={TextField}
            disabled
            hintText="Код"
          />
        </div>
      </div>
      <div className="employeeCard__field-wrap">
        <label>Идентификатор</label>
        <div>
          <Field
            name="guid"
            style={disabledFieldStyle}
            component={TextField}
            disabled
            hintText="Идентификатор"
          />
        </div>
      </div>
      <div className="employeeCard__field-wrap">
        <div>
          <RaisedButton type="submit" disabled={pristine || submitting} label="Изменить" primary />
          {/* <button type="button" disabled={pristine || submitting} onClick={reset}>
            Сбросить поля
          </button> */}
        </div>
      </div>
    </form>
  )
}

EmployeeEditForm = reduxForm({
  /* form: `saveEmployee${this.props.id}`, // a unique identifier for this form */
  // initialValues: this.props.empData,
})(EmployeeEditForm);

/* EmployeeEditForm = connect(
  (state, props) => {
    return {
      form: `saveEmployee-${props.id}`, // a unique identifier for this form
    }
  }
) */

export default EmployeeEditForm;