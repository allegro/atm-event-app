// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {PropTypes} from 'prop-types';
import {Avatar, Card, CardHeader, CardText, CardTitle} from "material-ui";
import { PlacesFreeBreakfast, MapsRestaurantMenu, SocialLocationCity,
    ActionVerifiedUser, ActionSpeakerNotes, ActionFlightTakeoff, ActionFlightLand, ActionStars } from 'material-ui/svg-icons';

import './ScheduleItem.css';

const getIconForEventType = type => {
    return {
        registration: <ActionVerifiedUser />,
        open: <ActionFlightLand />,
        keynote: <ActionSpeakerNotes />,
        coffeebreak: <PlacesFreeBreakfast />,
        lunch: <MapsRestaurantMenu />,
        party: <SocialLocationCity />,
        close: <ActionFlightTakeoff />
    }[type];
};

class ScheduleItem extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        hideDescription: PropTypes.bool,
        action: PropTypes.func,
        score: PropTypes.string
    };

    renderTechnicalTime() {
        const { title, type, start, end } = this.props.item;

        return <Card className="schedule-card" style={{margin: '0 0 30px'}}>
            <CardHeader
                title={title}
                subtitle={`${start} - ${end}`}
                textStyle={{'padding': '0'}}
                avatar={<Avatar icon={getIconForEventType(type)}/>}
            />
        </Card>;
    }

    renderPresentationDesc() {
        const {item, history, hideDescription, score} = this.props;
        const avatar = <span>
            {item.speakers.map((speaker, i) => <Avatar key={`${speaker.name}-${i}`} className="speaker-avatar" src={speaker.photo}/>)}
            {score ? <p style={{float: 'right'}}><ActionStars style={{verticalAlign: 'middle', padding: 5, color: 'rgba(0, 0, 0, 0.54)'}} />{score}</p> : null}
            </span>;

        return <Card className="schedule-card" style={{margin: '0 0 30px 0', cursor: 'pointer'}}
                     onTouchTap={() => history.push(`/atm-event-app/talk/${item.id}`)}>
            <CardTitle title={item.title}/>
            {hideDescription || item.type === 'lightning' ? null : <CardText>{item.content}</CardText>}

            <CardHeader titleColor="#D50E50" title={item.speakers.map(speaker => speaker.name).join(', ')}
                        textStyle={{'padding': '0'}}
                        subtitle={`${item.start} - ${item.end}`}
                        avatar={avatar} />
        </Card>;
    }

    render() {
        const {item} = this.props;

        return item.isTechnical()
            ? this.renderTechnicalTime()
            : this.renderPresentationDesc();
    }
}

export default withRouter(ScheduleItem);