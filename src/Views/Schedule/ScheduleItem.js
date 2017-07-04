// @flow
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import {PropTypes} from 'prop-types';
import {Avatar, Card, CardHeader, CardText, CardTitle} from "material-ui";
import './ScheduleItem.css';
import SocialPerson from 'material-ui/svg-icons/social/person';

class ScheduleItem extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        hideDescription: PropTypes.bool,
        action: PropTypes.func
    };

    renderTechnicalTime() {
        const { item } = this.props;

        return <Card className="schedule-card">
            <CardTitle title={item.title}/>
            <CardHeader subtitle={`${item.start} - ${item.end}`} textStyle={{'padding': '0'}} />
        </Card>;
    }

    renderPresentationDesc() {
        const { item, history, hideDescription } = this.props;

        return <Card className="schedule-card" onTouchTap={() => history.push(`/atm/talk/${item.id}`)}>
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
        const { item } = this.props;

        return item.isTechnical()
            ? this.renderTechnicalTime()
            : this.renderPresentationDesc();
    }
}

export default withRouter(ScheduleItem);