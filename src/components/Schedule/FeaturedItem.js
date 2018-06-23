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
        overflow: "initial"
    },
    card: {
        backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/atm-voting.appspot.com/o/google-now-wallpaper-photo-For-Widescreen-Wallpaper.jpg?alt=media&token=5482cb8e-7aab-42b1-a7d7-ec387880c252)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200px",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        padding: theme.spacing.unit * 4
    },
    heading: {
        color: theme.palette.grey[200],
        textShadow: "1px 1px #000"
    },
    paragraph: {
        color: theme.palette.grey[200],
        textShadow: "1px 1px #000"
    },
    speaker: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    }
});

//TODO: should we keep full date in db?
const FeaturedItem = ({classes, talk}) => (
    <Card className={classes.root}>
        <CardContent className={classes.card}>
            <Typography className={classes.heading} gutterBottom variant="headline" component="h2">
                {talk.title}
            </Typography>
            <Typography component="p" className={classes.paragraph}>
                {talk.description}
            </Typography>
        </CardContent>
        {talk.speakers ? <div className={classes.speaker}><ScheduleItemActions startsAt={talk.start} speakers={talk.speakers}/></div> : null}
    </Card>
);

FeaturedItem.propTypes = {
    classes: PropTypes.object.isRequired,
    talk: PropTypes.instanceOf(Talk)
};

export default withStyles(styles)(FeaturedItem);