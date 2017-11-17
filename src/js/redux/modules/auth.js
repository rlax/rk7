import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const POST_LOGIN = 'app/auth/POST_LOGIN';
const SUCCESS_LOGIN = 'app/auth/SUCCESS_LOGIN';

export const constants = {
  POST_LOGIN,
  SUCCESS_LOGIN,
};

// ------------------------------------
// Actions
// ------------------------------------
export const postLogin = createAction(POST_LOGIN);
export const successLogin = createAction(SUCCESS_LOGIN, (result) => {
  return result
});

export const actions = {
  postLogin,
  successLogin,
};

export const reducers = {
  [POST_LOGIN]: state =>
    state.merge({
      loading: true,
    }),
  [SUCCESS_LOGIN]: (state, { payload }) =>
    state.merge({ 
      ...payload,
      loading: false,
    }),
}

export const initialState = () =>
  Map({
    auth: !!localStorage.rk7token,
    loading: false,
    user: 'Default',
  })

export default handleActions(reducers, initialState());
