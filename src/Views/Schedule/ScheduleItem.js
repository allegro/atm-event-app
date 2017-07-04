// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Avatar, Card, CardHeader, CardText, CardTitle} from "material-ui";
import './ScheduleItem.css';
import SocialPerson from 'material-ui/svg-icons/social/person';
import {CSSTransitionGroup} from 'react-transition-group'

export default class ScheduleItem extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        action: PropTypes.func
    };

    render() {
        const scheduleItemDescription = this.props.item.content
            ? <CardText>{this.props.item.content}</CardText>
            : null;

        const scheduleItemMeta = this.props.item.speaker
            ? <CardHeader title={this.props.item.speaker.name}
                          textStyle={{'padding': '0'}}
                          subtitle={`${this.props.item.start} - ${this.props.item.end}`}
                          avatar={this.props.item.speaker.photo ? <Avatar src={this.props.item.photo}/> : <Avatar icon={<SocialPerson/>}/>}
            />
            : <CardHeader subtitle={`${this.props.item.start} - ${this.props.item.end}`}
                          textStyle={{'padding': '0'}}
            />;

        return (
            <CSSTransitionGroup key={this.props.item.id} transitionName="schedule-card-animation"
                transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
                <Card className="schedule-card" onTouchTap={() => this.props.item.speaker ? this.props.action(this.props.item.id) : null}>
                    <CardTitle title={this.props.item.title}/>
                    {scheduleItemDescription}
                    {scheduleItemMeta}
                </Card>
            </CSSTransitionGroup>
        )
    }
}
