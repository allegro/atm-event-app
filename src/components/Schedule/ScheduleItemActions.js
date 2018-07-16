import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Avatar from "@material-ui/core/Avatar/Avatar";
import IdentityIcon from "@material-ui/icons/PermIdentity";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Speaker from "../../domain/Speaker";
import moment from "moment";
import "moment/locale/pl";

const styles = theme => ({
    avatars: {
        minWidth: 80,
        display: "flex",
        justifyContent: "center"
    },
    avatar: {
        "&:nth-child(2)": {
            margin: `0 0 0 -${theme.spacing.unit * 2}px`
        }
    },
    stars: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing.unit,
        width: "100%",
        justifyContent: "flex-end"
    }
});

const ScheduleItemActions = ({classes, speakers, startsAt}) => (
    <CardActions>
        <div className={classes.avatars}>
            {speakers.map(speaker => <Avatar className={classes.avatar} key={speaker.name}>
                {speaker.photo ? <img src={speaker.photo} alt="" /> : <IdentityIcon/>}
            </Avatar>)}
        </div>
        <div>
            <Typography color="secondary">{speakers.map(speaker => speaker.name).join(", ")}</Typography>
            <Typography>{moment(startsAt).fromNow()}</Typography>
        </div>
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