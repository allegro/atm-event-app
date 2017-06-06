import { combineReducers } from "redux";
import without from "lodash.without";
import omit from "lodash.omit";
import { withHandlers } from "recompose";

export const NOTIFICATION_SHOW = "NOTIFICATION_SHOW";
export const NOTIFICATION_DISMISS = "NOTIFICATION_DISMISS";
export const NOTIFICATION_CLEAR = "NOTIFICATION_CLEAR";

const defaultDismissTime = 2500;

/**
 * @description Publish a notification. if `dismissAfter` is set,
 * the notification will be auto dismissed after the given period.
 * @param {Object} notif - Object containing
 * @param {Object} notif.type - Kinda of notification (success, warning, failure)
 * @param {Object} notif.message - Notification message
 * @param {Object} notif.dismissAfter - Time after which to dismiss notification (default time set in constants)
 */
export const showNotification = notif => {
    const payload = Object.assign({}, notif);
    // Set default id to now if none provided
    if (!payload.id) {
        payload.id = Date.now();
    }
    return dispatch => {
        dispatch({ type: NOTIFICATION_SHOW, payload });

        setTimeout(() => {
            dispatch({
                type: NOTIFICATION_DISMISS,
                payload: payload.id
            });
        }, payload.dismissAfter || defaultDismissTime);
    };
};

export const showSuccess = message =>
    showNotification({ type: "success", message });

export const showError = message =>
    showNotification({ type: "failure", message });

/**
 * @description Dismiss a notification by the given id.
 * @param {Number} id - notification id
 */
export const dismissNotification = payload => ({
    type: NOTIFICATION_DISMISS,
    payload
});

/**
 * @description Clear all notifications
 */
export const clearNotifications = () => ({ type: NOTIFICATION_CLEAR });

const notification = (state = {}, action) => {
    switch (action.type) {
        case NOTIFICATION_SHOW:
            return action.payload;
        case NOTIFICATION_DISMISS:
            return undefined;
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case NOTIFICATION_SHOW:
            return [...state, action.payload.id];
        case NOTIFICATION_DISMISS:
            return without(state, action.payload);
        default:
            return state;
    }
};

const byId = (state = {}, action) => {
    switch (action.type) {
        case NOTIFICATION_SHOW:
            return {
                ...state,
                [action.payload.id]: notification(state[action.payload.id], action)
            };
        case NOTIFICATION_DISMISS:
            return omit(state, action.payload);
        default:
            return state;
    }
};

export const notificationsReducer = combineReducers({ byId, allIds });

export const withNotifications = withHandlers({
    showError: ({ dispatch }) => err => showError(err)(dispatch),
    showSuccess: ({ dispatch }) => msg => showSuccess(msg)(dispatch),
    dismissNotification: ({ dispatch }) => id => dismissNotification(id)(dispatch)
});
