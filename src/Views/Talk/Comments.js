// @flow
import React, {Component} from 'react';
import {Paper} from "material-ui";
import ReactDisqusComments from 'react-disqus-comments';
import {PropTypes} from 'prop-types';

export default class Comments extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired
    };

    render() {
        return (
            <Paper style={{padding: 30}} zDepth={1}>
                <ReactDisqusComments shortname="atm-1" identifier={this.props.id}/>
            </Paper>
        );
    }
}