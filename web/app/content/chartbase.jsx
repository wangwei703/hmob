import React, { Component } from 'react'
import echart, { dispose, getLineSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

class componentName extends Component {
    componentDidMount() {
        this.myChart = echart(this.refs.chart);
        this.renderChart();
    }
    componentDidUpdate() {
        // this.myChart = echart(this.refs.chart);
        this.renderChart();
    }
    componentWillUnmount() {
        dispose(this.myChart);
    }
    render () {
        return (
            <div ref="chart" className="chartpanel" ></div>
        );
    }
}

export default componentName