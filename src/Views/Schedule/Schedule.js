// @flow
import React, {Component} from 'react';
import {Tab, Tabs} from "material-ui";
import schedule from './schedule.json';
import ScheduleItem from "./ScheduleItem";
import slugify from 'slugify';

export default class Schedule extends Component {

    goTo = (route: string) => {
        this.props.history.replace(`/atm/talk/${route}`);
    };

    render() {
        const tabs = schedule.map(day =>
            <Tab key={day.date} label={day.date}>
                {day.agenda.map(item => {
                    const id = slugify(item.title);
                    return <ScheduleItem key={id} id={id} item={item} action={this.goTo}/>;
                })}
            </Tab>
        );

        return (
            <Tabs>
                {tabs}
            </Tabs>
        )
    }
}
