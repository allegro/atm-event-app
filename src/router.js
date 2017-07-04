// @flow
import React from 'react';
import {Redirect, Route, BrowserRouter} from 'react-router-dom';
import ApplicationBar from './Components/ApplicationBar/ApplicationBar';
import BottomMenu from "./Components/BottomMenu/BottomMenu";
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Auth from './Auth/Auth';
import history from './history';
import Home from './Views/Home/Home';
import Profile from './Views/Profile/Profile';
import Callback from './Views/Callback/Callback';
import Speakers from "./Views/Speakers/Speakers";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './Config/theme';
import Schedule from "./Views/Schedule/Schedule";
import Info from "./Views/Info/Info";
import Talk from "./Views/Talk/Talk";

const auth = new Auth();

const handleAuthentication = (nextState) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) auth.handleAuthentication();
};

const handleCallback = (props) => {
    handleAuthentication(props);
    return <Callback {...props} />
};

export default <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <BrowserRouter history={history}>
        <div>
            <Route render={(props) => <ApplicationBar auth={auth} history={props.history}/>}/>
            <Route exact path="/" render={() => <Redirect to="/atm/" />}/>
            <Route path="/atm/" exact={true} render={(props) => <Home auth={auth} {...props} />}/>
            <Route path="/atm/schedule" render={(props) => <Schedule {...props} />}/>
            <Route path="/atm/talk/:id" render={(props) => <Talk auth={auth} {...props}/>}/>
            <Route path="/atm/info" render={(props) => <Info {...props} />}/>
            <Route path="/atm/speakers" render={(props) => <Speakers auth={auth} {...props} />}/>
            <Route path="/atm/profile" render={(props) => (!auth.isAuthenticated() ? (<Redirect to="/home"/>) : (<Profile auth={auth} {...props} />))}/>
            <Route path="/atm/callback" render={handleCallback}/>
            <Route render={(props) => <BottomMenu auth={auth} history={props.history}/>}/>
            <ScrollToTop/>
        </div>
    </BrowserRouter>
</MuiThemeProvider>;