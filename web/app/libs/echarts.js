import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

import echarts from 'echarts/lib/echarts';

export default dom => echarts.init(dom);

const chartColors = ['#944BE8', '#02D4BF', '#38b4ee', '#303f9f'];

const subTitleColor = "#b1afba";
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
        color: chartColors,//['#61DA00','#00CCFF','#afa9fe','#fe8080'],
        animation: false,
        grid: {
            left: 20 * window.DPR,
            right: 20 * window.DPR,
            top: 20 * window.DPR,
            bottom: 30 * window.DPR
        },
        textStyle: {
            fontSize: 14 * window.DPR
        }
    }, options)
    chart && chart.setOption(newOptions);
}
let getLineSeries = data => {
    return {
        data: data.data,
        name: data.name,
        type: 'line',
        //smooth: true,
        symbolSize: 12,
        label: {
            normal: {
                show: true,
                position: 'top',

            }
        },
        lineStyle: {
            normal: {
                width: 3,
                shadowColor: 'rgba(0,0,0,.6)',
                shadowBlur: 8,
                shadowOffsetY: 5
            }
        }
    }
}
let axis = {
    splitLine: { //网格线
        show: false
    },
    nameTextStyle: {
        fontSize: 12 * window.DPR
    },
    axisLine: {
        show: true,
        lineStyle: {
            color: axisLabelColor,
            opacity: 0.4
        }
    },
    axisTick: {
        alignWithLabel: true
    }
}
let yAxis = data => {
    return {
        name: data.name,
        type: 'value',
        scale: true,
        axisTick: { show: false },
        splitLine: { //网格线
            show: false
        }
    };
}
let xAxis = data => {
    let len = data.length - 1;
    let interval = (idx) => {
        if (len < 4)
            return true;
        let x = [0, len,Math.round(len*.25),Math.round(len*.5),Math.round(len*.75)];
        return x.includes(idx);
    }
    return Object.assign({}, axis, {
        data,
        axisLabel: {
            interval,
            rotate: 45,
            show: true,
            splitNumber: 5,
            textStyle: {
                color: axisLineColor
            },
            fontSize: 10 * window.DPR
        },
        splitLine: { //网格线
            show: false
        }
    });
}
export { setOption, dispose, getLineSeries, xAxis, yAxis ,chartColors};