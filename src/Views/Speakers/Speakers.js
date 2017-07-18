// @flow
import React from 'react';
import {Card, CardHeader} from 'material-ui';

const Speakers = ({ speakers }) => {

    const speakersCards = Object.keys(speakers).map(key => speakers[key]).map(speaker =>
        <Card key={speaker.email}>
            <CardHeader
                title={`${speaker.name.first} ${speaker.name.last}`}
                subtitle={speaker.email}
                avatar={speaker.picture.medium}
            />
        </Card>
    );

    return <div>{speakersCards}</div>;
};

export default Speakers;
