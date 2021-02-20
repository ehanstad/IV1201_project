/**
 * @file Actions used for authentication (register/login)
 * @requires axios
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import axios from 'axios';
import { returnError } from './errorActions';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOADING } from '../types';

/**
 * Headers used when sending requests to server.
 */
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Sends a request to the server to try and authenticate a user. Dispatches actions to
 * trigger state changes based on success/fail.
 * @param {Object} form_params The login information entered by the user.
 */
export const login = ({ uname, pass }) => (dispatch) => {
  const body = JSON.stringify({ uname, pass });
  dispatch({ type: LOADING });
  axios
    .post('/api/user/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data.msg, err.response.status, LOGIN_FAIL));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

/**
 * Sends a request to the server to try and register a user. Dispatches actions to
 * trigger state changes based on success/fail.
 * @param {Object} form_params The registration information entered by user.
 */
export const register = ({ fname, lname, ssn, email, uname, pass }) => (dispatch) => {
  const body = JSON.stringify({ fname, lname, ssn, email, uname, pass });
  dispatch({ type: LOADING });
  axios
    .post('/api/user/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data.msg, err.response.status, REGISTER_FAIL));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
