import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import firebase from "firebase";
import createHistory from "history/createBrowserHistory";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore } from "redux-firestore";

import { reduxFirebase as reduxFirebaseConfig } from "./config";
import rootReducer from "./modules";
import Saga from "./sagas";

export const history = createHistory();

export function createAppStore(initialState = {}) {

    const sagaMiddleware = createSagaMiddleware();

    const enhancers = [];

    const middleware = [
        ({ dispatch, getState }) => next => action => {
            if (typeof action === "function") {
                return action(dispatch, getState, getFirebase);
            }

            return next(action);
        },
        routerMiddleware(history),
        sagaMiddleware
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const composedEnhancers = composeEnhancers(
        reactReduxFirebase(firebase, reduxFirebaseConfig),
        reduxFirestore(firebase),
        applyMiddleware(...middleware),
        ...enhancers
    );

    const store = createStore(
        rootReducer,
        initialState,
        composedEnhancers
    );

    sagaMiddleware.run(Saga);

    return store;
}