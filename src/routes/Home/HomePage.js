import React from "react";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {UserIsAuthenticated} from "../../utils/router";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import FeaturedItem from "../../components/Schedule/FeaturedItem";
import Talk from "../../domain/Talk";
import Speaker from "../../domain/Speaker";
import ScheduleItem from "../../components/Schedule/ScheduleItem";
import LoadingSpinner from "../../components/LoadingSpinner";

import BaseLayout from "../../layouts/BaseLayout";

const styles = theme => ({
    sectionHeader: {
        color: theme.palette.grey[500],
        fontWeight: 300,
        padding: theme.spacing.unit * 3
    }
});

function getFeaturedTalk(schedule) {
    //TODO: make real logic :)
    const entry = schedule[0];
    const speakers = entry.speakers.map(speaker => new Speaker(speaker.id));
    return new Talk(entry.title, entry.content, speakers, entry.start, entry.end);
}

const HomePage = ({classes, schedule}) => {
    if (!isLoaded(schedule)) return <BaseLayout><LoadingSpinner/></BaseLayout>;
    return <BaseLayout>
        <FeaturedItem talk={getFeaturedTalk(schedule)}/>
        <Typography className={classes.sectionHeader} variant="headline">Kolejne wystąpienia</Typography>
        {schedule.map(talk => <ScheduleItem key={talk.title} startsAt={talk.start}
                                            talk={new Talk(talk.title, talk.content, talk.speakers.map(speaker => new Speaker(speaker.id)), talk.start, talk.end)}/>)}
    </BaseLayout>;
};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    schedule: PropTypes.array
};

export default compose(
    UserIsAuthenticated,
    firestoreConnect(["schedule"]),
    connect((state) => ({
        schedule: state.firestore.ordered.schedule
    })),
    withStyles(styles)
)(HomePage);
