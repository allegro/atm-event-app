import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Talk from "../../domain/Talk";
import PropTypes from "prop-types";

const styles = {
    item: {
        padding: 20,
        minWidth: 'auto'
    }
};

const ScheduleItem = ({classes, talk}) => (
    <div className={classes.item}>{talk.title}</div>
);

ScheduleItem.propTypes = {
    classes: PropTypes.object.isRequired,
    talk: PropTypes.instanceOf(Talk)
};

export default withStyles(styles)(ScheduleItem);