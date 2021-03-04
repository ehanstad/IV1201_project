/**
 * @file Root reducer.
 * @requires redux
 * @author Lucas Villarroel <lucasvi@kth.se>
 */
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import applyReducer from './applyReducer';

/**
 * Combine all reducers, export root reducer.
 */
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  apply: applyReducer,
});
