// @flow
import React, {Component} from 'react';
import {Card, CardHeader, CardMedia, CardTitle} from "material-ui";
import ScheduleRepository from "../../Repositories/ScheduleRepository";
import ScheduleItem from '../Schedule/ScheduleItem';
import moment from "moment";

export default class Home extends Component {

    componentDidMount() {
        ScheduleRepository.on('change', () => this.forceUpdate());
    }

    render() {
        const nextRecords = ScheduleRepository.findNext(new Date(), 5);
        const next = nextRecords.splice(1, 1)[0];
        return (
            <div>
                <Card>
                    <CardMedia overlay={<CardTitle title={next.title} subtitle={next.content}/>}>
                        <img src="https://raw.githubusercontent.com/bgalek/atm/master/public/img/back.png" alt=""/>
                    </CardMedia>
                    <CardHeader title={next.speaker ? next.speaker.name : ""} subtitle={moment(next.date + ' ' + next.start).fromNow()}
                                avatar={next.speaker ? next.speaker.photo : null}/>
                </Card>
                <h2>Kolejne wystąpienia:</h2>
                {nextRecords.map(item => <ScheduleItem key={item.id} item={item} hideDescription={true}/>)}
            </div>
        )
    }
}
