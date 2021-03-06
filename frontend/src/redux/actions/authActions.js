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
  LOADING,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_OLD_USER_SUCCESS,
  UPDATE_OLD_USER_FAIL,
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
      dispatch(returnError(err.response.status, AUTH_FAIL));
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
export const login = ({ username, password }) => (dispatch) => {
  const body = JSON.stringify({ username, password });
  dispatch({ type: LOADING });
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
      dispatch(returnError(err.response.status, LOGIN_FAIL));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

/**
 * De-authenticates the user.
 */
export const logout = () => ({ type: LOGOUT_SUCCESS });

/**
 * Sends a request to the server to try and register a user. Dispatches actions to
 * trigger state changes based on success/fail.
 * @param {Object} form_params The registration information entered by user.
 */
export const register = ({ fname, lname, ssn, email, username, password }) => (dispatch) => {
  dispatch({ type: LOADING });
  const body = JSON.stringify({ fname, lname, ssn, email, username, password });
  axios
    .post('/api/user/register', body, tokenConfig())
    .then((res) => {
      dispatch(returnError(res.status, REGISTER_SUCCESS));
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.status, REGISTER_FAIL));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

/**
 * Sends a request to the server to try and register a user. Dispatches actions to
 * trigger state changes based on success/fail.
 * @param {Object} form_params The registration information entered by user.
 */
export const updateOldUser = ({ name, surname, ssn, email, username, password }) => (dispatch) => {
  dispatch({ type: LOADING });
  const body = JSON.stringify({ name, surname, ssn, email, username, password });
  axios
    .patch('/api/user/old', body, tokenConfig())
    .then((res) => {
      dispatch(returnError(res.status, UPDATE_OLD_USER_SUCCESS));
      dispatch({
        type: UPDATE_OLD_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.status, UPDATE_OLD_USER_FAIL));
      dispatch({
        type: UPDATE_OLD_USER_FAIL,
      });
    });
};
