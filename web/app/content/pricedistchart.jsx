import React, { Component } from 'react'
import echart, { axisLabel, dispose, getBarSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';

class componentName extends ChartBase {
    renderChart() {
        let { data } = this.props.rptdata;
        let series = this.formatOption(data);
        setOption(this.myChart, {
            title: title({
                text: '价格分布',
            }),
            xAxis: [xAxis({
                type: 'value',
                scale: true, //
                axisLabel: axisLabel(0, 4)
            })],
            yAxis: [yAxis({
                type: 'value'
            })],
            series
        })
    }
    formatOption(list) {
        let series = [];
        if (Array.isArray(list) && list.length > 0) {
            list.forEach(item => {
                let data = item.data.weekPriceDistribution;
                if (data.length > 1)
                    series.push(getBarSeries({
                        type: "bar",
                        barWidth: '45%',
                        maxBarWidth:5*window.DPR,
                        minBarWidth:2*window.DPR,
                        name: item.sname,
                        data
                    }));
            });
        }
        return series;
    }
}

componentName.propTypes = {
    data: PropTypes.array
}

export default componentName