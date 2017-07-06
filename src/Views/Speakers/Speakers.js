// @flow
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';
import {Card, CardHeader} from "material-ui";

class Speakers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            speakers: []
        }
    }

    componentDidMount() {
        this.bindAsArray(this.props.auth.firebase.database().ref('/speakers'), 'speakers');
    }

    render() {
        const speakers = this.state.speakers.map(speaker =>
            <Card key={speaker.email}>
                <CardHeader title={`${speaker.name.first} ${speaker.name.last}`} subtitle={speaker.email} avatar={speaker.picture.medium}/>
            </Card>);
        return <div>{speakers}</div>;
    }
}

reactMixin(Speakers.prototype, ReactFireMixin);

export default Speakers;
