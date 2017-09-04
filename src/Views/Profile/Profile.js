// @flow
import React, {Component} from 'react';
import {Paper, RaisedButton} from "material-ui";
import {PropTypes} from 'prop-types';

export default class Profile extends Component {

    static propTypes = {
        handleLogout: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired
    };

    render() {
        const {profile} = this.props;
        return (
            <div>
                <Paper style={{padding: 30, margin: 30, textAlign: 'center'}} zDepth={1}>
                    <h1>{profile.displayName}</h1>
                    <h5>{profile.email}</h5>
                    <img style={{width: '90%', padding: '5%'}} src={profile.photoURL} alt="profile"/>
                    <RaisedButton style={{width: '90%'}} label="Wyloguj się" secondary={true} onTouchTap={() => this.props.handleLogout()}/>
                </Paper>
            </div>
        );
    }
}