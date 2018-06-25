import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Talk from "../../domain/Talk";
import ScheduleItemActions from "./ScheduleItemActions";

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2
    }
});

const ScheduleItem = ({classes, talk}) => (
    <Card className={classes.root}>
        <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
                {talk.title}
            </Typography>
        </CardContent>
        {talk.speakers ? <ScheduleItemActions startsAt={talk.start} speakers={talk.speakers}/> : null}
    </Card>
);

ScheduleItem.propTypes = {
    classes: PropTypes.object.isRequired,
    talk: PropTypes.instanceOf(Talk)
};

export default withStyles(styles)(ScheduleItem);