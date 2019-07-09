import React from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import { withFirebase } from "react-redux-firebase";
import { withHandlers, pure, compose } from "recompose";

import { UserIsNotAuthenticated } from "../../utils/router";

import { withNotifications } from "../../modules/notification";
import LoginForm from "./LoginForm";

import AtmLogo from "../../Components/AtmLogo";
import BareLayout from "../../layouts/BareLayout";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        maxWidth: "400px",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        padding: theme.spacing.unit * 2
    },
    panel: {
        width: "100%",
        ...theme.mixins.gutters({
            paddingTop: 16,
            paddingBottom: 16,
            marginTop: theme.spacing.unit * 5
        })
    }
});

export const LoginPage = ({ emailLogin, onSubmitFail, classes }) => (
    <BareLayout>
        <div className={classes.container}>
            <AtmLogo width={200} height="auto" />

            <Paper className={classes.panel}>
                <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
            </Paper>
        </div>
    </BareLayout>
);

LoginPage.propTypes = {
    classes: PropTypes.object,
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    emailLogin: PropTypes.func,
    onSubmitFail: PropTypes.func
};

export default compose(
    UserIsNotAuthenticated,
    withNotifications,
    withFirebase,
    withHandlers({
        onSubmitFail: props => (formErrs, dispatch, err) =>
            props.showError(formErrs ? "Form Invalid" : err.message || "Error"),

        emailLogin: ({ firebase, showError, showSuccess }) => creds =>
            firebase.login(creds).then(() => showSuccess("Zalogowano poprawnie")).catch(err => showError(err.message))
    }),
    withStyles(styles),
    pure
)(LoginPage);
