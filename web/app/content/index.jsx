import React, { Component, PropTypes } from 'react'

import InfoPanel from 'app/content/infopanel';
import MonthTrendChart from './montrendchart';
import QuaChart from './quachart';
import TrendChart from './trendchart';

class Report extends Component {
    state = {
        data: this.props.rptdata
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.rptdata,
            name: nextProps.name
        })
    }
    render() {
        let data = this.state.data;
        return (
            <div className="content">
                <h3 className="title"><span>{data.name}</span></h3>
                <InfoPanel rptdata={{ source: data.source, today: data.today, thismon: data.thismon, trend: data.trend }} />
                <TrendChart rptdata={{ trend: data.trend }} />
                <QuaChart rptdata={{ date: data.date, everyday: data.trend }} />
                <MonthTrendChart rptdata={{ mons: data.mons, everymon: data.everymon }} />
            </div>
        )
    }
}

export default Report