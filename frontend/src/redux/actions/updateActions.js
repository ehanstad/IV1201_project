/**
 * @file Actions used for updating old users
 * @requires axios
 * @author Erik Hanstad
 */
import axios from 'axios';
import { returnError } from './errorActions';
import { tokenConfig } from './authActions';
import { UPDATEINFO_SUCCESS, UPDATEINFO_FAIL, LOADING } from '../types';

/**
 * Sends a request to the server and gets the info about what info is missing
 * with the user with the email
 * @param {Object} form_params The email input from the user.
 */
export const updateInfo = ({ email }) => (dispatch) => {
  dispatch({ type: LOADING });
  const body = JSON.stringify({ email });
  axios
    .post('/api/user/getUpdateInfo', body, tokenConfig())
    .then((res) => {
      dispatch({
        type: UPDATEINFO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data.msg, err.response.status, UPDATEINFO_FAIL));
      dispatch({
        type: UPDATEINFO_FAIL,
      });
    });
};

/**
 * Sends a request to the server and gets the info about what info is missing
 * with the user with the email
 * @param {Object} form_params The email input from the user.
 */
export const updateUserInfo = ({ email, name, surname, password, ssn, username }) => (dispatch) => {
  dispatch({ type: LOADING });
  const body = JSON.stringify({ email, name, surname, password, ssn, username });
  axios
    .post('/api/user/updateInfo', body, tokenConfig())
    .then(() => {
      dispatch({
        type: UPDATEINFO_SUCCESS,
        payload: null,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data.msg, err.response.status, UPDATEINFO_FAIL));
      dispatch({
        type: UPDATEINFO_FAIL,
      });
    });
};
