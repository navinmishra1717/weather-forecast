import {
  call,
  takeEvery,
  takeLatest,
  select,
  put,
  takeLeading,
  delay,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { loadForecastFailure } from '../ForecastPage/actions';

function* loadContent(action) {
  yield call(
    Api.get(`default`, actions.defaultSuccess, actions.defaultFailure),
  );
}

function* networkError() {
  const snackbarData = {
    message: 'Something went wrong. Please check your network!',
    options: {
      variant: 'warning',
    },
  };
  yield put(actions.enqueueSnackbar(snackbarData));
  yield delay(2000);
}

export default function* defaultSaga() {
  yield takeEvery(types.DEFAULT_REQUEST, loadContent);
  yield takeLeading(types.NETWORK_ERROR, networkError);
}
