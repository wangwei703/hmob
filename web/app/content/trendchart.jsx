import React, { Component } from 'react';
import echart, { axisLabel, dispose, getLineSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';

class componentName extends ChartBase {
    renderChart() {
        let { data, dateList } = this.props.rptdata;
        let series = this.formatOption(data);
        setOption(this.myChart, {
            title: title({
                text: '每日均价',
            }),
            xAxis: xAxis({
                data: dateList,
                axisLabel: axisLabel(dateList.length, 5)
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
            list.forEach((item, idx) => {
                let gradient = item.data.everydayTrend,
                    data = item.data.everyday.map(d => d.avg),
                    isEmpty=data.every(d=>typeof d!=="number"||isNaN(d)||d<0);
                series.push(getLineSeries({
                    name: item.sname,
                    data,
                    symbol:'circle',
                    showSymbol: true,
                    symbolSize: 5 * window.DPR,
                    markLine: {
                        animation: true,
                        label: {
                            normal: {
                               formatter() {
                                    return gradient.v;
                                },
                                textStyle: {
                                    color: gradient.v < 0 ? '#f62880' : "#34d9bc",
                                    fontSize: 12 * window.DPR,
                                    align: 'right'
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 1 * window.DPR,
                                type: 'dashed'
                            }
                        },
                        data: gradient.data
                    }
                }, idx,isEmpty));


            });
        }
        return series;
    }
}

componentName.propTypes = {
    rptdata: PropTypes.object
}

export default componentName