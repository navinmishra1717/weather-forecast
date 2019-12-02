import * as types from './constants';

export const loadForecastRequest = payload => ({
  type: types.LOAD_FORECAST_REQUEST,
  payload,
});
export const loadForecastSuccess = payload => ({
  type: types.LOAD_FORECAST_SUCCESS,
  payload,
});
export const loadForecastFailure = payload => ({
  type: types.LOAD_FORECAST_FAILURE,
  payload,
});
