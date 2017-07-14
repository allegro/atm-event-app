// @flow
import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui';
import ScheduleItem from './ScheduleItem';
import {PropTypes} from 'prop-types';
import moment from "moment";

export default class Schedule extends Component {

    static propTypes = {
        schedule: PropTypes.object.isRequired
    };
    
    render() {
        const scheduleDays = this.props.schedule.days();

        const tabs = scheduleDays.map(day =>
            <Tab key={day} label={moment(day).format("dddd")}>
                {this.props.schedule.findAll(day).map(item => <ScheduleItem key={item.id} item={item} />)}
            </Tab>
        );

        const activeTabIndex = scheduleDays.findIndex(day => moment().diff(day, 'days') === 0);

        return (
            <Tabs initialSelectedIndex={Math.max(0, activeTabIndex)}>
                {tabs}
            </Tabs>
        )
    }
}
