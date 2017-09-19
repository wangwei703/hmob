import React, { Component } from 'react';
import echart, { Graphic, dispose, getBarSeries, getLineSeries, setOption, xAxis, yAxis } from 'app/libs/echarts';

import PropTypes from 'prop-types';

class componentName extends Component {
    componentDidUpdate() {
        this.renderChart();
    }
    componentDidMount() {
        this.myChart = echart(this.refs.chart);
        this.renderChart();
    }
    buildLine(len, max) {
        return {
            type: 'bar',
            barWidth: 1 * window.DPR,
            silent: true,
            itemStyle: {
                normal: {
                    barBorderRadius: 2 * window.DPR,
                    color: new Graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(155, 155,155, .2)'
                    }, {
                        offset: 1,
                        color: 'rgba(155, 155,155, 0.05)'
                    }])
                }
            },
            barGap: '-100%',
            barCategoryGap: '50%',
            data: new Array(len).fill(max)
        }
    }
    renderChart() {
        let { rptdata } = this.props;
        let { x, s, bars, maxAvg, maxQua } = this.formatOption(rptdata);
        let series = s.map(getLineSeries);
        bars.forEach(bar => {
            series.push(getBarSeries(bar));
        });

        series.push(this.buildLine(x.length, maxAvg));
        // series.push(Object.assign({
        //     xAxisIndex: 1,
        //     yAxisIndex: 1
        // }, this.buildLine(x.length, maxQua)));
        setOption(this.myChart, {
            xAxis: [xAxis({ data: x }), xAxis({
                gridIndex: 1,
                data: x
            })],
            grid: [{
                top: 0,
                left: 10 * window.DPR,
                right: 10 * window.DPR,
                bottom: '5%',
                height: '45%'
            }, {
                top: '50%',
                left: 15 * window.DPR,
                right: 10 * window.DPR,
                bottom: '5%',
                height: '45%'
            }],
            yAxis: [yAxis(), yAxis({
                gridIndex: 1,
                type: 'value',
                inverse: false
            })],
            series
        })
    }
    formatOption(list) {
        let x = [], s = [], bars = [], maxAvg = 0, maxQua = 0;
        if (Array.isArray(list) && list.length > 0) {
            x = list[0].everyday.date;
            list.forEach((_item,z) => {
                let item = _item.everyday.data;
                let avgs = [], qua = [];
                x.forEach(_x => {
                    let h = item.find(_h => _h.d === _x);
                    if (h) {
                        maxAvg = Math.max(maxAvg, h.a);
                        maxQua = Math.max(maxQua, h.t);
                        avgs.push(h.a);
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
                bars.push({
                    name: _item.name,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    stack:"qua",
                    data: qua
                })
            });

            //x = x.map(d => d.replace("2017-", ""));
            //console.log(x);
        }
        maxAvg = Math.ceil(maxAvg / 1000) * 1000;
        maxQua = Math.ceil(maxQua / 100) * 100;
        return { x, s, bars, maxAvg, maxQua };
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