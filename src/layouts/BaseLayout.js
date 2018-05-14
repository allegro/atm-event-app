import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "../containers/Navbar";
import BottomMenu from "../components/BottomMenu/BottomMenu";

const styles = theme => ({
    container: {
        height: "100%",
        minHeight: "100vh",
        overflowY: "hidden",
        backgroundColor: theme.palette.grey[200]
    },
    contentFrame: {
        height: "calc(100% - 48px)",
        maxWidth: "1200px",
        padding: "1.5em 1em 1em",
        margin: "0 auto",
        overflowY: "scroll"
    }
});

export const BaseLayout = ({ children, classes }) => (
    <div className={classes.container}>
        <Navbar />
        <div className={classes.contentFrame}>{children}</div>
        <BottomMenu/>
    </div>
);

BaseLayout.propTypes = {
    children: PropTypes.element.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BaseLayout);