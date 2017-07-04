// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {AppBar, Avatar, Drawer, IconButton, MenuItem} from "material-ui";
import ContentLink from 'material-ui/svg-icons/content/link';
import SocialPerson from 'material-ui/svg-icons/social/person';

export default class ApplicationBar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {open: false, profile: {}};
    }

    componentWillMount() {
        if (this.props.auth.isAuthenticated()) {
            const {userProfile, getProfile} = this.props.auth;
            if (!userProfile) {
                getProfile((err, profile) => this.setState({profile}));
            } else {
                this.setState({profile: userProfile});
            }
        }
    }

    handleOpen = () => this.setState({open: true});
    handleClose = () => this.setState({open: false});

    goTo = (route: string) => {
        this.props.history.push(`/atm/${route}`);
        this.handleClose();
    };

    render() {
        if (this.props.auth.isAuthenticated()) {
            return (
                <UserAppBar title={"ATM2017"} onLeftIconButtonTouchTap={this.handleOpen} profile={this.state.profile}>
                    <ApplicationDrawer auth={this.props.auth} open={this.state.open}
                                       onChange={(state) => this.setState({open: state})}
                                       goTo={this.goTo}/>
                </UserAppBar>
            )
        } else {
            return (
                <AnonymousAppBar login={this.props.auth.login} title={"ATM2017"}/>
            )
        }
    }
}

class AnonymousAppBar extends Component {
    render() {
        return (
            <AppBar title={this.props.title} iconElementRight={<IconButton><SocialPerson/></IconButton>}
                    showMenuIconButton={false} style={{position: 'sticky', top: 0}}
                    onRightIconButtonTouchTap={() => this.props.login()}>
                {this.props.children}
            </AppBar>
        )
    }
}


class UserAppBar extends Component {
    render() {
        return (
            <AppBar title={this.props.title} onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
                    style={{position: 'sticky', top: 0}}
                    iconElementRight={<Avatar size={36} style={{margin: '7px 0px 0px 0px'}} src={this.props.profile.picture}/>}>
                {this.props.children}
            </AppBar>
        )
    }
}


class ApplicationDrawer extends Component {

    render() {
        const {isAuthenticated, userHasScopes} = this.props.auth;
        return (
            <Drawer docked={false} width={300} open={this.props.open} onRequestChange={(open) => this.props.onChange(open)}>
                {!isAuthenticated() && (
                    <MenuItem primaryText="Login" leftIcon={<ContentLink/>} onTouchTap={() => this.props.auth.login()}/>)}
                <MenuItem primaryText="Home" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('')}/>
                <MenuItem primaryText="Schedule" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('schedule')}/>
                {isAuthenticated() && (
                    <MenuItem primaryText="Profil" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('profile')}/>)}
                {isAuthenticated() && userHasScopes(['atmadmin']) && (
                    <MenuItem primaryText="Admin" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('admin')}/>)}
                {isAuthenticated() && (
                    <MenuItem primaryText="Speakers" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('speakers')}/>)}
                {isAuthenticated() && (
                    <MenuItem primaryText="Logout" leftIcon={<ContentLink/>} onTouchTap={() => this.props.auth.logout()}/>)}
            </Drawer>
        )
    }
}