// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Avatar, Card, CardHeader, CardText, CardTitle} from "material-ui";
import './ScheduleItem.css';
import SocialPerson from 'material-ui/svg-icons/social/person';
import {CSSTransitionGroup} from 'react-transition-group'

export default class ScheduleItem extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        item: PropTypes.object.isRequired,
        action: PropTypes.func
    };

    render() {
        const scheduleItemDescription = this.props.item.content
            ? <CardText>{this.props.item.content}</CardText>
            : null;

        const scheduleItemMeta = this.props.item.speaker
            ? <CardHeader title={this.props.item.speaker}
                          textStyle={{'padding': '0'}}
                          subtitle={this.props.item.hour}
                          avatar={this.props.item.photo ? <Avatar src={this.props.item.photo}/> : <Avatar icon={<SocialPerson/>}/>}
            />
            : <CardHeader subtitle={this.props.item.hour}
                          textStyle={{'padding': '0'}}
            />;

        return (
            <CSSTransitionGroup
                key={this.props.id}
                transitionName="schedule-card-animation"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <Card className="schedule-card" onTouchTap={() => this.props.action(this.props.id)}>
                    <CardTitle title={this.props.item.title}/>
                    {scheduleItemDescription}
                    {scheduleItemMeta}
                </Card>
            </CSSTransitionGroup>
        )
    }
}
