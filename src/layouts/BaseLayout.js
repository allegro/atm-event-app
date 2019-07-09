import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firestoreConnect, isLoaded, withFirestore } from "react-redux-firebase";

import Navbar from "../containers/Navbar";
import BottomMenu from "../Components/BottomMenu/BottomMenu";
import LoadingSpinner from "../Components/LoadingSpinner";
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
        flexGrow: 1,
        marginBottom: "56px"
    },
    bottomFrame: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0
    },
});

function mapToDomain(rawSchedule, rawSpeakers, rawPages, rawVotes) {
    const speakers = Object.keys(rawSpeakers)
        .reduce((speakers, speakerRef) => {
            return { ...speakers, [speakerRef]: Speaker.fromFirebase(rawSpeakers[speakerRef]) };
        }, {});

    const schedule = Object.keys(rawSchedule)
        .map(id => Talk.fromFirebase(Object.assign({ id }, rawSchedule[id]), speakers))
        .sort((talkA, talkB) => talkA.start - talkB.start);

    return { schedule, speakers, pages: rawPages, votes: rawVotes };
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
        const { render, schedule, speakers, pages, votes, classes } = this.props;
        const content = isLoaded(schedule) && isLoaded(speakers) && isLoaded(pages) && isLoaded(votes)
            ? render(mapToDomain(schedule, speakers, pages, votes))
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
    pages: PropTypes.object,
    votes: PropTypes.object,
    location: PropTypes.object.isRequired
};

export default compose(
    UserIsAuthenticated,
    withFirestore,
    firestoreConnect(props => ([
        "schedule",
        "speakers",
        "pages",
        `users/${props.firebase.auth().currentUser.uid}/votes`
    ])),
    connect((state, props) => {
        const { schedule, speakers, pages, users } = state.firestore.data;
        const currentUid = props.firebase.auth().currentUser.uid;

        return {
            schedule,
            speakers,
            pages,
            votes: users && users[currentUid] && users[currentUid].votes
        };
    }),
    withStyles(styles),
    withRouter
)(BaseLayout);
