import { combineReducers } from "redux";
import appReducer from "containers/App/App.reducers.js";

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
  return combineReducers({
    app: appReducer,
  });
}
