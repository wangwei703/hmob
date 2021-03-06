import React, { Component } from 'react';
import echart, { dispose, setOption } from 'libs/echarts';

import ChartBase from './chartbase';
import PropTypes from 'prop-types';

class componentName extends ChartBase {
    getValue(data) {
        if (typeof data === "number" && data >= 0) {
            return data
        } else {
            return;
        }
    }
    formatSeries(rptdata) {
        let v = this.getValue(rptdata.data.today),
            mv = this.getValue(rptdata.data.thismon),
            shadowcolor = rptdata.shadowcolor;
        let series = [{
            name: 'Pie1',
            type: 'pie',
            clockWise: false,
            radius: ['80%', '86%'],

            hoverAnimation: false,
            data: [{
                value: v,
                itemStyle: {
                    normal: {
                        // shadowColor: shadowcolor,
                        // shadowBlur: 40 * window.DPR,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                label: {
                    normal: {
                        formatter(s) {
                            if (typeof s.value === "number") {
                                return "￥" + s.value
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
                        color: 'rgba(0, 0, 0,.05)', // 未完成的圆环的颜色
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
                subtext: typeof mv === "number" ? ("\n\n\n￥" + mv) : "",
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