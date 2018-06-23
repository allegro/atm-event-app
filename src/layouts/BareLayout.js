import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        height: "100%",
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.main
    }
});

export const BaseLayout = ({ children, classes }) => (
    <div className={classes.container}>
        {children}
    </div>
);

BaseLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BaseLayout);