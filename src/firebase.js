import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { reduxFirestore } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import config from "./config";

firebase.initializeApp(config.firebase);

export const middlewares = [
    ({ dispatch, getState }) => next => action => {
        if (typeof action === "function") {
            return action(dispatch, getState, getFirebase);
        }

        return next(action);
    }
];

export const enhancers = [
    reactReduxFirebase(firebase, config.reduxFirebase),
    reduxFirestore(firebase),
];

export default {
    middlewares,
    enhancers
};
