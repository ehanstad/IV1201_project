/**
 * @file Actions used for handling http errors.
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import {
  SET_ERROR,
  CLEAR_ERROR,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_OLD_USER_FAIL,
  UPDATE_OLD_USER_SUCCESS,
} from '../types';

function getErrorMessage(status, id) {
  if (id === LOGIN_FAIL && (status === 400 || status === 401)) {
    return 'Incorrect username or password';
  }
  if (id === REGISTER_FAIL && status === 400) {
    return 'Invalid field(s), remove any special characters from name and surname, email needs to be valid, ssn needs to be in format YYYYMMDDXXXX';
  }
  if (id === REGISTER_FAIL && status === 403) {
    return 'A user with that email or password already exists';
  }
  if (id === REGISTER_SUCCESS) {
    return 'Account created successfully';
  }
  if (id === UPDATE_OLD_USER_SUCCESS) {
    return 'Account updated successfully';
  }
  if (id === UPDATE_OLD_USER_FAIL && status === 400) {
    return 'Invalid field(s), remove any special characters from name and surname, email needs to be valid, ssn needs to be in format YYYYMMDDXXXX';
  }
  if (id === UPDATE_OLD_USER_FAIL && status === 401) {
    return 'Invalid password.';
  }
  return 'Something went wrong, try again later';
}

/**
 * Dispatches an action to update the http error state.
 * @param {string} message The error message.
 * @param {number} status The http status code.
 * @param {number} id The id of the error.
 */
export const returnError = (status, id) => (dispatch) => {
  const message = getErrorMessage(status, id);
  dispatch({
    type: SET_ERROR,
    payload: {
      message,
      status,
      id,
    },
  });
};

/**
 * Dispatches an action to clear the http error state.
 */
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
