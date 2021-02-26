/**
 * @file Reducer handling user authentication.
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  UPDATEINFO_SUCCESS,
  UPDATEINFO_FAIL,
  LOADING,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from '../types';

/**
 * The initial state.
 */
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: false,
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
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        loading: false,
      };
    case AUTH_FAIL:
    case REGISTER_SUCCESS:
    case UPDATEINFO_SUCCESS:
      return {
        ...state,
        updateInfo: action.payload,
        loading: false,
      };
    case UPDATEINFO_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: null,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}
