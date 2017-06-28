// @flow
import React from 'react';
import {Redirect, Route, BrowserRouter} from 'react-router-dom';
import App from './App/App';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Callback from './Callback/Callback';
import Speakers from "./Speakers/Speakers";
import Auth from './Auth/Auth';
import history from './history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './Config/theme';
import Schedule from "./Schedule/Schedule";

const auth = new Auth();

const handleAuthentication = (nextState) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) auth.handleAuthentication();
};

export default <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <BrowserRouter history={history} component={App}>
        <div>
            <Route path="/atm/" render={(props) => <App auth={auth} {...props} />}/>
            <Route path="/atm/home" render={(props) => <Home auth={auth} {...props} />}/>
            <Route path="/atm/schedule" render={(props) => <Schedule {...props} />}/>
            <Route path="/atm/speakers" render={(props) => <Speakers auth={auth} {...props} />}/>
            <Route path="/atm/profile" render={(props) => (!auth.isAuthenticated() ? (<Redirect to="/home"/>) : (<Profile auth={auth} {...props} />))}/>
            <Route path="/atm/callback" render={(props) => { handleAuthentication(props); return <Callback {...props} /> }}/>
        </div>
    </BrowserRouter>
</MuiThemeProvider>;