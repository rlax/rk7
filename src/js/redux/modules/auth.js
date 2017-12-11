import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const POST_LOGIN = 'app/auth/POST_LOGIN';
const SUCCESS_LOGIN = 'app/auth/SUCCESS_LOGIN';
const ERROR_LOGIN = 'app/auth/ERROR_LOGIN';

export const constants = {
  POST_LOGIN,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
};

// ------------------------------------
// Actions
// ------------------------------------
export const postLogin = createAction(POST_LOGIN);
export const errorLogin = createAction(ERROR_LOGIN);
export const successLogin = createAction(SUCCESS_LOGIN, (result) => {
  return result
});

export const actions = {
  postLogin,
  successLogin,
  errorLogin,
};

export const reducers = {
  [POST_LOGIN]: state =>
    state.merge({
      loading: true,
    }),
  [SUCCESS_LOGIN]: (state, { payload }) =>
    state.merge({
      ...payload,
      auth: true,
      error: '',
      loading: false,
    }),
  [ERROR_LOGIN]: (state, { payload }) =>
    state.merge({
      auth: false,
      error: !!payload.error ? payload.error : 'Ошибка аутентификации/неправильный токен. Неправильный логин/пароль или сетевая ошибка при входе. Попробуйте еще раз.',
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
