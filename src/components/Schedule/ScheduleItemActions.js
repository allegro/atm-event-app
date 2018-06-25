import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Avatar from "@material-ui/core/Avatar/Avatar";
import IdentityIcon from "@material-ui/icons/PermIdentity";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarIcon from "@material-ui/icons/Star";
import CommentIcon from "@material-ui/icons/Comment";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Speaker from "../../domain/Speaker";
import moment from "moment";

const styles = theme => ({
    root: {},
    starButton: {
        marginLeft: "auto"
    }
});

const ScheduleItemActions = ({classes, speakers, startsAt}) => (
    <CardActions>
        {speakers.map(speaker => <Avatar key={speaker.name}><IdentityIcon/></Avatar>)}
        <div>
            <Typography>{speakers.map(speaker => speaker.name).join(', ')}</Typography>
            <Typography>{moment(startsAt).fromNow()}</Typography>
        </div>
        <IconButton aria-label="Star" className={classes.starButton}>
            <StarIcon/>
        </IconButton>
        <IconButton aria-label="Comment">
            <CommentIcon/>
        </IconButton>
    </CardActions>
);

ScheduleItemActions.propTypes = {
    classes: PropTypes.object.isRequired,
    speakers: PropTypes.arrayOf(PropTypes.instanceOf(Speaker)).isRequired,
    startsAt: PropTypes.number.isRequired
};

export default withStyles(styles)(ScheduleItemActions);