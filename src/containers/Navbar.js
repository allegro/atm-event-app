import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu, { MenuItem } from "@material-ui/core/Menu";
import { ListItemText, ListItemIcon } from "@material-ui/core/List";

import ArrowDropDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IdentityIcon from "@material-ui/icons/PermIdentity";
import MenuIcon from "@material-ui/icons/Menu";

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

    state = {
        menuAnchorElement: null,
    };

    handleMenu = event => {
        this.setState({ menuAnchorElement: event.currentTarget });
    };

    handleCloseMenu = () => {
        this.setState({ menuAnchorElement: null });
    };

    handleLogout = () => {
        this.handleCloseMenu();
        this.props.logout();
    };

    render() {
        const { profile, auth, classes } = this.props;
        const { menuAnchorElement } = this.state;
        const open = Boolean(menuAnchorElement);

        const dataLoaded = isLoaded(auth, profile);
        const authExists = isLoaded(auth) && !isEmpty(auth);

        const profileMenu = dataLoaded && authExists ? (
            <div>
                <Button disableRipple={true} color="inherit" onClick={this.handleMenu}>
                    {profile.avatarUrl
                        ? <Avatar src={profile.avatarUrl} className={classes.userPhoto} />
                        : <Avatar className={classes.userPhoto}><IdentityIcon /></Avatar>
                    }
                    {profile && profile.displayName ? profile.displayName : auth.email}
                    <ArrowDropDownIcon />
                </Button>
                <Menu
                    anchorEl={menuAnchorElement}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={open}
                    onClose={this.handleCloseMenu}
                >
                    <MenuItem onClick={this.handleLogout}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText inset primary="Logout" />
                    </MenuItem>
                </Menu>
            </div>
        ) : <Button color="inherit" component={props => <Link to="/login" {...props} />}>Login</Button>;

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
                        atm
                    </Typography>

                    {profileMenu}
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