import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip';
import echarts from 'echarts/lib/echarts';

const Graphic = echarts.graphic;
export default dom => echarts.init(dom);
const chartColors = ['#00CAFF', '#9859F0']; //'#999', '#111',
const bgColor = "#2D2B2F";

const markColor = "#ddd";
const labelColor = "#999";
const axisLineColor = "#37383C";


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
            left: 45 * window.DPR,
            right: 10 * window.DPR,
            top: 40 * window.DPR,
            bottom: 30 * window.DPR
        },
        textStyle: {
            fontSize: 12 * window.DPR
        },
        tooltip: { //提示框组件
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    backgroundColor: '#6a7985'
                }
            },

        },
    }, options)
    chart && chart.setOption(newOptions, true); //不合并
}
let getLineSeries = opts => {
    return Object.assign({
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
        // barWidth: 3 * window.DPR,
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
                color: 'rgba(55, 55, 55, 0.7)',
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
                fontSize: 12 * window.DPR
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
            color: labelColor,
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
    chartColors
};