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
import AtmLogo from "../components/AtmLogo";

const styles = theme => ({
    appBar: {
        position: "relative"
    },
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
        const {profile, auth, classes} = this.props;

        const dataLoaded = isLoaded(auth, profile);
        const authExists = isLoaded(auth) && !isEmpty(auth);

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        <Link to="/">
                            <AtmLogo />
                        </Link>
                    </Typography>
                    {
                        !dataLoaded
                            ? <CircularProgress color="secondary"/>
                            : dataLoaded && authExists
                                ? this.renderProfileMenu(profile, auth)
                                : Navbar.getLoginButton()
                    }
                </Toolbar>
            </AppBar>
        );
    }

    static getLoginButton() {
        return <Button color="inherit" component={props => <Link to="/login" {...props} />}>Login</Button>;
    }

    renderProfileMenu(profile, auth) {
        return <ProfileMenu profile={profile} auth={auth}>
            <ProfileMenuItem onClick={this.handleLogout}>
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText inset primary="Logout"/>
            </ProfileMenuItem>
        </ProfileMenu>;
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
