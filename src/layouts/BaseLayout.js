import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import Navbar from "../containers/Navbar";
import BottomMenu from "../components/BottomMenu/BottomMenu";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserIsAuthenticated } from "../utils/router";
import Speaker from "../domain/Speaker";
import Talk from "../domain/Talk";

const styles = theme => ({
    container: {
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.grey[200]
    },
    topFrame: {
        flexGrow: 0,
        flexShrink: 0,
    },
    contentFrame: {
        margin: "0 auto",
        overflowY: "scroll",
        flexGrow: 1
    },
    bottomFrame: {
        flexGrow: 0,
        flexShrink: 0,
    },
});

function mapToDomain(rawSchedule, rawSpeakers) {
    const speakers = Object.keys(rawSpeakers)
        .reduce((speakers, speakerRef) => {
            return { ...speakers, [speakerRef]: Speaker.fromFirebase(rawSpeakers[speakerRef]) };
        }, {});

    const schedule = Object.values(rawSchedule).map(firebaseTalk => Talk.fromFirebase(firebaseTalk, speakers));

    return { schedule, speakers };
}

class BaseLayout extends Component {
    constructor(props) {
        super(props);
        this.contentFrame = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.contentFrame.current.scrollTo(0, 0);
        }
    }

    render() {
        const { render, schedule, speakers, classes } = this.props;
        const content = isLoaded(schedule) && isLoaded(speakers)
            ? render(mapToDomain(schedule, speakers))
            : <LoadingSpinner/>;

        return (

            <div className={classes.container}>
                <div className={classes.topFrame}><Navbar/></div>
                <div className={classes.contentFrame} ref={this.contentFrame}>{content}</div>
                <div className={classes.bottomFrame}><BottomMenu/></div>
            </div>
        );
    };
}

BaseLayout.propTypes = {
    render: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    schedule: PropTypes.object,
    speakers: PropTypes.object,
    location: PropTypes.string.isRequired
};

export default compose(
    UserIsAuthenticated,
    firestoreConnect(["schedule", "speakers"]),
    connect(state => ({
        schedule: state.firestore.data.schedule,
        speakers: state.firestore.data.speakers
    })),
    withStyles(styles),
    withRouter
)(BaseLayout);