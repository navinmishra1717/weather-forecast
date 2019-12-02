/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';

import * as types from './constants';
import * as utils from './utils';

// The initial state of the App
export const initialState = {
  access: {},
  loading: false,
  notifications: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action = { type: '' }) =>
  produce(state, draft => {
    switch (action.type) {
      case types.DEFAULT_SUCCESS:
        draft.access = initialState.access;
        break;
      case types.ENQUEUE_SNACKBAR:
        draft.notifications = [...draft.notifications, { ...action.payload }];
        break;
      case types.REMOVE_SNACKBAR:
        draft.notifications = [
          ...draft.notifications.filter(
            notification => notification.key !== action.payload,
          ),
        ];
        break;
    }
  });

export default appReducer;
