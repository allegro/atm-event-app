import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Speaker from "../../domain/Speaker";
import { toTimeLocal } from "../../utils/date";

const styles = theme => ({
    fullWidth: {
        width: "100%",
    },
});

const ScheduleItemTitle = ({ classes, speakers, startsAt, endsAt }) => {
    const names = speakers.map(speaker => speaker.name).join(", ");
    const startTime = toTimeLocal(startsAt);
    const endTime = toTimeLocal(endsAt);

    return <div className={classes.fullWidth}>
        <Typography color="secondary">{names}</Typography>
        <Typography>{startTime} - {endTime}</Typography>
    </div>;
};

ScheduleItemTitle.propTypes = {
    classes: PropTypes.object.isRequired,
    speakers: PropTypes.arrayOf(PropTypes.instanceOf(Speaker)).isRequired,
    startsAt: PropTypes.number.isRequired,
    endsAt: PropTypes.number.isRequired
};

export default withStyles(styles)(ScheduleItemTitle);


