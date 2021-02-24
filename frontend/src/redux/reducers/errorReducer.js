/**
 * @file Reducer handling http errors.
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import { SET_ERROR, CLEAR_ERROR } from '../types';

/**
 * The initial state.
 */
const initialState = {
  message: {},
  status: null,
  id: null,
};

/**
 * Reducer handling actions and state changes.
 * @param {Object} state The current state.
 * @param {Object} action The action which has been dispatched.
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERROR:
      return {
        message: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
