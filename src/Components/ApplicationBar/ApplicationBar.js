// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {PropTypes} from 'prop-types';
import AnonymousBar from "./AnonymousBar";
import AuthenticatedBar from "./AuthenticatedBar";

class ApplicationBarComponent extends Component {

    static propTypes = {
        profile: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleOpen = () => this.setState({open: true});
    handleClose = () => this.setState({open: false});

    goTo = (route: string) => {
        this.props.history.push(`/atm/${route}`);
        this.handleClose();
    };

    render() {
        if (this.props.isLoggedIn) {
            return (
                <AuthenticatedBar title={this.props.title} onLeftIconButtonTouchTap={this.handleOpen} profile={this.props.profile}
                                  goTo={this.goTo}/>
            )
        } else {
            return (
                <AnonymousBar title={this.props.title}/>
            )
        }
    }
}

export default withRouter(ApplicationBarComponent);