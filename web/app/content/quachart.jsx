import React, { Component } from 'react';
import echart, { dispose, getBarSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';

class componentName extends ChartBase {
    
    renderChart() {
        let { rptdata } = this.props;
        let s = this.formatOption(rptdata.everyday);
        let series = s;//.map(getLineSeries);
        setOption(this.myChart, {
            title: title({
                text: '每日房源',
            }),
            xAxis: xAxis({
                data: rptdata.date
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
                    name: item.s,
                    data: item.t,
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