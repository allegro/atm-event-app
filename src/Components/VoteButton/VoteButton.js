// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {RaisedButton} from "material-ui";

export default class VoteButton extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        onVote: PropTypes.func.isRequired,
    };

    render() {
        return (
            <RaisedButton
                style={{width: '90%', margin: 10}}
                label="Oceń Wystąpienie" secondary={true}
                onTouchTap={this.props.onVote}
            />
        );
    }
}

