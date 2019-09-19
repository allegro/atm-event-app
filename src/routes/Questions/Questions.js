import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    frame: {
        width: '100vw',
        height: 'calc(100vh - 112px)',
        border: 0
    }
});

const QuestionsPage = ({ classes, settings }) => {
    const { slido } = settings;
    return <iframe title="q&a app" className={classes.frame} src={slido.embedUrl} />;
};

QuestionsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    settings: PropTypes.object
};

export default withStyles(styles)(QuestionsPage);
