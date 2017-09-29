import React, { Component } from 'react';
import echart, { axisLabel, dispose, getBarSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';

class componentName extends ChartBase {
    
    renderChart() {
        let { data, dateList } = this.props.rptdata;
        let series = this.formatOption(data);
        setOption(this.myChart, {
            title: title({
                text: '每日房源',
            }),
            xAxis: xAxis({
                data: dateList,
                axisLabel:axisLabel(dateList.length,5)
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
                 let data = item.data.everyday.map(d => typeof d.avg==="number"?d.length:null);
                //如果数组中没有数值，则返回
                if(data.every(d=>typeof d!=="number"||isNaN(d)||d<0))return;
                series.push(getBarSeries({
                    name: item.sname,
                    data,
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