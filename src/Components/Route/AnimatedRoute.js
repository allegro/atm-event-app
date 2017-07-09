// @flow
import React from 'react';
import {PropTypes} from 'prop-types';
import {RouteTransition} from "react-router-transition";
import {Route} from 'react-router-dom';

export default class AnimatedRoute extends React.Component {
    static propTypes = {
        view: PropTypes.object.isRequired,
        path: PropTypes.string.isRequired,
        exact: PropTypes.bool
    };

    render() {
        return (
            <Route exact={this.props.exact} path={this.props.path} render={(props) => {
                return <RouteTransition pathname={props.location.pathname} atEnter={{opacity: 0}} atLeave={{opacity: 0}} atActive={{opacity: 1}}>
                    {React.cloneElement(this.props.view, props)}
                </RouteTransition>
            }}/>
        )
    }
}