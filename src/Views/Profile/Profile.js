// @flow
import React, {Component} from 'react';
import './Profile.css';

export default class Profile extends Component {
    render() {
        const profile = this.props.auth.getProfile();
        return (
            <div>
                <h1>{profile.displayName}</h1>
                <div>
                    <img src={profile.photoURL} alt="profile"/>
                    <pre>{JSON.stringify(profile, null, 2)}</pre>
                </div>
            </div>
        );
    }
}