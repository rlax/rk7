import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { emplByIdListSelector, employeeTotalSelector, emploMapByIdDataSelector } from '../../redux/selectors/emploSelector';

import { required, integer } from '../../utility/validation';

let EmployeeEditForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, initialValues, form } = props
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
        {/* <label>Код карты</label> */}
        <div>
          <Field
            name="name"
            component={TextField}
            disabled
            hintText="Имя"
          />
        </div>
      </div>
      <div>
        {/* <label>Код карты</label> */}
        <div>
          <Field
            name="id"
            component={TextField}
            disabled
            hintText="---"
          />
        </div>
      </div>
      <div>
        {/* <label>Код карты</label> */}
        <div>
          <Field
            name="code"
            component={TextField}
            disabled
            hintText="Код"
          />
        </div>
      </div>
      <div>
        {/* <label>Код карты</label> */}
        <div>
          <Field
            name="guid"
            component={TextField}
            disabled
            hintText="Идентификатор"
          />
        </div>
      </div>
      <div>
        <FlatButton type="submit" disabled={pristine || submitting} label="Изменить" />
        {/* <button type="button" disabled={pristine || submitting} onClick={reset}>
          Сбросить поля
        </button> */}
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