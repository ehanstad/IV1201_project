import axios from 'axios';
import { returnError } from './errorActions';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOADING } from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

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
      console.log(err);
      dispatch(returnError(err.response.data.msg, err.response.status, LOGIN_FAIL));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

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
      console.log(err);
      dispatch(returnError(err.response.data.msg, err.response.status, REGISTER_FAIL));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
