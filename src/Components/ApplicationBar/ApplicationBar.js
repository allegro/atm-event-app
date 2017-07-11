// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {PropTypes} from 'prop-types';
import {Drawer, MenuItem} from "material-ui";
import ContentLink from 'material-ui/svg-icons/content/link';
import AnonymousBar from "./AnonymousBar";
import AuthenticatedBar from "./AuthenticatedBar";

class ApplicationBarComponent extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            profile: {},
            isLoggedIn: props.auth.isAuthenticated()
        };
    }

    componentWillMount() {
        this.props.auth.onAuthStateChanged(firebaseUser => {
            this.setState({
                isLoggedIn: (null !== firebaseUser),
                profile: firebaseUser
            });
        });
    }

    handleOpen = () => this.setState({open: true});
    handleClose = () => this.setState({open: false});

    goTo = (route: string) => {
        this.props.history.push(`/atm/${route}`);
        this.handleClose();
    };

    render() {
        if (this.state.isLoggedIn) {
            return (
                <AuthenticatedBar title={"ATM2017"} onLeftIconButtonTouchTap={this.handleOpen} profile={this.state.profile} goTo={this.goTo}>
                    <ApplicationDrawer auth={this.props.auth} open={this.state.open} onChange={(state) => this.setState({open: state})} goTo={this.goTo}/>
                </AuthenticatedBar>
            )
        } else {
            return (
                <AnonymousBar title={"ATM2017"}/>
            )
        }
    }
}


class ApplicationDrawer extends Component {

    render() {
        const {isAdmin, isAuthenticated} = this.props.auth;
        return (
            <Drawer docked={false} width={300} open={this.props.open} onRequestChange={(open) => this.props.onChange(open)}>
                {!isAuthenticated() && (
                    <MenuItem primaryText="Login" leftIcon={<ContentLink/>} onTouchTap={() => this.props.auth.login()}/>)}
                <MenuItem primaryText="Home" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('')}/>
                <MenuItem primaryText="Schedule" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('schedule')}/>
                {isAuthenticated() && (
                    <MenuItem primaryText="Profil" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('profile')}/>)}
                {isAdmin() && (
                    <MenuItem primaryText="Admin" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('admin')}/>)}
                {isAuthenticated() && (
                    <MenuItem primaryText="Speakers" leftIcon={<ContentLink/>} onTouchTap={() => this.props.goTo('speakers')}/>)}
                {isAuthenticated() && (
                    <MenuItem primaryText="Logout" leftIcon={<ContentLink/>} onTouchTap={() => this.props.auth.logout()}/>)}
            </Drawer>
        )
    }
}

export default withRouter(ApplicationBarComponent);