// @flow
import React, {Component} from 'react';

export default class Info extends Component {

    componentDidMount() {
        const places = [
            {name: 'atm', position: {lat: 52.415808, lng: 16.931525}},
            {name: 'hotel', position: {lat: 52.408534, lng: 16.911716}},
            {name: 'gra miejska', position: {lat: 52.407697, lng: 16.912918}},
            {name: 'party', position: {lat: 52.407061, lng: 16.910811}}
        ];

        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {lat: 52.412108, lng: 16.933848}
        });

        places.forEach(place => new window.google.maps.Marker({
            position: place.position,
            label: place.name,
            map
        }));
    }

    render() {
        return (
            <div id="map" style={{minHeight: '100vh'}}/>
        );
    }
}