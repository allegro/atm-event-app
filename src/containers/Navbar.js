import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {Link} from "react-router-dom";
import {push} from "react-router-redux";
import {withStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {compose} from "recompose";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import ProfileMenu, {ProfileMenuItem} from "../components/Navbar/ProfileMenu";

const styles = theme => ({
    flex: {
        flex: 1
    },
    userPhoto: {
        marginRight: theme.spacing.unit
    }
});

class Navbar extends Component {
    static propTypes = {
        profile: PropTypes.object,
        auth: PropTypes.object,
        firebase: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    handleLogout = () => this.props.logout();

    render() {
        const {profile, auth, classes, gotoAdminPanel} = this.props;

        const dataLoaded = isLoaded(auth, profile);
        const authExists = isLoaded(auth) && !isEmpty(auth);

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        <Link to="/">
                            {logo}
                        </Link>
                    </Typography>
                    {!dataLoaded ? <CircularProgress color="secondary"/> : dataLoaded && authExists ?
                        Navbar.getProfileMenu(profile, auth, gotoAdminPanel) : Navbar.getLoginButton()}
                </Toolbar>
            </AppBar>
        );
    }

    static getLoginButton() {
        return <Button color="inherit" component={props => <Link to="/login" {...props} />}>Login</Button>;
    }

    static getProfileMenu(profile, auth, gotoAdminPanel) {
        return <ProfileMenu profile={profile} auth={auth}>
            {profile.role === "admin"
                ? <ProfileMenuItem onClick={gotoAdminPanel}>
                    <ListItemText inset primary="Admin Panel"/>
                </ProfileMenuItem>
                : null}
            <ProfileMenuItem onClick={this.handleLogout}>
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText inset primary="Logout"/>
            </ProfileMenuItem>
        </ProfileMenu>;
    }
}

const logo = <div style={{height: 40, width: 65, padding: 8}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.67447 24">
        <g>
            <path
                d="M9.70079,12.55567a1.76755,1.76755,0,0,0-.30316-.9542,1.8326,1.8326,0,0,0-.69726-.58842,3.28984,3.28984,0,0,0-.93978-.28623,6.99827,6.99827,0,0,0-1.06106-.07956,9.75257,9.75257,0,0,0-1.69764.175,11.79969,11.79969,0,0,0-2.00084.55657L2.031,7.403a18.60021,18.60021,0,0,1,2.89511-.76342,15.05432,15.05432,0,0,1,2.592-.25438,9.54579,9.54579,0,0,1,2.84964.39754,5.60646,5.60646,0,0,1,2.16755,1.22455,5.438,5.438,0,0,1,1.37935,2.11516,8.72316,8.72316,0,0,1,.485,3.06936v9.31949q-1.15247.35035-2.789.69973a16.512,16.512,0,0,1-3.456.34991,12.9751,12.9751,0,0,1-2.89516-.30219A6.26628,6.26628,0,0,1,3.001,22.28866a4.54753,4.54753,0,0,1-1.47029-1.76534,6.13743,6.13743,0,0,1-.53051-2.6877,4.7816,4.7816,0,0,1,.63662-2.57629,4.90127,4.90127,0,0,1,1.637-1.62218,6.77472,6.77472,0,0,1,2.213-.84289,12.23212,12.23212,0,0,1,2.3646-.23859Zm0,3.37155h-1.728a3.19157,3.19157,0,0,0-1.78858.4771,1.51107,1.51107,0,0,0-.7276,1.336,1.64035,1.64035,0,0,0,.27286,1.00183,1.773,1.773,0,0,0,.68209.55666,3.02215,3.02215,0,0,0,.87914.25447,6.42709,6.42709,0,0,0,.864.0636,6.89341,6.89341,0,0,0,.7882-.0636,6.25127,6.25127,0,0,0,.7579-.12728Z"
                fill="#fff"/>
            <path
                d="M22.93306,19.12291a1.28812,1.28812,0,0,1-1.28813-1.28813V9.641H21.651V9.61822H27.0423l.819-4.26542H21.651V.43907l-5.4255.78485v14.946a16.08519,16.08519,0,0,0,.30713,3.44644,4.18449,4.18449,0,0,0,1.143,2.16685,4.71424,4.71424,0,0,0,2.3033,1.12611,17.86464,17.86464,0,0,0,3.75348.32415h.7336q.4607,0,.93833-.01711.4775-.0176.87014-.017h.563l.78269-4.07642Z"
                fill="#fff"/>
            <path
                d="M52.98432,9.63207a5.63958,5.63958,0,0,0-1.76479-2.214,5.87327,5.87327,0,0,0-2.40648-1.01079A14.517,14.517,0,0,0,46.23,6.1666a9.24019,9.24019,0,0,0-2.53484.32085,11.41325,11.41325,0,0,0-1.95729.738,6.80137,6.80137,0,0,0-2.37444-.85032,24.70572,24.70572,0,0,0-3.2117-.20854,19.93031,19.93031,0,0,0-4.18692.369q-1.57248.3692-2.69528.75407V9.641H31.1269v9.48194L28.83207,21.901l-.8996,1.27626h7.599V11.0439a1.44373,1.44373,0,0,1,.47889-.12836,4.801,4.801,0,0,1,.754-.06413,2.16593,2.16593,0,0,1,1.861.738,4.19249,4.19249,0,0,1,.54546,2.43865v9.14916h5.41465V11.0439a1.44373,1.44373,0,0,1,.47889-.12836,4.801,4.801,0,0,1,.754-.06413,2.16593,2.16593,0,0,1,1.861.738,4.19249,4.19249,0,0,1,.54546,2.43865v9.14916h5.44922V13.45051A8.93519,8.93519,0,0,0,52.98432,9.63207Z"
                fill="#fff"/>
        </g>
    </svg>
</div>;

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
});

const mapDispatchToProps = (dispatch) => ({
    gotoAdminPanel: () => dispatch(push("/admin")),
    logout: () => dispatch(push("/logout"))
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Navbar);