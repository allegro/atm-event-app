import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import rootReducer from "./modules";
import reduxFirebase from "./firebase";

export const history = createHistory();

export function createAppStore(initialState = {}) {

    const enhancers = [];

    const middleware = [
        ...reduxFirebase.middlewares,
        routerMiddleware(history)
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const composedEnhancers = composeEnhancers(
        ...reduxFirebase.enhancers,
        applyMiddleware(...middleware),
        ...enhancers
    );

    return createStore(
        rootReducer,
        initialState,
        composedEnhancers
    );
}