import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
        display: "flex"
    }
};

const LoadingSpinner = ({ size, classes }) => (
    <div className={classes.container}>
        <CircularProgress mode="indeterminate" size={size || 80} />
    </div>
);

LoadingSpinner.propTypes = {
    size: PropTypes.number,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingSpinner);