// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {PropTypes} from 'prop-types';
import {Avatar, Card, CardHeader, CardText, CardTitle} from "material-ui";
import { SocialPerson, PlacesFreeBreakfast, MapsRestaurantMenu, SocialLocationCity,
    ActionVerifiedUser, ActionSpeakerNotes, ActionFlightTakeoff, ActionFlightLand } from 'material-ui/svg-icons';

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
        action: PropTypes.func
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
        const {item, history, hideDescription} = this.props;

        return <Card className="schedule-card" style={{margin: '0 0 30px 0', cursor: 'pointer'}}
                     onTouchTap={() => history.push(`/atm/talk/${item.id}`)}>
            <CardTitle title={item.title}/>
            {hideDescription ? null : <CardText>{item.content}</CardText>}
            <CardHeader title={item.speaker.name}
                        textStyle={{'padding': '0'}}
                        subtitle={`${item.start} - ${item.end}`}
                        avatar={item.speaker.photo ? <Avatar src={item.photo}/> : <Avatar icon={<SocialPerson/>}/>}
            />
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