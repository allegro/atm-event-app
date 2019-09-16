import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import QRCode from "qrcode";
import { firebaseConnect, isEmpty, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";

const styles = theme => ({
    ticketContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});

class TicketImage extends Component {
    state = {
        ticketImageData: null
    };

    componentDidMount() {
        QRCode.toDataURL(this.props.text, { width: 600 }, (err, url) => {
            if (!err) this.setState({ ticketImageData: url });
        })
    }

    render() {
        const { ticketImageData } = this.state;
        return ticketImageData ? <img alt="ticket" src={ticketImageData} width="100%"/> : <div>loading...</div>;
    }
};

const TicketPage = ({ classes, profile, auth }) => {
    const dataLoaded = isLoaded(auth, profile);
    const authExists = isLoaded(auth) && !isEmpty(auth);

    if (dataLoaded && authExists) {
        const { uid, email } = auth;
        const ticketText = JSON.stringify({ uid, email });

        return <div className={classes.ticketContainer}>
            <TicketImage text={ticketText}/>
        </div>;
    }

    return null;
};

TicketPage.propTypes = {
    classes: PropTypes.object.isRequired,
    pages: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
    withStyles(styles)
)(TicketPage);
