import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/title';

import echarts from 'echarts/lib/echarts';
import {hex2RGBA} from './colorFormat';

// import 'echarts/lib/component/tooltip';



const Graphic = echarts.graphic;
export default dom => echarts.init(dom);
const chartColors = ['#48A6F5', '#9859F0']; //'#999', '#111',
const shadowColor = ['#2f8fdf', '#7a3bd1'];
const bgColor = "rgba(0,0,0,0)";

const titleColor = "#5E5374";
const labelColor = "#ADA6B8";

const shadow = (opts, idx = 0) => {
    let o = Object.assign({
        color:chartColors[idx],
        shadowColor: 'rgba(0,0,0,0.4)',//shadowColor[idx],
        shadowBlur: 10 * window.DPR,
        shadowOffsetY: 10 * window.DPR
    }, opts);
    return o;
}
let dispose = chart => {
    if (chart) {
        chart.clear();
        if (!chart.isDisposed())
            // chart.dispose();
            chart = null;
    }
}
let setOption = (chart, options) => {
    // console.log(options);
    let newOptions = Object.assign({
        backgroundColor: bgColor,
        color: chartColors,
        animation: false,
        grid: {
            left: 10 * window.DPR,
            right: 10 * window.DPR,
            top: 40 * window.DPR,
            bottom: 15 * window.DPR,
            containLabel: true
        },
        textStyle: {
            fontSize: 12 * window.DPR
        },
        tooltip: { //提示框组件
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    backgroundColor: '#a49cc1'
                }
            },
            textStyle: {
                fontSize: 12 * window.DPR
            }
        },
    }, options)
    chart && chart.setOption(newOptions, true); //不合并
}
let getLineSeries = (opts, idx,isEmpty=false) => {
    let newOpts=Object.assign({
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        showSymbol: true,
        symbolSize: 5 * window.DPR,
        label: {
            normal: {
                show: false,
            }
        },
        lineStyle: {
            normal: shadow({
                width: 2 * window.DPR
            }, idx)
        }
    }, opts);
    if(!isEmpty){
        newOpts["areaStyle"]={
            normal: {
                color: new Graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: hex2RGBA(shadowColor[idx],0.2)
                }, {
                    offset: 1,
                    color: hex2RGBA(shadowColor[idx],0)
                }], false),
               
            }
        }
    }
    return newOpts;
}
let getBarSeries = opts => {
    return Object.assign({}, {
        type: 'bar',
        // barWidth: '45%',
        barGap: 0,
        barCategoryGap: 2 * window.DPR,
        label: {
            normal: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                // barBorderRadius: [2*window.DPR, 2*window.DPR,0, 0],
                opacity: .8
            }
        }
    }, opts);
}
let axis = (xy, opts) => {
    return Object.assign({}, {
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(0, 0, 0, 0.07)',
                // type: 'dashed',
                width: 1 * window.DPR
            }
        },
        nameTextStyle: {
            color: labelColor,
            fontSize: 12 * window.DPR
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        }
    }, xy, opts);
}
let yAxis = opts => {
    return axis({
        type: 'value',
        scale: true,
        nameLocation: 'end',
        axisLabel: {
            textStyle: {
                color: labelColor,
                fontSize: 8 * window.DPR
            },
            formatter(v) {
                if (v > 5000) {
                    return Math.round(v / 100) / 100 + "万"
                }
                return v;
            }
        },
        nameGap: 20
    }, opts);
}
let xAxis = opts => {
    return axis({
        type: 'category',
        splitLine: {
            show: false
        }
    }, opts);
}
let title = opts => {
    return Object.assign({}, {
        textStyle: {
            color: titleColor,
            fontSize: 12 * window.DPR
        },
        left: 5 * window.DPR,
        top: 10 * window.DPR,
    }, opts);
}
let axisLabel = (dataLength, labelLength) => {
    return {
        interval(index) {
            if (dataLength < 12) {
                return true;
            }
            if (index === 0 || index === dataLength - 1)
                return true;
            let step = Math.round(dataLength / 12);
            if (index % step === 0) {
                return true;
            }
            return false;
        },
        rotate: 40,
        margin: 8 * window.DPR,
        formatter(value) {
            if (value.length > labelLength) {
                return value.substr(labelLength);
            }
            return value;
        },
        textStyle: {
            color: labelColor,
            fontSize: 8 * window.DPR
        }
    }
};
export {
    setOption,
    dispose,
    getLineSeries,
    getBarSeries,
    xAxis,
    yAxis,
    axisLabel,
    title,
    chartColors,
    shadowColor
};