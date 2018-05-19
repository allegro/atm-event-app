import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { compose } from "recompose";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";

import ProfileMenu, { ProfileMenuItem } from "../components/Navbar/ProfileMenu";

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
        const { profile, auth, classes } = this.props;

        const dataLoaded = isLoaded(auth, profile);
        const authExists = isLoaded(auth) && !isEmpty(auth);

        const profileMenu = dataLoaded && authExists
            ?
            <ProfileMenu profile={profile} auth={auth}>
                <ProfileMenuItem onClick={this.handleLogout}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText inset primary="Logout" />
                </ProfileMenuItem>
            </ProfileMenu>
            : <Button color="inherit" component={props => <Link to="/login" {...props} />}>Login</Button>;

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        component={props => <Link to="/" {...props} />}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="title" color="inherit" className={classes.flex}>
                        <Link to="/">
                            atm
                        </Link>
                    </Typography>

                    {!dataLoaded ? <CircularProgress color="secondary" /> : profileMenu}
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(push("/logout"))
});

export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Navbar);