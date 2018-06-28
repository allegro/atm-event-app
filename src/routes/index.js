import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home/HomePage";
import LoginPage from "./Login/LoginPage";
import NotFoundPage from "./NotFound/NotFoundPage";
import LogoutPage from "./Logout/LogoutPage";
import Schedule from "./Schedule/Schedule";

export const createRoutes = () => <Switch>
    <Route exact path='/login' component={LoginPage} />
    <Route exact path='/logout' component={LogoutPage} />
    <Route exact path='/schedule' component={Schedule} />
    <Route exact path='/' component={Home} />
    <Route exact path='*' component={NotFoundPage} />
</Switch>;

export default createRoutes;