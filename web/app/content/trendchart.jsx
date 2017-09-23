import React, { Component } from 'react';
import echart, { dispose, getLineSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';
import ecStat from 'echarts-stat';

class componentName extends ChartBase {
    renderChart() {
        let { rptdata } = this.props;
        let s = this.formatOption(rptdata.trend);
        let series = s;//.map(getLineSeries);
        setOption(this.myChart, {
            title: title({
                text: '每日均价',
            }),
            xAxis: xAxis({
                type: "value",
                scale: true,
            }),
            yAxis: yAxis({
                type: 'value'
            }),
            series
        })
    }
    formatOption(list) {
        let series = [];
        if (Array.isArray(list) && list.length > 0) {
            list.forEach(item => {
                let data = item.a.map((a, i) => [i + 1, a]);
                series.push(getLineSeries({
                    name: item.s,
                    data,
                    showSymbol: true,
                    symbolSize: 5 * window.DPR,

                }));
                let myRegression = ecStat.regression('linear', data);
                let gradient = myRegression.parameter.gradient;
                series.push(getLineSeries({
                    name: item.s,
                    showSymbol: false,
                    data: myRegression.points,
                    lineStyle: {
                        normal: {
                            width: 1 * window.DPR,
                            type: 'dashed'
                        }
                    },
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                                offset: [0, 0 * window.DPR],
                                formatter() {
                                    let v = Math.round(gradient * 100) / 100;
                                    return v;
                                },
                                textStyle: {
                                    color: gradient < 0 ? '#F62880' : "#61DA00",
                                    fontSize: 12 * window.DPR
                                }
                            }
                        },
                        data: [{
                            coord: myRegression.points[myRegression.points.length - 1]
                        }]
                    }
                }));
            });
        }
        return series;
    }
}

componentName.propTypes = {
    rptdata: PropTypes.object
}

export default componentName