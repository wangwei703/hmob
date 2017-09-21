import React, { Component } from 'react';
import echart, { dispose, getBarSeries, setOption, title, xAxis, yAxis } from 'app/libs/echarts';

import PropTypes from 'prop-types';

class componentName extends Component {
    componentDidMount() {
        this.myChart = echart(this.refs.chart);
        this.renderChart();
    }
    componentWillUnmount() {
        dispose(this.myChart);
    }
    renderChart() {
        let { rptdata } = this.props;
        let s = this.formatOption(rptdata.everyday);
        let series = s;//.map(getLineSeries);
        setOption(this.myChart, {
            title: title({
                text: '每日房源',
            }),
            xAxis: xAxis({
                data: rptdata.date,
                scale: false,
                splitLine: {
                    interval: 0,
                    lineStyle: {
                        color: "#444",
                        type: 'dashed'
                    }
                }
            }),
            grid: {
                left: 10 * window.DPR,
                right: 10 * window.DPR,
                top: 0,
                bottom: 0
            },
            yAxis: yAxis({
                type: 'value',
                scale: true
            }),
            series
        })
    }
    formatOption(list) {
        let series = [];
        if (Array.isArray(list) && list.length > 0) {
            list.forEach(item => {
                series.push(getBarSeries({
                    type: "bar",
                    name: item.s,
                    data: item.t,
                }));
            });
        }
        return series;
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