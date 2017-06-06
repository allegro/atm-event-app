// @flow
import React, {Component} from 'react';
import './Home.css';

export default class Home extends Component {

    authenticatedContent() {
        return <h4>You are logged in!</h4>
    }

    anonymousContent(login) {
        return <h4>You are not logged in! Please{' '} <a style={{cursor: 'pointer'}} onClick={login.bind(this)}>Log In</a> to continue.</h4>
    }

    render() {
        return this.props.auth.isAuthenticated() ? this.authenticatedContent() : this.anonymousContent(this.props.auth.login);
    }
}
