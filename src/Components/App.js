// @flow
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import 'moment/locale/pl';

import { Profile as ProfileModel, Schedule as ScheduleModel } from '../Models';
import { ScrollToTop, ApplicationBar, BottomMenu, AnimatedRoute } from '../Components';
import { Home, Info, Loading, Login, Profile, Schedule, Speakers, Stream, Talk } from '../Views';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'ATM2017',
            isLoading: true,
            isLoggedIn: false,
            profile: {}
        };
    }

    componentWillMount() {
        const { auth } = this.props;

        auth.on('userNotLogged', () => this.setState({
            isLoading: false,
            isLoggedIn: false
        }));

        auth.on('userLoggedIn', (user, dbSnapshot) => this.setState({
            isLoading: false,
            isLoggedIn: true,
            profile: new ProfileModel(user),
            schedule: new ScheduleModel(dbSnapshot.schedule),
            speakers: dbSnapshot.speakers,
            votes: dbSnapshot.votes
        }));
    }

    render() {
        const {isLoggedIn, profile, title} = this.state;
        return (
            <BrowserRouter history={createHistory({forceRefresh: true})}>
                <div>
                    <ApplicationBar title={title} profile={profile} isLoggedIn={isLoggedIn}/>
                    {this.redirectIfNeeded()}
                    <ScrollToTop/>
                </div>
            </BrowserRouter>
        )
    }

    redirectIfNeeded() {
        const { actions } = this.props.auth;
        const { isLoggedIn, profile, schedule, speakers, votes, isLoading } = this.state;

        if (isLoading) return <Loading/>;
        if (!isLoggedIn) return <Login handleLogin={actions.login}/>;

        return <div>
            <AnimatedRoute exact path="/atm/" view={<Home schedule={schedule}/>}/>
            <AnimatedRoute path="/atm/schedule" view={<Schedule schedule={schedule}/>}/>
            <AnimatedRoute path="/atm/talk/:id" view={<Talk profile={profile} schedule={schedule} votes={votes} handleVote={actions.vote} />}/>
            <AnimatedRoute path="/atm/info" view={<Info/>}/>
            <AnimatedRoute path="/atm/stream" view={<Stream/>}/>
            <AnimatedRoute path="/atm/speakers" view={<Speakers speakers={speakers}/>}/>
            <AnimatedRoute path="/atm/profile" view={<Profile profile={profile} handleLogout={actions.logout}/>}/>
            <BottomMenu/>
        </div>;
    }
}
