import React from "react";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import FlashIcon from "@material-ui/icons/FlashOn";
import Chip from "@material-ui/core/Chip";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    avatar: { width: 24, height: 24 },
    icon: { width: 12, height: 12 },
    label: { fontSize: 12 },
    lightningChip: {
        height: 24,
        marginRight: theme.spacing.unit
    }
});

const LightningTalkChip = ({ classes }) => {
    return <Chip
        avatar={<Avatar className={classes.avatar}><FlashIcon className={classes.icon}/></Avatar>}
        label={<span className={classes.label}>Lightning Talk</span>}
        className={classes.lightningChip}
    />;
};

LightningTalkChip.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightningTalkChip);
