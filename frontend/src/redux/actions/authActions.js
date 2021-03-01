/**
 * @file Actions used for authentication (register/login)
 * @requires axios
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import axios from 'axios';
import { returnError } from './errorActions';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATEINFO_SUCCESS,
  UPDATEINFO_FAIL,
  LOADING,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from '../types';

export const tokenConfig = (getState) => {
  // Get token from localstorage
  let token;
  if (getState) {
    token = getState().auth.token;
  }

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
};

/**
 * Sends a request to verify the user with token.
 * @param {Object} form_params The registration information entered by user.
 */
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  axios
    .get('/api/user/auth', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data.msg, err.response.status, AUTH_FAIL));
      dispatch({
        type: AUTH_FAIL,
      });
    });
};

/**
 * Sends a request to the server to try and authenticate a user. Dispatches actions to
 * trigger state changes based on success/fail.
 * @param {Object} form_params The login information entered by the user.
 */
export const login = ({ uname, pass }) => (dispatch) => {
  const body = JSON.stringify({ uname, pass });
  axios
    .post('/api/user/login', body, tokenConfig())
    .then((res) => {
      Promise.resolve(
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        }),
      ).then(() => dispatch(loadUser()));
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
export const register = ({ fname, lname, ssn, email, username, pass }) => (dispatch) => {
  dispatch({ type: LOADING });
  const body = JSON.stringify({ fname, lname, ssn, email, username, pass });
  axios
    .post('/api/user/register', body, tokenConfig())
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
