// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Avatar, Card, CardHeader, CardText, CardTitle} from "material-ui";
import './ScheduleItem.css';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import {CSSTransitionGroup} from 'react-transition-group'

export default class ScheduleItem extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string,
        hour: PropTypes.string.isRequired,
        speaker: PropTypes.string,
        avatar: PropTypes.string,
        action: PropTypes.func
    };

    render() {
        const scheduleItemDescription = this.props.content
            ? <CardText>{this.props.content}</CardText>
            : null;

        const scheduleItemMeta = this.props.speaker
            ? <CardHeader title={this.props.speaker}
                          textStyle={{'padding': '0'}}
                          subtitle={this.props.hour}
                          avatar={this.props.avatar || <Avatar icon={<SocialPerson/>}/>}/>
            : <CardHeader subtitle={this.props.hour}
                          textStyle={{'padding': '0'}}
                          avatar={<Avatar icon={<ActionSchedule/>}/>}/>;

        return (
            <CSSTransitionGroup
                key={this.props.id}
                transitionName="schedule-card-animation"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <Card className="schedule-card" onTouchTap={() => this.props.action(this.props.id)}>
                    <CardTitle title={this.props.title}/>
                    {scheduleItemDescription}
                    {scheduleItemMeta}
                </Card>
            </CSSTransitionGroup>
        )
    }
}
