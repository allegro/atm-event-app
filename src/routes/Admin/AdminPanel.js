import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import {push} from "react-router-redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";

const styles = theme => ({
    messageText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh"
    }
});

function HomePage(props) {
    const { classes, profile } = props;
    return <Typography variant="headline" className={classes.messageText}>
        Admin Panel

        <div> your role: {JSON.stringify(profile.role)}</div>
    </Typography>;
}

HomePage.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.firebase.profile
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(push("/logout"))
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(HomePage);

