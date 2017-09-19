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
        let { x, s } = this.formatOption(rptdata);
        let series = s.map(getLineSeries);
        series.push({
            name: '降雨量',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: [
                0.005, 0.026, 0.038, 0.038, 0.038, 0.076, 0.086, 0.109, 0.213, 0.276, 0.288, 0.297
            ]
        });
        console.log(x, s);
        setOption(this.myChart, {
            xAxis: [xAxis(x), {
                gridIndex: 1,
                type: 'category',
                boundaryGap: false,
                axisLine: { onZero: true },
                data: x,
                position: 'top'
            }],
            grid: [{
                left: 0,
                right: 0,
                height: '35%'
            }, {
                left: 50,
                right: 50,
                top: '55%',
                height: '35%'
            }],
            yAxis: [yAxis({
                name: "均价/万",
                axisLabel: {
                    formatter: '{value} ￥'
                }
            }), {
                gridIndex: 1,
                name: '降雨量(mm)',
                type: 'value',
                inverse: true
            }],
            series
        })
    }
    formatOption(list) {
        let x = [], s = [];
        if (Array.isArray(list) && list.length > 0) {
            x = list[0].everyday.date;
            list.forEach(_item => {
                let item = _item.everyday.data;
                let avgs = [], qua = [];
                x.forEach(_x => {
                    let h = item.find(_h => _h.d === _x);
                    if (h) {
                        avgs.push(Math.round(h.a / 10) / 1000);
                        qua.push(h.t);
                    } else {
                        avgs.push(null);
                        qua.push(null);
                    }
                });
                s.push({
                    name: _item.name,
                    data: avgs
                });
            });

            x = x.map(d => d.replace("2017-", ""))
        }
        return { x, s };
    }
    render() {
        return (
            <div ref="chart" className="chartpanel" ></div>
        );
    }
}

componentName.propTypes = {
    rptdata: PropTypes.array
}

export default componentName