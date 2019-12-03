import {
  loadForecastSuccess,
  loadForecastFailure,
  loadForecastRequest,
} from '../actions';
import {
  LOAD_FORECAST_FAILURE,
  LOAD_FORECAST_SUCCESS,
  LOAD_FORECAST_REQUEST,
} from '../constants';

describe('ForecastPage actions', () => {
  describe('loadForecastRequest', () => {
    it('has a type of LOAD_FORECAST_REQUEST', () => {
      const expected = {
        type: LOAD_FORECAST_REQUEST,
      };
      expect(loadForecastRequest()).toEqual(expected);
    });
  });
  describe('loadForecastSuccess', () => {
    it('has a type of LOAD_FORECAST_SUCCESS', () => {
      const expected = {
        type: LOAD_FORECAST_SUCCESS,
      };
      expect(loadForecastSuccess()).toEqual(expected);
    });
  });
  describe('loadForecastFailure', () => {
    it('has a type of LOAD_FORECAST_FAILURE', () => {
      const expected = {
        type: LOAD_FORECAST_FAILURE,
      };
      expect(loadForecastFailure()).toEqual(expected);
    });
  });
});
