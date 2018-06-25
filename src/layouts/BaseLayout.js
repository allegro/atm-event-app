import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "../containers/Navbar";
import BottomMenu from "../components/BottomMenu/BottomMenu";

const styles = theme => ({
    container: {
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.grey[200]
    },
    topFrame: {
        flexGrow: 0,
        flexShrink: 0,
    },
    contentFrame: {
        margin: "0 auto",
        overflowY: "scroll",
        flexGrow: 1
    },
    bottomFrame: {
        flexGrow: 0,
        flexShrink: 0,
    },
});

export const BaseLayout = ({ children, classes }) => (
    <div className={classes.container}>
        <div className={classes.topFrame}><Navbar /></div>
        <div className={classes.contentFrame}>{children}</div>
        <div className={classes.bottomFrame}><BottomMenu/></div>
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