import { combineReducers } from "redux";

import userReducer from "./user_reducer";
import headTitleReducer from "./headTitle_reducer";

export default combineReducers({
  userReducer,
  headTitleReducer
})