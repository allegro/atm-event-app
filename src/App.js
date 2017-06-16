// @flow
import React, {Component} from 'react';
import './App.css';
import {AppBar, Drawer, MenuItem} from "material-ui";
import ContentLink from 'material-ui/svg-icons/content/link';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    goTo = (route: string) => {
        this.props.history.replace(`/${route}`);
        this.handleClose();
    };

    handleOpen = () => this.setState({open: true});
    handleClose = () => this.setState({open: false});

    render() {
        const {isAuthenticated, userHasScopes} = this.props.auth;

        return (
            <div id="app">
                <AppBar title="ATM2017" onLeftIconButtonTouchTap={this.handleOpen}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <Drawer docked={false} width={300} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    {!isAuthenticated() && (
                        <MenuItem primaryText="Login" leftIcon={<ContentLink/>} onTouchTap={() => this.props.auth.login()}/>)}
                    <MenuItem primaryText="Home" leftIcon={<ContentLink/>} onTouchTap={() => this.goTo('home')}/>
                    {isAuthenticated() && (
                        <MenuItem primaryText="Profil" leftIcon={<ContentLink/>} onTouchTap={() => this.goTo('profile')}/>)}
                    {isAuthenticated() && userHasScopes(['atmadmin']) && (
                        <MenuItem primaryText="Admin" leftIcon={<ContentLink/>} onTouchTap={() => this.goTo('admin')}/>)}
                    {isAuthenticated() && (
                        <MenuItem primaryText="Speakers" leftIcon={<ContentLink/>} onTouchTap={() => this.goTo('speakers')}/>)}
                    {isAuthenticated() && (
                        <MenuItem primaryText="Logout" leftIcon={<ContentLink/>} onTouchTap={() => this.props.auth.logout()}/>)}
                </Drawer>
            </div>
        );
    }
}