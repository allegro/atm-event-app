// @flow
import React, {Component} from 'react';
import {Redirect, Route, BrowserRouter} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';
import ApplicationBar from '../Components/ApplicationBar/ApplicationBar';
import BottomMenu from '../Components/BottomMenu/BottomMenu';
import Home from '../Views/Home/Home';
import Profile from '../Views/Profile/Profile';
import Speakers from '../Views/Speakers/Speakers';
import Schedule from '../Views/Schedule/Schedule';
import Info from '../Views/Info/Info';
import Talk from '../Views/Talk/Talk';
import Login from '../Views/Login/Login';
import AnimatedRoute from '../Components/Route/AnimatedRoute';
import Stream from '../Views/Stream/Stream';
import 'moment/locale/pl';
import ScheduleRepository from "../Repositories/ScheduleRepository";
import Loading from "../Views/Loading/Loading";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'ATM2017',
            loading: true,
            isLoggedIn: false,
            profile: {}
        }
    }

    componentWillMount() {
        this.props.auth.onAuthStateChanged(user => {
            if (!!user) {
                this.props.auth.firebase.database().ref('/schedule').once('value').then(snapshot => {
                    this.setState({loading: false, isLoggedIn: true, profile: user, schedule: new ScheduleRepository(snapshot.val())})
                });
            } else {
                this.setState({loading: false, isLoggedIn: false});
            }
        });

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
        const {auth} = this.props;
        const {isLoggedIn, profile, schedule, loading} = this.state;
        if (loading) return <Loading/>;
        if (isLoggedIn && !loading) return (
            <div>
                <Route exact path="/" view={() => <Redirect to="/atm/home"/>}/>
                <AnimatedRoute path="/atm/home" view={<Home schedule={schedule}/>}/>
                <AnimatedRoute path="/atm/schedule" view={<Schedule schedule={schedule}/>}/>
                <AnimatedRoute path="/atm/talk/:id" view={<Talk firebase={auth.firebase} profile={profile} schedule={schedule}/>}/>
                <AnimatedRoute path="/atm/info" view={<Info/>}/>
                <AnimatedRoute path="/atm/stream" view={<Stream/>}/>
                <AnimatedRoute path="/atm/speakers" view={<Speakers firebase={auth.firebase}/>}/>
                <AnimatedRoute path="/atm/profile" view={<Profile profile={profile} handleLogout={auth.logout}/>}/>
                <BottomMenu/>
            </div>
        );
        return <Login handleLogin={auth.login}/>;

    }
}
