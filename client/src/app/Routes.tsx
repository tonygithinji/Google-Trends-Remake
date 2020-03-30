import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./home/Home";
import Results from "./results/Results";

const Routes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/explore" exact component={Results} />
    </Switch>
);

export default Routes;
