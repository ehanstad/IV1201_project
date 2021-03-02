/**
 * @file Reducer handling user update old user.
 * @author Erik Hanstad
 */
import { UPDATEINFO_SUCCESS, UPDATEINFO_FAIL, LOADING } from '../types';

/**
 * The initial state.
 */
const initialState = {
  updateInfo: null,
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
    case UPDATEINFO_SUCCESS:
      return {
        ...state,
        updateInfo: action.payload,
        loading: false,
      };
    case UPDATEINFO_FAIL:
    default:
      return state;
  }
}
