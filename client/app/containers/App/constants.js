/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const API_BASE = 'http://localhost:4039/api/';

export const IMAGE_BASE = 'http://localhost:4039/';

export const DATE_FORMAT = 'll';

export const DEFAULT_REQUEST = 'app/App/DEFAULT_REQUEST';
export const DEFAULT_SUCCESS = 'app/App/DEFAULT_SUCCESS';
export const DEFAULT_FAILURE = 'app/App/DEFAULT_FAILURE';
export const NETWORK_ERROR = 'app/App/NETWORK_ERROR';
export const SESSION_EXPIRED = 'app/App/SESSION_EXPIRED';

export const ENQUEUE_SNACKBAR = 'app/App/ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'app/App/REMOVE_SNACKBAR';
