import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Speaker from "../../domain/Speaker";
import moment from "moment";
import "moment/locale/pl";

const styles = theme => ({
    fullWidth: {
        width: '100%',
    },
});

const ScheduleItemTitle = ({classes, speakers, startsAt}) => {
    const names = speakers.map(speaker => speaker.name).join(", ");
    const time = moment(startsAt).fromNow();
    return <div className={classes.fullWidth}>
        <Typography color="secondary">{names}</Typography>
        <Typography>{time}</Typography>
    </div>
};

ScheduleItemTitle.propTypes = {
    classes: PropTypes.object.isRequired,
    speakers: PropTypes.arrayOf(PropTypes.instanceOf(Speaker)).isRequired,
    startsAt: PropTypes.number.isRequired
};

export default withStyles(styles)(ScheduleItemTitle);


