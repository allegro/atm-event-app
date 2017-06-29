// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Avatar, Card, CardHeader, CardText, CardTitle} from "material-ui";
import './ScheduleItem.css';
import SocialPerson from 'material-ui/svg-icons/social/person';

export default class ScheduleItem extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        hour: PropTypes.string.isRequired,
        speaker: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        action: PropTypes.func
    };

    render() {
        return (
            <Card className="schedule-card" onTouchTap={() => this.props.action(this.props.id)}>
                <CardTitle title={this.props.title}/>
                <CardText>{this.props.content}</CardText>
                <CardHeader title={this.props.speaker} subtitle={this.props.hour} avatar={this.props.avatar || <Avatar icon={<SocialPerson/>}/>}/>
            </Card>
        )
    }
}
