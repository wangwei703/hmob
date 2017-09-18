import React, { Component } from 'react';
import echart, { dispose, getLineSeries, setOption, xAxis, yAxis } from 'app/libs/echarts';

import PropTypes from 'prop-types';

class componentName extends Component {
    componentDidUpdate() {
        this.renderChart();
    }
    componentDidMount() {
        this.myChart = echart(this.refs.chart);
        this.renderChart();
    }
    renderChart() {
        let { rptdata } = this.props;
        let { x, l, s } = this.formatOption(rptdata);
        let series = s.map(getLineSeries);
        setOption(this.myChart, {
            xAxis: xAxis(x),
            yAxis: yAxis({
                axisLabel: {
                    formatter: '{value} ￥'
                }
            }),
            legend: {
                data: l
            },
            series
        })
    }
    formatOption(json) {
        console.log(json);
        let source = Object.entries(json.source);
        let l = source.map(s => s[1]), x = json.date, s = [];
        source.forEach((_s, g) => {
            let _d = [];
            x.map(_x => {
                let h = json.data.find(_h => _h.s === _s[0] && _h.d === _x);
                if (h) {
                    _d.push(h.a);
                } else {
                    _d.push(null);
                }
            });
            s.push({
                name: _s[1],
                data: _d
            });
        });
        x=x.map(d=>d.replace("2017-",""))
        return { l, x, s };
    }
    render() {
        return (
            <div ref="chart" className="chartpanel" ></div>
        );
    }
}

componentName.propTypes = {
    rptdata: PropTypes.object
}

export default componentName