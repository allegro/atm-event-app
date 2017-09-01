// @flow
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import 'moment/locale/pl';

import { Profile as ProfileModel, Schedule as ScheduleModel } from '../Models';
import { ScrollToTop, AnonymousBar, AuthenticatedBar, BottomMenu, AnimatedRoute } from '../Components';
import { Home, Info, Loading, Login, Profile, Schedule, Speakers, Logistics, Talk } from '../Views';

export default class App extends Component {

    state = {
        title: '',
        isLoading: true,
        isLoggedIn: false,
        profile: {}
    };

    /**
     * Listen to database/firebase events and set
     * the app state in react to those events.
     */
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

    /**
     * Base on the app's data state, chooses the
     * best rendering strategy.
     */
    render() {
        const { isLoggedIn, isLoading } = this.state;

        if (isLoading) return this.renderLoader();
        if (!isLoggedIn) return this.renderLoginForm();

        return this.renderApp();
    }

    /**
     * Simple loading sign.
     */
    renderLoader() {
        return <div>
            <AnonymousBar title={this.state.title} />
            <Loading />
        </div>;
    }

    /**
     * Login form.
     */
    renderLoginForm() {
        const { actions } = this.props.auth;

        return <div>
            <AnonymousBar title="Logowanie" />
            <Login handleLogin={actions.login} />
        </div>;
    }

    /**
     * Renders a full version of app's gui. It assumes
     * that all the needed data are loaded and present
     */
    renderApp() {
        const { profile, title, schedule, speakers, votes } = this.state;
        const { actions } = this.props.auth;

        const routesDefinitions = [{
                path: '/atm-event-app/home', exact: true,
                appTitle: () => '',
                main: () => <Home schedule={schedule}/>
            },
            {
                path: '/atm-event-app/schedule',
                appTitle: () => <div>Rozkład jazdy</div>,
                main: () => <Schedule schedule={schedule}/>
            },
            {
                path: '/atm-event-app/talk/:id',
                appTitle: (props) => <div>{schedule.findById(props.match.params.id).title}</div>,
                main: () => <Talk profile={profile} schedule={schedule} votes={votes} handleVote={actions.vote} />
            },
            {
                path: '/atm-event-app/info',
                appTitle: () => <div>Mapa wydarzenia</div>,
                main: () => <Info/>
            },
            {
                path: '/atm-event-app/logistics',
                appTitle: () => <div>Oglądaj na żywo</div>,
                main: () => <Logistics/>
            },
            {
                path: '/atm-event-app/speakers',
                appTitle: () => <div>Prelegenci</div>,
                main: () => <Speakers speakers={speakers}/>
            },
            {
                path: '/atm-event-app/profile',
                appTitle: () => <div>Witaj {profile.displayName}!</div>,
                main: () => <Profile profile={profile} handleLogout={actions.logout}/>
            }
        ];

        const mainRoutesComponents = routesDefinitions.map((route, index) => (
            <AnimatedRoute key={index} path={route.path} exact={route.exact} view={route.main()} />
        ));

        // dynamically determine app bar title, with fallback to default title
        const titleComponent = <Switch>
            {routesDefinitions.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact} component={route.appTitle} />
            ))}
            <Route component={() => <div>{title}</div>} />
        </Switch>;

        return (
            <BrowserRouter history={createHistory({forceRefresh: true})}>
                <div>
                    <AuthenticatedBar title={titleComponent} profile={profile} />
                    <Route exact path="/atm-event-app" render={() => <Redirect to="/atm-event-app/home" />} />
                    {mainRoutesComponents}
                    <BottomMenu/>
                    <ScrollToTop/>
                </div>
            </BrowserRouter>
        )
    }
}
