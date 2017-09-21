import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/title';

import echarts from 'echarts/lib/echarts';

// import 'echarts/lib/chart/pie';


const Graphic = echarts.graphic;
export default dom => echarts.init(dom);
const chartColors = ['#26AEE3', '#9859F0']; //'#999', '#111',

const markColor = "#ddd";
const labelColor = "#aaa";
const axisLineColor = "#3c394e";


let dispose = chart => {
    if (chart) {
        chart.clear();
        if (!chart.isDisposed())
            chart.dispose();
        chart = null;
    }
}
let setOption = (chart, options) => {
    // console.log(options);
    let newOptions = Object.assign({
        // backgroundColor: '#393649',
        color: chartColors,
        animation: false,
        grid: {
            left: 15 * window.DPR,
            right: 15 * window.DPR,
            top: 0,
            bottom: 0
        },
        textStyle: {
            fontSize: 12 * window.DPR
        }
    }, options)
    chart && chart.setOption(newOptions, true);//不合并
}
let getLineSeries = opts => {
    return Object.assign({
        type: 'line',
        smooth: true,
        showSymbol: false,
        label: {
            normal: {
                show: false,
            }
        },
        lineStyle: {
            normal: {
                width: 2 * window.DPR,
                shadowColor: 'rgba(0,0,0,.6)',
                shadowBlur: 5 * window.DPR,
                shadowOffsetY: 3 * window.DPR
            }
        },
    }, opts)
}
let getBarSeries = opts => {
    return Object.assign({}, {
        type: 'bar',
        barWidth: 3 * window.DPR,
        label: {
            normal: {
                show: false,
                rotate: 45,
                position: 'top',
                color: labelColor
            }
        },
        itemStyle: {
            normal: {
                barBorderRadius: [0, 0, 2, 2],
                opacity: .8
            }
        }
    }, opts);
}
let axis = (xy,opts) => {
    return Object.assign({}, {
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(59, 56, 77, 0.1)',
                // type: 'dashed',
                width: 1 * window.DPR
            }
        },
        nameTextStyle: {
            color: labelColor,
            fontSize: 12 * window.DPR
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: axisLineColor
            }
        },
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        }
    }, xy,opts);
}
let yAxis = opts => {
    return axis({
        type: 'value',
        scale: true,
        nameLocation: 'end',
        nameGap: 20
    }, opts);
}
let xAxis = opts => {
    return axis({
        type: 'category'
    }, opts);
}
let title = opts => {
    return Object.assign({}, {
        textStyle: {
            color: labelColor,
            fontSize: 12 * window.DPR
        },
        left: 10 * window.DPR,
        top: 0
    }, opts);
}
export {
    setOption,
    dispose,
    getLineSeries,
    getBarSeries,
    xAxis,
    yAxis,
    title,
    chartColors
};