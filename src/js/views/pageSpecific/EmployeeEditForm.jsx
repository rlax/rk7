import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { required, integer } from '../../utility/validation';
require('../../../style/emplForm.css');

let fieldStyle = { width: '260px'};
let disabledFieldStyle = { width: '160px', height: '72px'};

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
            // style={fieldStyle}
            component={SelectField}
            hintText="Роль"
            floatingLabelText="Роль"
          >
            {empData.availableRoles.map((role) => (
              <MenuItem key={`${role.get('id')}`} value={role.get('id')} primaryText={`${role.get('name')} / ${role.get('id')}`} />)
            )}
            <MenuItem value="0" primaryText="Сбросить роль" />
            <Divider inset />
            <span className="rk-remove">Для переноса в другой ресторан можно выбрать его роль из списка ниже</span>
            <Divider inset />
            {empData.otherRoles
            .sortBy(role => role.get('restaurantGuid'))
            .map((role) => (
                <MenuItem key={`${role.get('id')}`} value={role.get('id')} primaryText={`${role.get('name')} / ${role.get('id')}`}>
                  <span className="rk-select-hint">{role.get('restaurantName')}</span>
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