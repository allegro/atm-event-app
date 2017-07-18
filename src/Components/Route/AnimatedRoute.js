import React from 'react';
import { PropTypes } from 'prop-types';
import { RouteTransition } from 'react-router-transition';
import { Route } from 'react-router-dom';

const AnimatedRoute = ({ view, path, exact }) => {
    return <Route exact={exact} path={path} render={(props) => {
        return <RouteTransition pathname={props.location.pathname} atEnter={{opacity: 0}} atLeave={{opacity: 0}} atActive={{opacity: 1}}>
            {React.cloneElement(view, props)}
        </RouteTransition>
    }}/>;
};

AnimatedRoute.propTypes = {
    view: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

export default AnimatedRoute;