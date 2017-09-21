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
    let newOptions = Object.assign({
        backgroundColor: '#393649',
        color: chartColors,
        animation: false,
        grid: {
            left: 10 * window.DPR,
            right: 10 * window.DPR,
            top: 10 * window.DPR,
            bottom: 30 * window.DPR
        },
        textStyle: {
            fontSize: 12 * window.DPR
        }
    }, options)
    chart && chart.setOption(newOptions);
}
let getLineSeries = opts => {
    return Object.assign({
        type: 'line',
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
        barMinHeight: 3 * window.DPR,
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
let axis = {
    splitLine: { //网格线
        show: false
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
}
let yAxis = opts => {
    return Object.assign({}, axis, {
        type: 'value',
        scale: true,
        nameLocation: 'end',
        nameGap: 20,
        splitLine: { //网格线
            show: false,
            lineStyle: {
                color: 'rgba(200,200,200,.1)',
                type: 'dashed'
            }
        }
    }, opts);
}
let xAxis = opts => {
    return Object.assign({}, axis, {
        axisLabel: {
            margin: 15 * window.DPR,
            rotate: 1,
            align: 'center',
            textStyle: {
                color: labelColor,
                fontSize: 12 * window.DPR
            },
        }
    }, opts);
}
let title = opts => {
    return Object.assign({}, {
            textStyle:{
                color:labelColor,
                fontSize:14*window.DPR
            },
            left: 10*window.DPR,
            top:  10*window.DPR
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