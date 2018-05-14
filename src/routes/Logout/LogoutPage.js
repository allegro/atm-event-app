import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withFirebase } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    messageText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh"
    }
});

const LogoutPage = ({ firebase, classes }) => {
    firebase.logout();

    return <Typography variant="headline" className={classes.messageText}>
        Logged out!
    </Typography>;
};

LogoutPage.propTypes = {
    firebase: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default compose(
    withFirebase,
    withStyles(styles)
)(LogoutPage);