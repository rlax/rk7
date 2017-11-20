import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import example from './modules/example';
import auth from './modules/auth';
import resta from './modules/resta';
import emplo from './modules/emplo';
import roles from './modules/roles';

export default combineReducers({
  example,
  auth,
  routing,
  resta,
  emplo,
  roles,
  form: formReducer
});
