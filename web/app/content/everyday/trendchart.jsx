import React, { Component } from 'react';
import echart, { dispose, getLineSeries, setOption, xAxis, yAxis } from 'app/libs/echarts';

import PropTypes from 'prop-types';

class componentName extends Component {
    componentDidMount() {
        this.myChart = echart(this.refs.chart);
        this.renderChart();
    }
    componentWillUnmount() {
        dispose(this.myChart);
    }
    renderChart() {
        let { rptdata } = this.props;
        let  s = this.formatOption(rptdata.trend);
        let series = s.map(getLineSeries);
        setOption(this.myChart, {
            xAxis: xAxis({
                type: "value",
                scale: false,
                min:0,
                max:9,
                splitLine:{
                    interval :0,
                    lineStyle:{
                        color:"#444",
                        type:'dashed'
                    }
                }
            }),
            grid:{
                left:0,
                right:0,
                top:0,
                bottom:0
            },
            yAxis:yAxis({
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
                let slr = item.slr;
                if (Array.isArray(slr) && slr.length === 2) {
                    let data = [];
                    for (let i = 2; i < 8; i++) {
                        data.push([i, 1 + slr[1] * i/slr[0]]);
                    }
                    series.push({
                        name: item.s,
                        data
                    });
                }

            });
        }
        return series;
    }
    render() {
        return (
            <div ref="chart" className="chartpanel" ></div>
        );
    }
}

componentName.propTypes = {
    rptdata: PropTypes.object
}

export default componentName