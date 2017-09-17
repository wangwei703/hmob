import React, { Component } from 'react'
import { Redirect, Route, Switch } from "react-router-dom";

import AvgPrice from 'app/content/avgprice';
import AvgPriceMon from 'app/content/avgpricemon';
import HOME from 'app/content/home';
import Quantity from 'app/content/quantity';

class Content extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/home" component={HOME} />
                <Route exact path="/avgprice" component={AvgPrice} />
                <Route exact path="/avgpricemon" component={AvgPriceMon} />
                <Route exact path="/quantity" component={Quantity} />
                <Redirect from='/' to='/home' />
            </Switch>
        )
    }
}

export default Content