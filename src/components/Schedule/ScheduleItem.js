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
    },
    content: {
        padding: `${theme.spacing.unit * 2}px 0 0 ${theme.spacing.unit * 2}px`
    },
    title: {
        color: theme.palette.grey[700],
        fontSize: "1.3em",
        fontWeight: 300
    }
});

const ScheduleItem = ({classes, talk}) => (
    <Card className={classes.root} square>
        <CardContent className={classes.content}>
            <Typography className={classes.title} gutterBottom variant="subheading" component="h2">
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