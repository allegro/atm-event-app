import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { UserIsAuthenticated } from "../../utils/router";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

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
    const { classes, schedule } = props;

    return <div>
        <Typography variant="headline" className={classes.messageText}>Home Page</Typography>
        {isLoaded(schedule)
            ? schedule.map(day => <div>{day.id} / {day.date.toDate().toString()}</div>)
            : null
        }
    </div>;
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    UserIsAuthenticated,
    firestoreConnect(["schedule"]),
    connect((state, props) => ({
        schedule: state.firestore.ordered.schedule
    })),
    withStyles(styles)
)(HomePage);
