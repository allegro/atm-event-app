// @flow
import React, {Component} from 'react';

export default class Info extends Component {

    componentDidMount() {
        const places = [
            { name: 'conference', position: { lat: 52.416090, lng: 16.925757 } },
            { name: 'game', position: { lat: 52.418960, lng: 16.932361 } },
            { name: 'party', position: { lat: 52.408072, lng: 16.934617 } }
        ];

        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: 52.412108, lng: 16.933848 }
        });

        places.forEach(place => new window.google.maps.Marker({
            position: place.position,
            label: place.name,
            map
        }));
    }

    render() {
        return (
            <div id="map" style={{minHeight: '100vh'}}></div>
        );
    }
}