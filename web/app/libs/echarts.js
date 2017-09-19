import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/markpoint';

import echarts from 'echarts/lib/echarts';

// import 'echarts/lib/chart/pie';


const Graphic = echarts.graphic;
export default dom => echarts.init(dom);
const chartColors = ['#944BE8', '#02D4BF', '#38b4ee', '#303f9f'];

const markColor = "#ddd";
const labelColor = "#aaa";

let markPoint=()=>({
    data: [{
        type: 'max',
        symbolSize: 60 * window.DPR
    }, {
        type: 'min',
        symbolSize: 60* window.DPR
    }],
    itemStyle: {
        normal: {
            label: {
                show: true,
                color: markColor,
                formatter: function (data) {
                    var data = (data.value || 0).toString(), result = '';
                    while (data.length > 3) {
                        result = ',' + data.slice(-3) + result;
                        data = data.slice(0, data.length - 3);
                    }
                    if (data) { result = data + result; }
                    return result;
                },
            }
        }
    }
});
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
        //backgroundColor: 'rgba(0,0,0,.1)',
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
        symbolSize: 5 * window.DPR,
        label: {
            normal: {
                show: false,
                position: 'top',
                color: labelColor
            }
        },
        markPoint:markPoint(),
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
let getBarSeries = opts => {
    return Object.assign({}, {
        type: 'bar',
        barWidth: 3 * window.DPR,
        barMinHeight: 3 * window.DPR,
        markPoint:markPoint(),
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
        show: false
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
            show: true,
            margin: 10 * window.DPR,
            rotate: 1,
            align: 'center',
            formatter(v, i) {
                return v.substr(5);
            },
            textStyle: {
                color: labelColor,
                fontSize: 12 * window.DPR
            }
        }
    }, opts);
}
export {
    setOption,
    dispose,
    getLineSeries,
    getBarSeries,
    xAxis,
    yAxis,
    chartColors,
    Graphic
};