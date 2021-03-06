import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { DEFAULT_ICON } from "../Avatars/Avatars";

const styles = {
    button: {
        padding: 0,
        minWidth: "auto"
    }
};

export class ProfileMenuItem extends Component {
    render() {
        return <MenuItem {...this.props}>{this.props.children}</MenuItem>;
    }
}

class ProfileMenu extends Component {
    static propTypes = {};

    state = {
        menuAnchorElement: null,
    };

    openMenu = event => this.setState({
        menuAnchorElement: event.currentTarget
    });

    closeMenu = () => this.setState({
        menuAnchorElement: null
    });

    render() {
        const { auth, classes } = this.props;
        const { menuAnchorElement } = this.state;
        const isOpen = Boolean(menuAnchorElement);

        return (
            <div>
                <Button className={classes.button} disableRipple={true} color="inherit" onClick={this.openMenu}>
                    {auth.photoURL
                        ? <Avatar src={auth.photoURL}/>
                        : <Avatar>{DEFAULT_ICON}</Avatar>
                    }
                </Button>
                <Menu
                    anchorEl={menuAnchorElement}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={isOpen}
                    onClose={this.closeMenu}
                    onClick={this.closeMenu}
                >
                    {this.props.children}
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileMenu);
