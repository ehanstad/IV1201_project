import axios from 'axios';
import { LOGIN_SUCCES, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const login = ({ uname, pass }) => (dispatch) => {
  const body = JSON.stringify({ uname, pass });
  axios
    .post('/api/user/login', body, config)
    .then((res) => {
      console.log('login success');
      dispatch({
        type: LOGIN_SUCCES,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const register = ({ fname, lname, ssn, email, uname, pass }) => (dispatch) => {
  const body = JSON.stringify({ fname, lname, ssn, email, uname, pass });
  axios
    .post('/api/user/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
