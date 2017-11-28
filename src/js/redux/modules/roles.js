import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const GET_ROLES_BY_REST = 'app/roles/GET_ROLES_BY_REST';
const SUCCESS_ROLES_BY_REST = 'app/roles/SUCCESS_ROLES_BY_REST';

export const constants = {
  GET_ROLES_BY_REST,
  SUCCESS_ROLES_BY_REST,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getRolesByRest = createAction(GET_ROLES_BY_REST);
export const successRolesByRest = createAction(SUCCESS_ROLES_BY_REST, (result) => {
  return result
});

export const actions = {
  getRolesByRest,
  successRolesByRest,
};

export const reducers = {
  [GET_ROLES_BY_REST]: state =>
    state.merge({
      loading: true,
    }),
  [SUCCESS_ROLES_BY_REST]: (state, { payload }) => {
    const rolesById = payload.roles.reduce(
      (map,rest) => {
        let mapById = Object.assign({}, map);
        rest.restGuid = payload.restGuid;
        mapById[rest.id] = rest;
        
        return mapById
      }, {}
    )
    return state.mergeDeep({
      rolesById,
      loading: false,
    });
  },
}

export const initialState = () =>
  Map({
    rolesById: new Map(),
    loading: false,
  })

export default handleActions(reducers, initialState());
