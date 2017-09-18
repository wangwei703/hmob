import React, { Component } from 'react';
import echart, { dispose, setOption } from 'app/libs/echarts';

import PropTypes from 'prop-types';

class Chart extends Component {
    formatSeries(data) {
        let series = [];
        if (Array.isArray(data)) {
            data=data.filter(_data=>_data.day.v);
            series = data.map((_data, _idx) => {
                let day = _data.day,
                    val = day.v,
                    p = day.p ? Math.floor(day.p * 10000) / 100 : null,
                    v = val ? Math.min(100, Math.floor(val / 200)) : 0;
                 let mon = _data.mon,
                    monval = mon.v||0,
                    monp = mon.p ? Math.floor(mon.p * 10000) / 100 : null,
                    monv = monval ? Math.min(100, Math.floor(val / 200)) : 0;
                return {
                    type: 'pie',
                    name: _data.name,
                    clockWise: true, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    radius: _idx ? ['40%', '45%'] : ['55%', '60%'],
                    center: ['50%', '50%'],
                    data: [{
                        value: v
                    }, {
                        value: 100 - v,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,255,255,.1)',//未完成的圆环的颜色
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        }
                    }],
                    label: {
                        normal: {
                            position:"outside",
                            textStyle: {
                                fontSize: 18 * window.DPR
                            },
                            formatter(param) {
                                return `${ _data.name}今日：${val}￥，${p}%\n当月：${monval}￥，${monp}%`;
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            smooth: true,
                            length:30*window.DPR,
                            lineStyle: {
                                width: 2*window.DPR
                            }
                        }
                    }
                };
            })
        }
        return series;
    }
    renderChart() {
        console.log(this.props.rptdata);
        let rptData = this.props.rptdata;
        let series = this.formatSeries(rptData);
        setOption(this.myChart, {
            series
        })
    }
    componentDidUpdate() {
        this.renderChart();
    }
    componentDidMount() {
        this.myChart = echart(this.refs.chart);
        this.renderChart();
    }
    componentWillUnmount() {
        dispose(this.myChart);
    }
    render() {
        return (
            <div ref="chart" className="chartpanel" ></div>
        );
    }
}

Chart.propTypes = {
    rptdata: PropTypes.array
};

export default Chart;