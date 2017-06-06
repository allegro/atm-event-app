import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions/CardActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Speaker from "../../domain/Speaker";
import Avatars from "../Avatars/Avatars";
import ScheduleItemTitle from "./ScheduleItemTitle";

const styles = theme => ({
    stars: {
        display: "flex",
        alignItems: "center",
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
        justifyContent: "flex-end"
    }
});

const ScheduleItemActions = ({ classes, speakers, startsAt, endsAt, score, userVoted = false }) => {
    return (
        <CardActions>
            <Avatars speakers={speakers}/>
            <ScheduleItemTitle speakers={speakers} startsAt={startsAt} endsAt={endsAt}/>
            {score ? <div className={classes.stars}>
                <IconButton aria-label="star">
                    <StarIcon color={userVoted ? "secondary" : "disabled"} />
                </IconButton>
                <Typography>{score.toFixed(1)}</Typography>
            </div> : null}
        </CardActions>
    );
};

ScheduleItemActions.propTypes = {
    classes: PropTypes.object.isRequired,
    userVoted: PropTypes.bool,
    speakers: PropTypes.arrayOf(PropTypes.instanceOf(Speaker)).isRequired,
    startsAt: PropTypes.number.isRequired,
    endsAt: PropTypes.number.isRequired,
    score: PropTypes.number,
};

export default withStyles(styles)(ScheduleItemActions);
