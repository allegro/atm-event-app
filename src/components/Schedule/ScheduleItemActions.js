import React from "react";
import {withStyles} from "@material-ui/core/styles";
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
        padding: theme.spacing.unit,
        justifyContent: "flex-end"
    }
});

const ScheduleItemActions = ({classes, speakers, startsAt}) => (
    <CardActions>
        <Avatars speakers={speakers}/>
        <ScheduleItemTitle speakers={speakers} startsAt={startsAt}/>
        <div className={classes.stars}>
            <IconButton aria-label="star">
                <StarIcon/>
            </IconButton>
            <Typography>4,5</Typography>
        </div>
    </CardActions>
);

ScheduleItemActions.propTypes = {
    classes: PropTypes.object.isRequired,
    speakers: PropTypes.arrayOf(PropTypes.instanceOf(Speaker)).isRequired,
    startsAt: PropTypes.number.isRequired
};

export default withStyles(styles)(ScheduleItemActions);