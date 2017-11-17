import { createSelector } from 'reselect';
import { Map } from 'immutable';

const restaDataSelector = state => state.resta;

const restaByIdListSelector = createSelector(
  restaDataSelector,
  payload => payload.get('restaById')
);

export const restaListSelector = state => restaByIdListSelector(state);

export const restaByIdSelector = (state, id) => {
  console.log(restaByIdListSelector(state));
  return { result: restaByIdListSelector(state).get(id) }
};
