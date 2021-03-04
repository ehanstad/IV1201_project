/**
 * @file Reducer handling applicents competence.
 * @author Erik Hanstad
 */
import { LOADING, COMPETENCE_SUCCESS, COMPETENCE_FAIL } from '../types';

/**
 * The initial state.
 */
const initialState = {
  competence: null,
};

/**
 * Reducer handling actions and state changes.
 * @param {Object} state The current state.
 * @param {Object} action The action which has been dispatched.
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case COMPETENCE_SUCCESS:
      return {
        ...state,
        competence: action.payload,
      };
    case COMPETENCE_FAIL:
    default:
      return state;
  }
}
