// @flow
import React from 'react';
import {Redirect, Route, BrowserRouter} from 'react-router-dom';
import ApplicationBar from './Components/ApplicationBar/ApplicationBar';
import BottomMenu from "./Components/BottomMenu/BottomMenu";
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import history from './history';
import Home from './Views/Home/Home';
import Profile from './Views/Profile/Profile';
import Speakers from "./Views/Speakers/Speakers";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './Config/theme';
import Schedule from "./Views/Schedule/Schedule";
import Info from "./Views/Info/Info";
import Talk from "./Views/Talk/Talk";
import FirebaseAuth from "./Auth/Auth";
import Login from "./Views/Login/Login";
import {PropTypes} from 'prop-types';
import {RouteTransition} from "react-router-transition";

const auth = new FirebaseAuth();

class SecuredRoute extends React.Component {

    static propTypes = {
        path: PropTypes.string.isRequired,
        view: PropTypes.object.isRequired
    };

    render() {
        const redirect = <Redirect to="/atm/login"/>;
        return (
            <AnimatedRoute path={this.props.path} view={(auth.isAuthenticated() ? this.props.view : redirect)}/>
        );
    }
}

class AnimatedRoute extends React.Component {
    static propTypes = {
        view: PropTypes.object.isRequired,
        path: PropTypes.string.isRequired,
        exact: PropTypes.bool
    };

    render() {
        return (
            <Route exact={this.props.exact} path={this.props.path} render={(props) => {
                return <RouteTransition pathname={props.location.pathname} atEnter={{opacity: 0}} atLeave={{opacity: 0}} atActive={{opacity: 1}}>
                    {React.cloneElement(this.props.view, props)}
                </RouteTransition>
            }}/>
        )
    }
}

export default <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <BrowserRouter history={history}>
        <div>
            <Route render={(props) => <ApplicationBar auth={auth} history={props.history}/>}/>
            <Route exact path="/" view={() => <Redirect to="/atm/home"/>}/>
            <AnimatedRoute path="/atm/login" view={<Login handleLogin={auth.login}/>}/>
            <SecuredRoute path="/atm/home" view={<Home/>}/>
            <SecuredRoute path="/atm/schedule" view={<Schedule/>}/>
            <SecuredRoute path="/atm/talk/:id" view={<Talk firebase={auth.firebase}/>}/>
            <SecuredRoute path="/atm/info" view={<Info/>}/>
            <SecuredRoute path="/atm/speakers" view={<Speakers/>}/>
            <SecuredRoute path="/atm/profile" view={<Profile handleProfile={auth.getProfile} handleLogout={auth.logout}/>}/>
            <Route render={(props) => <BottomMenu history={props.history}/>}/>
            <ScrollToTop/>
        </div>
    </BrowserRouter>
</MuiThemeProvider>;