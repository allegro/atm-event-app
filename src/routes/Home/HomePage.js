import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FeaturedItem from "../../components/Schedule/FeaturedItem";
import ScheduleItem from "../../components/Schedule/ScheduleItem";

const styles = theme => ({
    sectionHeader: {
        color: theme.palette.grey[500],
        fontWeight: 300,
        padding: theme.spacing.unit * 3
    }
});

const HomePage = ({ classes, schedule }) => {
    return <div>
        <FeaturedItem talk={schedule[0]}/>
        <Typography className={classes.sectionHeader} variant="headline">Kolejne wystąpienia</Typography>

        {schedule.slice(1).map(talk => <ScheduleItem key={talk.title} startsAt={talk.start} talk={talk} />)}
    </div>;
};

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    schedule: PropTypes.array,
    speakers: PropTypes.object
};

export default compose(
    withStyles(styles)
)(HomePage);
