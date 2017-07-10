// @flow
import React, {Component} from 'react';
import {Paper, RaisedButton} from "material-ui";
import {PropTypes} from 'prop-types';

export default class Profile extends Component {

    static propTypes = {
        handleLogout: PropTypes.func.isRequired,
        handleProfile: PropTypes.func.isRequired
    };

    render() {
        const profile = this.props.handleProfile();
        return (
            <div>
                <Paper style={{padding: 30, margin: 30, textAlign: 'center'}} zDepth={1}>
                    <h1>{profile.displayName}</h1>
                    <h4>{profile.email}</h4>
                    <img style={{width: 200, padding: 30}} src={profile.photoURL} alt="profile"/>
                    <RaisedButton style={{width: '90%'}} label="Wyloguj się" secondary={true} onTouchTap={() => this.props.handleLogout()}/>
                </Paper>
            </div>
        );
    }
}