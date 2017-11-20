import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const GET_EMPL = 'app/emplo/GET_EMPL';
const SUCCESS_EMPL = 'app/emplo/SUCCESS_EMPL';

export const constants = {
  GET_EMPL,
  SUCCESS_EMPL,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getEmpl = createAction(GET_EMPL);
export const successEmpl = createAction(SUCCESS_EMPL, (result) => {
  return result
});

export const actions = {
  getEmpl,
  successEmpl,
};

export const reducers = {
  [GET_EMPL]: state =>
    state.merge({
      loading: true,
    }),
  [SUCCESS_EMPL]: (state, { payload }) => {
    console.log(payload);
    const emplById = payload.employees.reduce(
      (map,rest) => {
        let mapById = Object.assign({}, map);
        mapById[rest.id] = rest
        return mapById
      }, {}
    )
    return state.merge({
      emplById,
      loading: false,
    });
  },
}

export const initialState = () =>
  Map({
    empl: [],
    emplById: new Map(),
    loading: false,
  })

export default handleActions(reducers, initialState());
