import React, { Component, PropTypes } from 'react'

import TodayChart from './todaychart';
import { chartColors } from 'libs/echarts';

class componentName extends Component {

    formatTrendColor(data) {
        let c;
        if (data && Array.isArray(data.slr) && data.slr.length === 2) {
            let slr = data.slr[1];
            if (typeof slr === "number") {
                c = slr >= 0 ? "#61DA00" : "#F62880";
            }
        }
        return c;
    }
    renderContent(idx) {
        let { rptdata } = this.props;
        console.log(rptdata);
        let color = chartColors[idx],
            source = rptdata.source[idx],
            trend = rptdata.trend.find(d => d.s === source.k),
            today = rptdata.today.data.find(d => d.s === source.k),
            thismon = rptdata.thismon.data.find(d => d.s === source.k),
            tc = this.formatTrendColor(trend)
        return <TodayChart key={idx + "-1"} rptdata={{
            color,
            text: source.n,
            tc,
            data: {
                today,
                thismon
            }
        }} style={{ margin: 0 }} />;
    }
    render() {
        return (
            <div className="infopanel">
                <div className="infopanel-col-item">
                    {this.renderContent(0)}
                </div>
                <div className="infopanel-col-item">
                    {this.renderContent(1)}
                </div>
            </div>
        )
    }
}

componentName.propTypes = {

}

export default componentName