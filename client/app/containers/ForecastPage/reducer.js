import produce from 'immer';
import * as types from './constants';

export const initialState = {
  forecast: {
    code: '',
    message: '',
    cnt: 0,
    list: [],
    city: {},
  },
  loading: false,
};

const faqPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_FORECAST_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_FORECAST_SUCCESS:
        draft.forecast = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_FORECAST_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default faqPageReducer;
