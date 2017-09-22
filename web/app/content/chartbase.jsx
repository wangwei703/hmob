import React, { Component } from 'react'
import echart, { dispose, getLineSeries, setOption, title, xAxis, yAxis } from 'libs/echarts';

class componentName extends Component {
    componentDidMount() {
        this.myChart = echart(this.refs.chart);
        this.renderChart&&this.renderChart();
    }
    componentDidUpdate() {
        // this.myChart = echart(this.refs.chart);
        this.renderChart&&this.renderChart();
    }
    componentWillUnmount() {
        dispose(this.myChart);
    }
    render () {
        return (
            <div ref="chart" className="chartpanel" style={this.props.style} ></div>
        );
    }
}

export default componentName