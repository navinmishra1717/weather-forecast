import produce from 'immer';
import ForecastPageReducer from '../reducer';
import { loadForecastSuccess } from '../actions';

describe('ForecastPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      forecast: {
        cod: '',
        message: '',
        cnt: 0,
        list: [],
        city: {},
      },
      loading: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(ForecastPageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   **/

  it('should handle the loadForecastSuccess action correctly', () => {
    const mockObj = {
      cod: '200',
      message: '0',
      cnt: '1',
      list: [
        {
          dt: 'time of forecast',
          main: { temp: 'some temp' },
          dt_txt: 'time of calculation',
        },
      ],
      city: {
        name: 'Kathmandu',
        country: 'NP',
      },
    };
    const expectedResult = produce(state, draft => {
      draft.forecast = mockObj;
      draft.loading = false;
    });
    expect(ForecastPageReducer(state, loadForecastSuccess())).toEqual(
      expectedResult,
    );
  });
});
