import React, { Component } from 'react'
import { chartColors, shadowColor } from 'libs/echarts';

import PropTypes from 'prop-types';
import TodayChart from './todaychart';

class componentName extends Component {

    formatTrendColor(slr) {
        let c;
        if (typeof slr === "number") {
            c = slr >= 0 ? "#61DA00" : "#F62880";
        }
        return c;
    }
    renderContent(idx) {
        let { rptdata } = this.props;
        return rptdata.map((rd, idx) => {
            let data = rd.data;
            let color = chartColors[idx],
                text = rd.sname,
                today = data.todaydata,
                thismon = data.thismondata,
                shadowcolor = shadowColor[idx]
            return <div key={idx + "-1"} className="infopanel-col-item">
                <TodayChart rptdata={{
                    color,
                    text,
                    shadowcolor,
                    data: {
                        today,
                        thismon
                    }
                }} style={{ margin: 0, height: '40vw' }} />
            </div>;
        })
    }
    render() {
        return (
            <div className="infopanel">
                {this.renderContent()}
            </div>
        )
    }
}

componentName.propTypes = {
    rptdata: PropTypes.array
}

export default componentName