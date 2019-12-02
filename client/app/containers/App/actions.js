/*
 *
 * App actions
 *
 */

import * as types from './constants';

export const defaultRequest = payload => ({
  type: types.DEFAULT_REQUEST,
  payload,
});
export const defaultSuccess = payload => ({
  type: types.DEFAULT_SUCCESS,
  payload,
});
export const defaultFailure = payload => ({
  type: types.DEFAULT_FAILURE,
  payload,
});
export const sessionExpired = token => ({
  type: types.SESSION_EXPIRED,
  payload: token,
});

export const networkError = token => ({
  type: types.NETWORK_ERROR,
  payload: token,
});

export const enqueueSnackbar = notification => ({
  type: types.ENQUEUE_SNACKBAR,
  payload: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});
export const removeSnackbar = payload => ({
  type: types.REMOVE_SNACKBAR,
  payload,
});
