import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    messageText: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh"
    }
});

function PageNotFound(props) {
    const { classes } = props;
    return <Typography variant="caption" className={classes.messageText}>404</Typography>;
}

PageNotFound.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageNotFound);
