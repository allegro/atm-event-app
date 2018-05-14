import { connectedReduxRedirect } from "redux-auth-wrapper/history4/redirect";
import { replace } from "react-router-redux";

import LoadingSpinner from "../components/LoadingSpinner";

const AUTHED_REDIRECT = "AUTHED_REDIRECT";
const UNAUTHED_REDIRECT = "UNAUTHED_REDIRECT";

export const UserIsAuthenticated = connectedReduxRedirect({
    redirectPath: "/login",
    authenticatedSelector: ({ firebase: { auth } }) => !auth.isEmpty,
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) => !auth.isLoaded || isInitializing,
    AuthenticatingComponent: LoadingSpinner,
    redirectAction: newLoc => dispatch => {
        dispatch(replace(newLoc));
        dispatch({
            type: UNAUTHED_REDIRECT,
            payload: { message: "User is not authenticated." }
        });
    },
    wrapperDisplayName: "UserIsAuthenticated"
});

export const UserIsNotAuthenticated = connectedReduxRedirect({
    allowRedirectBack: false,
    redirectPath: (state, props) => (props.location.query && props.location.query.redirect) || "/",
    authenticatedSelector: ({ firebase: { auth } }) => auth.isEmpty,
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) => !auth.isLoaded || isInitializing,
    AuthenticatingComponent: LoadingSpinner,
    redirectAction: newLoc => dispatch => {
        dispatch(replace(newLoc));
        dispatch({ type: AUTHED_REDIRECT });
    },
    wrapperDisplayName: "UserIsNotAuthenticated"
});


export default {
    UserIsAuthenticated,
    UserIsNotAuthenticated
};