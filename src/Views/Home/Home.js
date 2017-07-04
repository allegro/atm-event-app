// @flow
import React, {Component} from 'react';
import './Home.css';
import {Card, CardHeader, CardMedia, CardTitle} from "material-ui";
import ScheduleRepository from "../../Repositories/ScheduleRepository";
import moment from "moment";

export default class Home extends Component {

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
                {
                    nextRecords.map(record =>
                        <Card style={{margin: '30px 0'}}>
                            <CardTitle titleStyle={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} title={record.title}/>
                            <CardHeader title={record.speaker ? record.speaker.name : ""}
                                        subtitle={moment(record.date + ' ' + record.start).fromNow()}
                                        avatar={record.speaker ? record.speaker.photo : null}/>
                        </Card>
                    )
                }
            </div>
        )
    }
}
