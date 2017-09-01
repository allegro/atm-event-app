// @flow
import React, {Component} from 'react';
import {Card, CardHeader, CardMedia, CardTitle} from "material-ui";
import ScheduleItem from '../Schedule/ScheduleItem';
import {PropTypes} from 'prop-types';
import moment from "moment";

export default class Home extends Component {
    static propTypes = {
        schedule: PropTypes.object.isRequired
    };

    render() {
        const nextRecords = this.props.schedule.findNext(new Date(), 5);
        const next = nextRecords.splice(0, 1)[0];
        const photo = next.photo || "https://raw.githubusercontent.com/allegro/atm-event-app/master/public/img/back.png";
        return (
            <div>
                <Card style={{minHeight: 308}}>
                    <CardMedia overlay={<CardTitle title={next.title}/>}>
                        <img src={photo} alt="background"/>
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
