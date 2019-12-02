import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.forecast || initialState;

export const makeSelectForecast = () =>
  createSelector(
    selectDomain,
    state => state.forecast,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );
