/**
 * @file Actions used for applicants
 * @requires axios
 * @author Erik Hanstad
 */
import axios from 'axios';
import { returnError } from './errorActions';
import { tokenConfig } from './authActions';
import {
  LOADING,
  COMPETENCE_SUCCESS,
  COMPETENCE_FAIL,
  APPLICATION_SUCCESS,
  APPLICATION_FAIL,
} from '../types';

/**
 *
 */
export const getCompetence = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  const config = tokenConfig(getState);
  console.log(config);
  axios
    .post('/api/application/competence', config)
    .then((res) => {
      console.log(res);
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
export const sendApplication = ({ competences, availability, id }) => (dispatch, getState) => {
  dispatch({ type: LOADING });
  const body = JSON.stringify({ competences, availability, id });
  const config = tokenConfig(getState);
  axios
    .post('/api/application/register', body, config)
    .then((res) => {
      dispatch({
        type: APPLICATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data.msg, err.response.status, APPLICATION_FAIL));
      dispatch({
        type: APPLICATION_FAIL,
      });
    });
};
