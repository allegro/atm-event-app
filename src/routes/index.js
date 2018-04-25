import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home/HomePage";
import NotFoundPage from "./NotFound/NotFoundPage";

export const createRoutes = () => <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='*' component={NotFoundPage} />
</Switch>;

export default createRoutes;