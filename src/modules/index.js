import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { firestoreReducer } from "redux-firestore";
import { reducer as formReducer } from "redux-form";
import { firebaseReducer } from "react-redux-firebase";

import { notificationsReducer } from "./notification";

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notifications: notificationsReducer,
    router: routerReducer,
    form: formReducer
});