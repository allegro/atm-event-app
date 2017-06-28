// @flow
import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardTitle, Tab, Tabs} from "material-ui";
import schedule from './schedule.json';

export default class Home extends Component {
    render() {
        const tabs = schedule.map(day =>
            <Tab label={day.date}>
                {day.agenda.map(this.toCard)}
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
