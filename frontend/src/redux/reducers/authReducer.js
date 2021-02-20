/**
 * @file Reducer handling user authentication.
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, LOADING } from '../types';

/**
 * The initial state.
 */
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: false,
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
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
