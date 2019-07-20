import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        height: "100%",
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.main,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'soft-light'
    }
});

export const BareLayout = ({ children, classes, bgImage }) => (
    <div className={classes.container} style={{ backgroundImage: `url(${bgImage}` }}>
        {children}
    </div>
);

BareLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    classes: PropTypes.object.isRequired,
    bgImage: PropTypes.string
};

export default withStyles(styles)(BareLayout);
