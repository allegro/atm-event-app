// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Avatar, Paper} from "material-ui";
import schedule from '../Schedule/schedule.json';
import slugify from 'slugify';

export default class Talk extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render() {
        const item = schedule[0].agenda.find(it => slugify(it.title) === this.props.match.params.id);
        return (
            <div style={{textAlign: 'center', margin: '0 auto', padding: '30px'}}>
                <Paper style={{padding: '30'}} zDepth={1}>
                    {item.photo ? <Avatar size={160} src={item.photo}/> : null}
                    <h2>{item.speaker}</h2>
                    <h3>{item.title}</h3>
                </Paper>
            </div>
        )
    }
}
