import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { required, validateEmail } from "../../utils/form";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column"
    },
    field: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    submit: {
        marginTop: theme.spacing(3)
    }
});

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error ? error : null}
        {...input}
        {...custom}
    />
);

export const LoginForm = ({ pristine, submitting, handleSubmit, classes }) => (
    <form className={classes.container} onSubmit={handleSubmit}>
        <Field
            name="email"
            component={renderTextField}
            label="E-mail"
            validate={[required, validateEmail]}
            className={classes.field}
        />
        <Field
            name="password"
            component={renderTextField}
            label="Hasło"
            type="password"
            validate={required}
            className={classes.field}
        />
        <div className={classes.submit}>
            <Button
                variant="raised"
                color="primary"
                type="submit"
                disabled={pristine || submitting}
            >
                {submitting ? "Logowanie..." : "Zaloguj"}
            </Button>
        </div>
    </form>
);

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default compose(
    reduxForm({ form: "login" }),
    withStyles(styles)
)(LoginForm);
