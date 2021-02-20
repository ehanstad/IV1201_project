/**
 * @file Actions used for handling http errors.
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import { SET_ERROR, CLEAR_ERROR } from '../types';

/**
 * Dispatches an action to update the http error state.
 * @param {string} message The error message.
 * @param {number} status The http status code.
 * @param {number} id The id of the error.
 */
export const returnError = (message, status, id) => (dispatch) => {
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
