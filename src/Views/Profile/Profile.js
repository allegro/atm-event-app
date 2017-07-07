// @flow
import React, {Component} from 'react';
import {Paper} from "material-ui";

export default class Profile extends Component {
    render() {
        const profile = this.props.auth.getProfile();
        return (
            <Paper style={{padding: 30, margin: 30, textAlign: 'center'}} zDepth={1}>
                <h1>{profile.displayName}</h1>
                <h4>{profile.email}</h4>
                <div>
                    <img style={{width: 200}} src={profile.photoURL} alt="profile"/>
                    <pre style={{textAlign: 'left', whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>{JSON.stringify(profile, null, 2)}</pre>
                </div>
            </Paper>
        );
    }
}