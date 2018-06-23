import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import createHistory from "history/createBrowserHistory";

import rootReducer from "./modules";
import Saga from "./sagas";

import reduxFirebase from "./firebase";

export const history = createHistory();

export function createAppStore(initialState = {}) {

    const sagaMiddleware = createSagaMiddleware();

    const enhancers = [];

    const middleware = [
        ...reduxFirebase.middlewares,
        routerMiddleware(history),
        sagaMiddleware
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const composedEnhancers = composeEnhancers(
        ...reduxFirebase.enhancers,
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