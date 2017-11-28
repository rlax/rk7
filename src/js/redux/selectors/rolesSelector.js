import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const rolesData = state => state.roles.get('rolesById');

// export const emplByIdListSelector = createSelector(
//   rolesData,
//   map => map.filter(
//     emplo => emplo.id === 1029624
//   )
// );

// export const employeeTotalSelector = createSelector(
//   emploMapByIdDataSelector,
//   (res) => {
//     return res.size;
//   }
// )