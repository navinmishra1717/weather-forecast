/**
 * Test sagas for forecast
 */

/* eslint-disable redux-saga/yield-effects */
import { take, call, put, select } from 'redux-saga/effects';
import defaultSaga from '../saga';
import { loadForecastRequest, loadForecastSuccess } from '../actions';

describe('defaultSaga Saga', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(false);
  });
  it('should get forecast data from API and call success action', () => {
    const action = loadForecastRequest();
    const gen = defaultSaga(action);

    const forecastData = {
      code: '200',
      message: '0',
      cnt: 40,
      list: [{ main: { temp: 'some data' } }],
      city: { name: 'Kathmandu' },
    };

    gen.next();
    expect(gen.next(true).value).toEqual(call('forecast', 1));
    expect(gen.next(forecastData).value).toEqual(
      put(loadForecastSuccess(forecastData)),
    );
    expect(gen.next().done).toBeTruthy();
  });
});
