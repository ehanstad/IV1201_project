import { SET_ERROR, CLEAR_ERROR } from '../types';

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

export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
