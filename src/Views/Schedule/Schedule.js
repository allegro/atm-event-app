// @flow
import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui';
import ScheduleItem from './ScheduleItem';
import {PropTypes} from 'prop-types';
import moment from "moment";

export default class Schedule extends Component {

    static propTypes = {
        schedule: PropTypes.object.isRequired,
        votes: PropTypes.object.isRequired
    };

    render() {
        const scheduleDays = this.props.schedule.days();
        const tabs = scheduleDays.map(day =>
            <Tab key={day} label={moment(day).format("dddd")}>
                {this.props.schedule.findAll(day).map(item => <ScheduleItem key={item.id} item={item}
                                                                            score={this.getScore(item)}/>)}
            </Tab>
        );

        const activeTabIndex = scheduleDays.findIndex(day => moment().diff(day, 'days') === 0);

        return (
            <Tabs initialSelectedIndex={Math.max(0, activeTabIndex)}>
                {tabs}
            </Tabs>
        )
    }

    getScore(item) {
        const votes = this.props.votes || {};
        if (!votes.hasOwnProperty(item.id)) return null;
        return parseFloat(Object.keys(votes[item.id]).map(key => votes[item.id][key].score).map(val => (val + 5) / (5 + 5)).reduce((a, b) => a + b, 0)).toFixed(1);
    }
}
