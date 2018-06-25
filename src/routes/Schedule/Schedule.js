import React from "react";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {UserIsAuthenticated} from "../../utils/router";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Talk from "../../domain/Talk";
import Speaker from "../../domain/Speaker";
import ScheduleItem from "../../components/Schedule/ScheduleItem";
import LoadingSpinner from "../../components/LoadingSpinner";

import BaseLayout from "../../layouts/BaseLayout";

const styles = theme => ({
    sectionHeader: {
        fontWeight: 100,
        padding: theme.spacing.unit * 3
    }
});

function Schedule({schedule}) {
    if (!isLoaded(schedule)) return <BaseLayout><LoadingSpinner/></BaseLayout>;
    return <BaseLayout>
        {schedule.map(talk => <ScheduleItem key={talk.title} startsAt={talk.start}
                                            talk={new Talk(talk.title, talk.content, talk.speakers.map(speaker => new Speaker(speaker.id)), talk.start, talk.end)}/>)}
    </BaseLayout>;
}

Schedule.propTypes = {
    classes: PropTypes.object.isRequired,
    schedule: PropTypes.array
};

export default compose(
    UserIsAuthenticated,
    firestoreConnect(["schedule"]),
    connect((state) => ({schedule: state.firestore.ordered.schedule})),
    withStyles(styles)
)(Schedule);
