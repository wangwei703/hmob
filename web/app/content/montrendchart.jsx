import React, { Component } from 'react';
import echart, { dispose, getLineSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';

class componentName extends ChartBase {

    renderChart() {
        let { rptdata } = this.props;
        let s = this.formatOption(rptdata.everymon);
        let series = s;
        setOption(this.myChart, {
            title: title({
                text: '月度走势',
            }),
            xAxis: xAxis({
                data: rptdata.mons
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
                series.push(getLineSeries({
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