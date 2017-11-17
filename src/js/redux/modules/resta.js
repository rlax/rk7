import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const GET_RESTA = 'app/resta/GET_RESTA';
const SUCCESS_RESTA = 'app/resta/SUCCESS_RESTA';

export const constants = {
  GET_RESTA,
  SUCCESS_RESTA,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getResta = createAction(GET_RESTA);
export const successResta = createAction(SUCCESS_RESTA, (result) => {
  return result
});

export const actions = {
  getResta,
  successResta,
};

export const reducers = {
  [GET_RESTA]: state =>
    state.merge({
      loading: true,
    }),
  [SUCCESS_RESTA]: (state, { payload }) => {
    const restaById = payload.restaurantsList.reduce(
      (map,rest) => {
        map[rest.id] = rest
        
        return map
      }, {}
    )
    return state.merge({
      restaById,
      loading: false,
    });
  },
}

export const initialState = () =>
  Map({
    restaurantsList: [],
    restaById: new Map(),
    loading: false,
  })

export default handleActions(reducers, initialState());
