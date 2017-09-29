import React, { Component } from 'react';
import echart, { axisLabel, dispose, getLineSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';
import { getName } from 'libs/comm';

class componentName extends ChartBase {

    renderChart() {
        let { data, monthList } = this.props.rptdata;
        let series = this.formatOption(data);
        setOption(this.myChart, {
            title: title({
                text: '月度走势',
            }),
            xAxis: xAxis({
                data: monthList,
                axisLabel: axisLabel(0, 4)
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
                let data = item.data.everymonthdata;
                if (data.every(d => typeof d !== "number" || isNaN(d)||d<0)) return;
                series.push(getLineSeries({
                    name: item.sname,
                    data
                }, idx));
            });
        }
        return series;
    }

}

componentName.propTypes = {
    rptdata: PropTypes.object
}

export default componentName