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
                series.push(getBarSeries({
                    name: item.s,
                    data: item.t,
                    stack:'qua'
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