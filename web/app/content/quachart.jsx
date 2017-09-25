import React, { Component } from 'react';
import echart, { dispose, getBarSeries, setOption, title, xAxis, yAxis,axisLabel } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';
import {getName} from 'libs/comm';
class componentName extends ChartBase {
    
    renderChart() {
        let { rptdata } = this.props;
        let s = this.formatOption(rptdata.everyday);
        let series = s;//.map(getLineSeries);
        let len=rptdata.date.length;
        setOption(this.myChart, {
            title: title({
                text: '每日房源',
            }),
            xAxis: xAxis({
                data: rptdata.date,
                axisLabel:axisLabel(len,5)
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
                    name: getName(item.s),
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