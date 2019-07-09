import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar/Avatar";
import IdentityIcon from "@material-ui/icons/PermIdentity";
import Speaker from "../../domain/Speaker";

export const DEFAULT_ICON = <IdentityIcon/>;

const styles = theme => ({
    avatars: {
        minWidth: 85,
        display: "flex",
        justifyContent: "center"
    },
    avatar: {
        "&:nth-child(2)": {
            margin: `0 0 0 -${theme.spacing(2)}px`
        }
    }
});

const Avatars = ({classes, speakers}) => {
    function getAvatar(speaker) {
        if (speaker.photo) {
            return <Avatar className={classes.avatar} key={speaker.name} alt={speaker.name} src={speaker.photo}/>;
        }
        return <Avatar className={classes.avatar} key={speaker.name}>{DEFAULT_ICON}</Avatar>;
    }

    return <div className={classes.avatars}>{speakers.map(getAvatar)}</div>;
};

Avatars.propTypes = {
    classes: PropTypes.object.isRequired,
    speakers: PropTypes.arrayOf(PropTypes.instanceOf(Speaker)).isRequired
};

export default withStyles(styles)(Avatars);
