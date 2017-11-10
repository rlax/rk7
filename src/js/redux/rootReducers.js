import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import example from './modules/example';
import auth from './modules/auth';

export default combineReducers({
  example,
  auth,
  routing,
});
