import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';

import echarts from 'echarts/lib/echarts';

// import 'echarts/lib/chart/pie';



export default dom => echarts.init(dom);

const chartColors = ['#944BE8', '#02D4BF', '#38b4ee', '#303f9f'];

const subTitleColor = "#ccc";
const axisLabelColor = subTitleColor;
const axisLineColor = subTitleColor;

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
        backgroundColor: 'rgba(0,0,0,.1)',
        color: chartColors,//['#61DA00','#00CCFF','#afa9fe','#fe8080'],
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
let getLineSeries = data => {
    return {
        data: data.data,
        name: data.name,
        type: 'line',
        smooth: true,
        symbolSize: 8 * window.DPR,
        label: {
            normal: {
                show: true,
                position: 'top',
                rotate: 30,
                color: subTitleColor,
                offset:[10* window.DPR,-5* window.DPR]
            }
        },
        lineStyle: {
            normal: {
                width: 3 * window.DPR,
                shadowColor: 'rgba(0,0,0,.6)',
                shadowBlur: 8 * window.DPR,
                shadowOffsetY: 5 * window.DPR
            }
        }
    }
}
let axis = {
    splitLine: { //网格线
        show: false
    },
    nameTextStyle: {
        color: axisLabelColor,
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
}
let yAxis = data => {
    return Object.assign({}, axis, {
        //name: data.name,
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
    });
}
let xAxis = data => {
    return Object.assign({}, axis, {
        data,
        axisLine: {
            show: true,
            lineStyle: {
                color: axisLabelColor,
                opacity: 0.8,
                width: 1 * window.DPR
            }
        },
        axisLabel: {
            show: true,
            rotate :45,
            margin:20,
            textStyle: {
                color:subTitleColor,
                fontSize: 10 * window.DPR
            }
        }
    });
}
export { setOption, dispose, getLineSeries, xAxis, yAxis, chartColors };