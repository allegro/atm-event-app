import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import QRCode from "qrcode";
import { firebaseConnect, isEmpty, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    sectionHeader: {
        color: theme.palette.grey[500],
        fontWeight: 300,
        padding: theme.spacing(3)
    },
    ticketContainer: {
        paddingTop: '1em'
    }
});

class TicketImage extends Component {
    state = {
        ticketImageData: null
    };

    componentDidMount() {
        QRCode.toDataURL(this.props.text, { width: 600, errorCorrectionLevel: 'H', scale: 8, color: { dark: '#fff', light: '#A7168F' } }, (err, url) => {
            if (!err) this.setState({ ticketImageData: url });
        })
    }

    render() {
        const { ticketImageData } = this.state;
        return ticketImageData ? <img src={ticketImageData} width="100%" alt="" /> : <div>loading...</div>;
    }
}

const TicketPage = ({ classes, profile, auth }) => {
    const dataLoaded = isLoaded(auth, profile);
    const authExists = isLoaded(auth) && !isEmpty(auth);

    if (dataLoaded && authExists) {
        const { uid, email } = auth;
        const { displayName, type } = profile;
        const ticketText = JSON.stringify({ uid, type, name: displayName });

        return <div className={classes.ticketContainer}>
            <Typography className={classes.sectionHeader} variant="h5">Twój bilet ({email})</Typography>
            <TicketImage text={ticketText} />
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
