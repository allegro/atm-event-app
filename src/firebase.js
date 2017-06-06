// @flow
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import config from './config';

export default class Firebase extends React.Component {

    constructor() {
        super();
        firebase.initializeApp(config.FIREBASE_CONFIG);
    }

    static childContextTypes = {
        firebase: PropTypes.object
    };

    getChildContext() {
        return {firebase: firebase};
    }

    render() {
        return this.props.children;
    }
}
