import React, { Component, PropTypes } from 'react'

import TodayChart from './todaychart';
import { chartColors } from 'libs/echarts';

class componentName extends Component {

    formatTrend(data) {
        if (data && Array.isArray(data.slr) && data.slr.length === 2) {
            let slr = data.slr[1];
            if (typeof slr === "number") {
                slr = Math.round(slr * 100) / 100
                let cls = "", val = slr;
                if (slr < 0) {
                    cls = "down";
                } else {
                    val = "+" + slr;
                }
                return [val, cls];
            }
        }
        return ["", ""];
    }
    renderContent(idx) {
        let { rptdata } = this.props;
        console.log(rptdata);
        let color = chartColors[idx],
            source = rptdata.source[idx],
            trend = rptdata.trend.find(d => d.s === source.k),
            today = rptdata.today.data.find(d => d.s === source.k),
            thismon = rptdata.thismon.data.find(d => d.s === source.k);
        let [tv, tv_cls] = this.formatTrend(trend)
        let content = [
            <TodayChart key={idx + "-1"} rptdata={{
                color,
                text: source.n,
                data: {
                    today,
                    thismon
                }
            }}  style={{margin:0}}/>,
            <div key={idx + "-2"} className={"infopanel-cell rate " + tv_cls}>
                {tv}
            </div>
        ];

        return content;
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