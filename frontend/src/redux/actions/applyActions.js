/**
 * @file Actions used for applicants
 * @requires axios
 * @author Erik Hanstad
 */
import axios from 'axios';
import { returnError } from './errorActions';
import { tokenConfig } from './authActions';
import { LOADING, COMPETENCE_SUCCESS, COMPETENCE_FAIL } from '../types';

/**
 *
 */
export const getCompetence = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  axios
    .post('/api/application/competence', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COMPETENCE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data.msg, err.response.status, COMPETENCE_FAIL));
      dispatch({
        type: COMPETENCE_FAIL,
      });
    });
};

/**
 * Sends a request to verify the user with token.
 * @param {Object} form_params The registration information entered by user.
 */
export const sendApplication = ({ competences, startDate, endDate }) => (dispatch, getState) => {
  dispatch({ type: LOADING });
  const body = JSON.stringify({ competences, startDate, endDate });
  console.log(body);
  console.log(getState);
  /*  axios
    .get('/api/application/register', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COMPETENCE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data.msg, err.response.status, COMPETENCE_FAIL));
      dispatch({
        type: COMPETENCE_FAIL,
      });
    }); */
};
