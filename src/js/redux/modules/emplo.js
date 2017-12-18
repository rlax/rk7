import { createAction, handleActions } from 'redux-actions';
<<<<<<< HEAD
import { Map, fromJS } from 'immutable';
=======
import { Map } from 'immutable';
>>>>>>> 29b49a7fc9c6174a7133a135bafc78fd3fdefff4

const GET_EMPL = 'app/emplo/GET_EMPL';
const SUCCESS_EMPL = 'app/emplo/SUCCESS_EMPL';
const SELECT_EMPL = 'app/emplo/SELECT_EMPL';
const UPDATE_EMPL = 'app/emplo/UPDATE_EMPL';

export const constants = {
  GET_EMPL,
  SUCCESS_EMPL,
  SELECT_EMPL,
  UPDATE_EMPL,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getEmpl = createAction(GET_EMPL);
export const successEmpl = createAction(SUCCESS_EMPL, (result) => {
  return result
});
export const selectEmpl = createAction(SELECT_EMPL, (res) => (res));
export const updateEmpl = createAction(UPDATE_EMPL, (res) => (res));

export const actions = {
  getEmpl,
  successEmpl,
  selectEmpl,
  updateEmpl,
};

export const reducers = {
  [GET_EMPL]: state =>
    state.merge({
      loading: true,
    }),
  [SUCCESS_EMPL]: (state, { payload }) => {
    const emplById = payload.employees.reduce(
      (map,rest) => {
        let mapById = Object.assign({}, map);
        mapById[rest.id] = rest
        return mapById
      }, {}
    );
    return state.mergeDeep({
      emplById,
      loading: false,
    });
  },
  [SELECT_EMPL]: (state, { payload }) => state.merge({
    selectedGuidForEdit: payload.guid,
  }),
  [UPDATE_EMPL]: (state, { payload }) => {
    const newEmpl = {[payload.id]: payload};
    const newEmplMap = fromJS(payload);
    return state.setIn(['emplById', `${payload.id}`], newEmplMap)
  },
}

export const initialState = () =>
  Map({
    empl: [],
    emplById: new Map(),
    loading: false,
    selectedGuidForEdit: '',
  })

export default handleActions(reducers, initialState());
