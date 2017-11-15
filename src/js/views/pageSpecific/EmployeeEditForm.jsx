import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import { required, integer } from '../../utility/validation';

const EmployeeEditForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Код карты</label>
        <div>
          <Field
            name="cardCode"
            component={TextField}
            hintText="Код карты"
            floatingLabelText="Код карты - число"
            validate={[required, integer]}
          />
        </div>
      </div>
      <div>
        <label>Роль</label>
        <div>
          <Field
            name="role"
            component={TextField}
            hintText="Роль"
            floatingLabelText="Роль"
            validate={[required, integer]}
          />
        </div>
      </div>
      <div>
        <FlatButton type="submit" disabled={pristine || submitting} label="Войти" />
        {/* <button type="button" disabled={pristine || submitting} onClick={reset}>
          Сбросить поля
        </button> */}
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'saveEmployee', // a unique identifier for this form
})(EmployeeEditForm);