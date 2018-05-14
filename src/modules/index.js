import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { firebaseStateReducer } from "react-redux-firebase";
import { notificationsReducer } from "./notification";
import { reducer as formReducer } from "redux-form";

import { someReducer } from "./some";

export default combineReducers({
    firebase: firebaseStateReducer,
    notifications: notificationsReducer,
    router: routerReducer,
    form: formReducer,
    some: someReducer
});