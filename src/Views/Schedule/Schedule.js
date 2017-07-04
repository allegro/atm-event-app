// @flow
import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui';
import ScheduleRepository from '../../Repositories/ScheduleRepository'
import ScheduleItem from './ScheduleItem';
import moment from "moment";

export default class Schedule extends Component {

    goTo(route: string) {
        this.props.history.replace(`/atm/talk/${route}`);
    }

    render() {
        const scheduleDays = ScheduleRepository.days();

        const tabs = scheduleDays.map(day =>
            <Tab key={day} label={moment(day).format("dddd")}>
                {ScheduleRepository.findAll(day).map(item => <ScheduleItem key={item.id} item={item} action={this.goTo} />)}
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
