import React, { Component } from 'react'

import InfoPanel from 'app/content/infopanel';
import MonthTrendChart from './montrendchart';
import PriceDistchart from './pricedistchart';
import PropTypes from 'prop-types';
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
        let { name, data, dateList, monthList } = this.state.data;
        return (
            <div className="content">
                <h3 className="title"><span>{name}</span></h3>
                <InfoPanel rptdata={data} />
                <TrendChart key="trendchart" rptdata={{ data, dateList }} />
                <QuaChart key="quachart" rptdata={{ data, dateList }} />
                <PriceDistchart key="pricedistchart" rptdata={{ data }} />
                <MonthTrendChart key="monthtrendchart" rptdata={{ data, monthList }} />
            </div>
        )
    }
}

export default Report