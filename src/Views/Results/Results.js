// @flow
import React, {Component} from 'react';
import {List, ListItem, Paper} from "material-ui";
import {PropTypes} from 'prop-types';

export default class Results extends Component {

    static propTypes = {
        votes: PropTypes.object.isRequired
    };

    render() {
        const votes = this.props.votes;
        return (
            <Paper style={{padding: 30, margin: 30, textAlign: 'center', display: 'flex', flexDirection: 'column'}}
                   zDepth={1}>
                <List>
                    {Object.keys(votes).map(key => <ListItem key={key} secondaryText={this.calcScore(key)} primaryText={key}/>)
                        .sort((a,b) => parseFloat(b.props.secondaryText) - parseFloat(a.props.secondaryText))}
                </List>
            </Paper>
        );
    }

    calcScore(id) {
        const votes = this.props.votes || {};
        if (!votes.hasOwnProperty(id)) return 0;
        return Object.keys(votes[id]).map(key => votes[id][key].score).reduce((a, b) => a + b, 0);
    }
}