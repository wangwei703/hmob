import React, { Component } from 'react';
import echart, { dispose, getLineSeries, setOption, title, xAxis, yAxis,axisLabel } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';
import {getName} from 'libs/comm';
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
                data: rptdata.mons,
                axisLabel:axisLabel(0,4)
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
                series.push(getLineSeries({
                    name: getName(item.s),
                    data: item.t
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