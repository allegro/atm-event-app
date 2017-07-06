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

const auth = new FirebaseAuth();

class SecuredRoute extends React.Component {

    static propTypes = {
        path: PropTypes.string.isRequired,
        view: PropTypes.object.isRequired
    };

    render() {
        const redirect = <Redirect to="/atm/login"/>;
        return <Route exact
                      path={this.props.path}
                      render={(props) => (auth.isAuthenticated() ? React.cloneElement(this.props.view, Object.assign({auth: auth}, props)) : redirect)}
        />
    }
}

export default <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <BrowserRouter history={history}>
        <div>
            <Route render={(props) => <ApplicationBar auth={auth} history={props.history}/>}/>
            <Route exact path="/" render={() => <Redirect to="/atm/home"/>}/>
            <Route path="/atm/login" render={(props) => <Login auth={auth} {...props} />}/>
            <SecuredRoute path="/atm/home" view={<Home/>}/>
            <SecuredRoute path="/atm/schedule" view={<Schedule/>}/>
            <SecuredRoute path="/atm/talk/:id" view={<Talk/>}/>
            <SecuredRoute path="/atm/info" view={<Info/>}/>
            <SecuredRoute path="/atm/speakers" view={<Speakers/>}/>
            <SecuredRoute path="/atm/profile" view={<Profile/>}/>
            <Route render={(props) => <BottomMenu auth={auth} history={props.history}/>}/>
            <ScrollToTop/>
        </div>
    </BrowserRouter>
</MuiThemeProvider>;