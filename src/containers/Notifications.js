import React from "react";
import PropTypes from "prop-types";
import size from "lodash.size";
import { connect } from "react-redux";
import { pure, compose, renderNothing, branch } from "recompose";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { dismissNotification } from "../modules/notification";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    closeIcon: { paddingTop: "5px", height: "30px" }
};

const Notifications = ({ classes, allIds, byId, dismissNotification }) => (
    <div>
        {allIds.map(id => (
            <Snackbar open key={id}
                action={<IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={() => dismissNotification(id)}
                >
                    <CloseIcon />
                </IconButton>}
                message={<span id="message-{id}">{byId[id].message}</span>}
            />
        ))}
    </div>
);

Notifications.propTypes = {
    classes: PropTypes.object,
    allIds: PropTypes.array.isRequired,
    byId: PropTypes.object.isRequired,
    dismissNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { allIds, byId } = state.notifications;
    return { allIds, byId };
};

const mapDispatchToProps = dispatch => ({
    dismissNotification: (id) => dispatch(dismissNotification(id))
});

export default compose(
    pure,
    connect(mapStateToProps, mapDispatchToProps),
    branch(props => !size(props.allIds), renderNothing),
    withStyles(styles)
)(Notifications);
