import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminPanel from "./Admin/AdminPanel";
import Home from "./Home/HomePage";
import LoginPage from "./Login/LoginPage";
import NotFoundPage from "./NotFound/NotFoundPage";
import LogoutPage from "./Logout/LogoutPage";
import Schedule from "./Schedule/Schedule";

export const createRoutes = () => <Switch>
    <Route exact path='/atm-event-app/admin' component={AdminPanel} />
    <Route exact path='/atm-event-app/login' component={LoginPage} />
    <Route exact path='/atm-event-app/logout' component={LogoutPage} />
    <Route exact path='/atm-event-app/' component={Home} />
    <Route exact path='/atm-event-app/schedule' component={Schedule} />
    <Route exact path='*' component={NotFoundPage} />
</Switch>;

export default createRoutes;