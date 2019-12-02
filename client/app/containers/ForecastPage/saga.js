import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../App/actions';

function* loadForecast(action) {
  yield call(
    Api.get(
      'forecast',
      actions.loadForecastSuccess,
      actions.loadForecastFailure,
      null,
    ),
  );
}
function* loadForecastSuccessFunc(action) {
  yield put(
    enqueueSnackbar({
      message: action.payload.msg || 'Forecast data get success!!',
      options: {
        variant: 'success',
      },
    }),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_FORECAST_REQUEST, loadForecast);
  yield takeLatest(types.LOAD_FORECAST_SUCCESS, loadForecastSuccessFunc);
}
