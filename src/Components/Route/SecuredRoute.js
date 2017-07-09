// @flow
import React from 'react';
import {PropTypes} from 'prop-types';
import {Redirect} from 'react-router-dom';
import AnimatedRoute from "./AnimatedRoute";

export default class SecuredRoute extends React.Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        path: PropTypes.string.isRequired,
        view: PropTypes.object.isRequired
    };

    render() {
        const redirect = <Redirect to="/atm/login"/>;
        return (
            <AnimatedRoute path={this.props.path} view={(this.props.auth.isAuthenticated() ? this.props.view : redirect)}/>
        );
    }
}
