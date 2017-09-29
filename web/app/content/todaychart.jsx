import React, { Component } from 'react';
import echart, { dispose, setOption } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';

class componentName extends ChartBase {
    getValue(data) {
        if (typeof data === "number"&&data>=0) {
            return data
        } else {
            return ;
        }
    }
    formatSeries(rptdata) {
        let v = this.getValue(rptdata.data.today),
            mv = this.getValue(rptdata.data.thismon),
            trendColor = rptdata.tc;
        let series = [{
            name: 'Pie1',
            type: 'pie',
            clockWise: false,
            radius: ['77%', '80%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            hoverAnimation: false,
            data: [{
                value: v,
                label: {
                    normal: {
                        formatter(s){
                            if(typeof s.value==="number"){
                                return "￥"+s.value
                            }
                            return "-"
                        },
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: 20 * window.DPR,
                            fontWeight: 'normal'
                        }
                    }
                }
            }, {
                value: 20000 - v,
                name: 'invisible',
                itemStyle: {
                    normal: {
                        color: 'rgba(68, 68, 68,.5)', // 未完成的圆环的颜色
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }]
        }];
        if (trendColor) {
            series.push({
                name: 'Pie1',
                type: 'pie',
                clockWise: false,
                radius: ['89%', '90%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: 100,
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: trendColor,
                            // shadowColor: trendColor,
                            // shadowBlur: 10 * window.DPR
                        }
                    }
                }]
            });
        }
        return { series, mv };
    }
    renderChart() {
        let { rptdata } = this.props;
        let { series, mv } = this.formatSeries(rptdata);
        setOption(this.myChart, {
            backgroundColor: "transparent",
            color: [rptdata.color],
            title: {
                text: rptdata.text,
                subtext:typeof mv==="number"?("\n\n\n￥" + mv):"",
                x: 'center',
                y: '25%',
                textStyle: {
                    fontWeight: 'normal',
                    color: rptdata.color,
                    fontSize: 16 * window.DPR
                },
                subtextStyle: {
                    fontWeight: 'normal',
                    color: rptdata.color,
                    fontSize: 12 * window.DPR
                }
            },
            series
        });
    }
}

componentName.propTypes = {
    rptdata: PropTypes.object
}

export default componentName