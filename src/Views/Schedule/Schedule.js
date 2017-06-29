// @flow
import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardTitle, Tab, Tabs} from "material-ui";
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
                    return <ScheduleItem key={id} id={id} content={item.content} speaker={item.speaker} hour={item.hour} title={item.title} action={this.goTo}/>;
                })}
            </Tab>
        );

        return (
            <Tabs>
                {tabs}
            </Tabs>
        )
    }

    toCard(item) {
        return <Card style={{margin: '0px 0px 30px 0px'}}>
            <CardTitle title={item.title}/>
            <CardText>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </p>
            </CardText>
            <CardHeader title={item.speaker} subtitle={item.hour} avatar="http://www.material-ui.com/images/jsa-128.jpg"/>
        </Card>
    }
}
