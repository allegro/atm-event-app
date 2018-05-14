import React from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import { withFirebase } from "react-redux-firebase";
import { withHandlers, pure, compose } from "recompose";

import Typography from "@material-ui/core/Typography";
import { UserIsNotAuthenticated } from "../../utils/router";

import { withNotifications } from "../../modules/notification";
import LoginForm from "./LoginForm";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0 auto",
        marginTop: theme.spacing.unit * 2
    },
    or: {
        textAlign: "center",
        margin: theme.spacing.unit
    },
    providers: {
        display: "flex",
        justifyContent: "center"
    },
    panel: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    })
});

export const LoginPage = ({ emailLogin, googleLogin, onSubmitFail, classes }) => (
    <div className={classes.container}>
        <Paper className={classes.panel}>
            <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
        </Paper>
    </div>
);

LoginPage.propTypes = {
    classes: PropTypes.object,
    firebase: PropTypes.shape({ // eslint-disable-line
        login: PropTypes.func.isRequired
    }),
    emailLogin: PropTypes.func,
    onSubmitFail: PropTypes.func,
    googleLogin: PropTypes.func
};

export default compose(
    UserIsNotAuthenticated,
    withNotifications,
    withFirebase,
    withHandlers({
        onSubmitFail: props => (formErrs, dispatch, err) =>
            props.showError(formErrs ? "Form Invalid" : err.message || "Error"),

        emailLogin: ({ firebase, showError, showSuccess }) => creds =>
            firebase.login(creds).then(() => showSuccess('Zalogowano poprawnie')).catch(err => showError(err.message))
    }),
    withStyles(styles),
    pure
)(LoginPage);