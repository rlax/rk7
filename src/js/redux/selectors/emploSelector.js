import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const emploMapByIdDataSelector = state => state.emplo.get('emplById');

export const emplByIdListSelector = createSelector(
  emploMapByIdDataSelector,
  map => map.filter(
    emplo => emplo.id === 1029624
  )
);

export const employeeSelectedSelector = state => {
  console.log(state.emplo.get('loading'));
  return state.emplo.get('selectedGuidForEdit')
};

export const employeeTotalSelector = createSelector(
  emploMapByIdDataSelector,
  (res) => {
    console.log(res);
    return res.size;
  }
)