import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import ScheduleItem from "../../components/Schedule/ScheduleItem";

const styles = theme => ({
    sectionHeader: {
        fontWeight: 100,
        padding: theme.spacing.unit * 3
    }
});

function Schedule({ schedule }) {
    return <div>
        {schedule.map(talk => <ScheduleItem key={talk.title} startsAt={talk.start} talk={talk} />)}
    </div>;
}

Schedule.propTypes = {
    classes: PropTypes.object.isRequired,
    schedule: PropTypes.array,
    speakers: PropTypes.object
};

export default compose(
    withStyles(styles)
)(Schedule);
