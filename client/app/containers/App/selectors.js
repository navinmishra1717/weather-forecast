import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.router;

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectGlobal = state => state.global || initialState;

// export const makeSelectLoading = () =>
//   createSelector(
//     selectGlobal,
//     state => state.loading,
//   );

export const makeSelectNotifications = () =>
  createSelector(
    selectGlobal,
    state => state.notifications,
  );
