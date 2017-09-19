import React, { Component } from 'react'
import { Redirect, Route, Switch } from "react-router-dom";

import EveryDay from 'app/content/everyday';
import MonTrend from 'app/content/montrend';

class Content extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/everyday" component={EveryDay} />
                <Route exact path="/montrend" component={MonTrend} />
                <Redirect from='/' to='/everyday' />
            </Switch>
        )
    }
}

export default Content