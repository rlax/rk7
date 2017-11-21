import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const GET_EMPL = 'app/emplo/GET_EMPL';
const SUCCESS_EMPL = 'app/emplo/SUCCESS_EMPL';
const SELECT_EMPL = 'app/emplo/SELECT_EMPL';

export const constants = {
  GET_EMPL,
  SUCCESS_EMPL,
  SELECT_EMPL,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getEmpl = createAction(GET_EMPL);
export const successEmpl = createAction(SUCCESS_EMPL, (result) => {
  return result
});
export const selectEmpl = createAction(SELECT_EMPL, (res) => (res));

export const actions = {
  getEmpl,
  successEmpl,
  selectEmpl,
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
  [SELECT_EMPL]: (state, { payload }) => state.merge({
    // console.log(payload);
    selectedGuidForEdit: payload.guid,
  }),
}

export const initialState = () =>
  Map({
    empl: [],
    emplById: new Map(),
    loading: false,
    selectedGuidForEdit: '5b5f9881-ae38-481b-9b06-261d258f97f1',
  })

export default handleActions(reducers, initialState());
