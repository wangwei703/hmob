import React, { Component } from 'react';
import echart, { dispose, setOption } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';

class componentName extends ChartBase {
    getValue(data) {
        if (typeof data === "object" && typeof data.a === "number") {
            let v = data.a,
                p = Math.round(v / 200);
            return ["￥" + v, p]
        } else {
            return ["-", 0];
        }
    }
    renderChart() {
        let { rptdata } = this.props;
        console.log(rptdata);
        let [v, p] = this.getValue(rptdata.data.today),
            [mv, mp] = this.getValue(rptdata.data.thismon);
        setOption(this.myChart, {
            backgroundColor: "transparent",
            color: [rptdata.color],
            title: {
                text: rptdata.text,
                subtext: "\n\n\n"+mv,
                x: 'center',
                y: '25%',
                textStyle: {
                    fontWeight: 'normal',
                    color: rptdata.color,
                    fontSize: 14 * window.DPR
                },
                subtextStyle: {
                    fontWeight: 'normal',
                    color: rptdata.color,
                    fontSize: 16 * window.DPR
                }
            },
            tooltip: {
                show: false,
            },
            toolbox: {
                show: false,
            },
            series: [{
                name: 'Pie1',
                type: 'pie',
                clockWise: false,
                radius: ['80%', '85%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        shadowBlur: 40,
                        shadowColor: 'rgba(40, 40, 40, 0.5)',
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: p,
                    label: {
                        normal: {
                            formatter: `${v}`,
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: 24 * window.DPR,
                                fontWeight: 'normal'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowColor: rptdata.color,
                            shadowBlur: 10* window.DPR
                        }
                    }
                }, {
                    value: 100 - p,
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            color: 'rgba(68, 68, 68,.3)', // 未完成的圆环的颜色
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                }]
            }]
        });
    }
    formatOption(list) {
        let series = [];
        if (Array.isArray(list) && list.length > 0) {
            list.forEach(item => {
                series.push(getBarSeries({
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