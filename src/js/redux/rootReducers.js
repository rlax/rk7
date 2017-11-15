import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import example from './modules/example';
import auth from './modules/auth';

export default combineReducers({
  example,
  auth,
  routing,
  form: formReducer
});
