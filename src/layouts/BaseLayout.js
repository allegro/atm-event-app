import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firestoreConnect, isLoaded, withFirestore } from "react-redux-firebase";

import Navbar from "../containers/Navbar";
import BottomMenu from "../components/BottomMenu/BottomMenu";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserIsAuthenticated } from "../utils/router";
import Speaker from "../domain/Speaker";
import Talk from "../domain/Talk";

const styles = theme => ({
    container: {
        backgroundColor: theme.palette.grey[200]
    },
    topFrame: {
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0
    },
    contentFrame: {
        margin: "0 auto",
        overflowY: "scroll",
        flexGrow: 1,
        marginTop: "56px",
        marginBottom: "56px"
    },
    bottomFrame: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0
    },
});

function mapToDomain(rawSchedule, rawSpeakers, rawSettings, rawVotes) {
    const speakers = Object.keys(rawSpeakers)
        .reduce((speakers, speakerRef) => {
            return { ...speakers, [speakerRef]: Speaker.fromFirebase(rawSpeakers[speakerRef]) };
        }, {});

    const schedule = Object.keys(rawSchedule)
        .map(id => Talk.fromFirebase(Object.assign({ id }, rawSchedule[id]), speakers))
        .sort((talkA, talkB) => talkA.start - talkB.start);

    return { schedule, speakers, settings: rawSettings, votes: rawVotes };
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
        const { render, schedule, speakers, settings, votes, classes } = this.props;
        const content = isLoaded(schedule) && isLoaded(speakers) && isLoaded(settings) && isLoaded(votes)
            ? render(mapToDomain(schedule, speakers, settings, votes))
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
    settings: PropTypes.object,
    votes: PropTypes.object,
    location: PropTypes.object.isRequired
};

export default compose(
    UserIsAuthenticated,
    withFirestore,
    firestoreConnect(props => ([
        "schedule",
        "speakers",
        "settings",
        `users/${props.firebase.auth().currentUser.uid}/votes`
    ])),
    connect((state, props) => {
        const { schedule, speakers, settings, users } = state.firestore.data;
        const currentUid = props.firebase.auth().currentUser.uid;

        return {
            schedule,
            speakers,
            settings,
            votes: users && users[currentUid] && users[currentUid].votes
        };
    }),
    withStyles(styles),
    withRouter
)(BaseLayout);
