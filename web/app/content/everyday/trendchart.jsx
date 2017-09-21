import React, { Component } from 'react';
import echart, { dispose, getLineSeries, setOption, title, xAxis, yAxis } from 'app/libs/echarts';

import PropTypes from 'prop-types';
import ecStat from 'echarts-stat';

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
        let s = this.formatOption(rptdata.trend);
        let series = s;//.map(getLineSeries);
        setOption(this.myChart, {
            title:title({
                text:'每日价格走势',
            }),
            xAxis: xAxis({
                type: "value",
                scale: false,
                splitLine: {
                    interval: 0,
                    lineStyle: {
                        color: "#444",
                        type: 'dashed'
                    }
                }
            }),
            grid: {
                left: 10*window.DPR,
                right: 10*window.DPR,
                top: 0,
                bottom: 0
            },
            yAxis: yAxis({
                type: 'value',
                scale: true,
                // min:10000,
                // max:20000,
            }),
            series
        })
    }
    formatOption(list) {
        let series = [];
        if (Array.isArray(list) && list.length > 0) {
            list.forEach(item => {
                let data = item.a.map((a, i) => [i, a]);
                series.push({
                    type: "scatter",
                    name: item.s,
                    data
                });
                let myRegression = ecStat.regression('linear', data);
                myRegression.points.sort(function (a, b) {
                    return a[0] - b[0];
                });
              
                let gradient=myRegression.parameter.gradient;
                series.push(getLineSeries({
                    type: "line",
                    name: item.s,
                    showSymbol: false,
                    data: myRegression.points,
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                                offset :[0,0*window.DPR],
                                formatter(){
                                    return Math.round(gradient*100)/100;
                                },
                                textStyle: {
                                    color: gradient<0?'#fe8080':"#61DA00",
                                    fontSize: 14*window.DPR
                                }
                            }
                        },
                        data: [{
                            coord: myRegression.points[myRegression.points.length - 1]
                        }]
                    }
                }));
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