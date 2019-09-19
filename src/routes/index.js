import React from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "./Login/LoginPage";
import NotFoundPage from "./NotFound/NotFoundPage";
import LogoutPage from "./Logout/LogoutPage";
import Schedule from "./Schedule/Schedule";
import Votes from "./Votes/Votes";
import Info from "./Info/Info";
import Ticket from "./Ticket/Ticket";
import Questions from "./Questions/Questions";
import BaseLayout from "../layouts/BaseLayout";

const AppRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        <BaseLayout {...props} render={baseLayoutProps =>
            <Component {...baseLayoutProps} {...props}/>}
        />}
    />
);

export const createRoutes = () => <Switch>
    <Route exact path='/login' component={LoginPage} />
    <Route exact path='/logout' component={LogoutPage} />

    <AppRoute exact path='/' component={Schedule} />
    <AppRoute exact path='/votes' component={Votes} />
    <AppRoute exact path='/questions' component={Questions} />
    <AppRoute exact path='/info' component={Info} />
    <AppRoute exact path='/ticket' component={Ticket} />
    <AppRoute exact path='*' component={NotFoundPage} />
</Switch>;

export default createRoutes;
