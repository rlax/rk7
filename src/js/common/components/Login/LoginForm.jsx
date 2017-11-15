import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';

import { required } from '../../../utility/validation';

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ФИО</label>
        <div>
          <Field
            name="user"
            component={TextField}
            hintText="ФИО"
            floatingLabelText="ФИО полностью"
            validate={required}
          />
        </div>
      </div>
      <div>
        <label>Пароль</label>
        <div>
          <Field
            name="pass"
            component={TextField}
            hintText="Пароль хинт"
            type="password"
            floatingLabelText="Пароль"
            validate={required}
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
  form: 'login', // a unique identifier for this form
})(LoginForm);