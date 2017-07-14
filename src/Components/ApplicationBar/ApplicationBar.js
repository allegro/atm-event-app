// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {PropTypes} from 'prop-types';
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
                <AuthenticatedBar title={"ATM2017"} onLeftIconButtonTouchTap={this.handleOpen} profile={this.state.profile} goTo={this.goTo}/>
            )
        } else {
            return (
                <AnonymousBar title={"ATM2017"}/>
            )
        }
    }
}

export default withRouter(ApplicationBarComponent);