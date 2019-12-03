// import { fromJS } from 'immutable';
import { makeSelectForecast } from '../selectors';

describe('makeSelectForecast', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(false);
  });
  it('should select the forecastData', () => {
    const forecast = {
      cod: '200',
      message: '0',
      cnt: 1,
      list: [{ main: 'some data' }],
      city: { name: 'Kathmandu', country: 'NP' },
    };
    const mockedState = {
      forecast,
    };
    expect(makeSelectForecast()(mockedState)).toEqual(forecast);
  });
});
