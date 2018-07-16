import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home/HomePage";
import LoginPage from "./Login/LoginPage";
import NotFoundPage from "./NotFound/NotFoundPage";
import LogoutPage from "./Logout/LogoutPage";
import Schedule from "./Schedule/Schedule";
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

    <AppRoute exact path='/schedule' component={Schedule} />
    <AppRoute exact path='/' component={Home} />
    <AppRoute exact path='*' component={NotFoundPage} />
</Switch>;

export default createRoutes;