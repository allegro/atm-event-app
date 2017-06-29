// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class Talk extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render() {
        return (
            <p>{this.props.match.params.id}</p>
        )
    }
}
