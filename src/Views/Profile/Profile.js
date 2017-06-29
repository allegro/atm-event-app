// @flow
import React, {Component} from 'react';
import './Profile.css';

export default class Profile extends Component {
    componentWillMount() {
        this.setState({profile: {}});
        const {userProfile, getProfile} = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => this.setState({profile}));
        } else {
            this.setState({profile: userProfile});
        }
    }

    render() {
        const {profile} = this.state;
        return (
            <div>
                <h1>{profile.name}</h1>
                <div>
                    <img src={profile.picture} alt="profile"/>
                    <h2>{profile.nickname}</h2>
                    <pre>{JSON.stringify(profile, null, 2)}</pre>
                </div>
            </div>
        );
    }
}