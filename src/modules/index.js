import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { firebaseStateReducer } from "react-redux-firebase";

import { someReducer } from "./some";

export default combineReducers({
    firebase: firebaseStateReducer,
    router: routerReducer,
    some: someReducer
});