import React, { Component } from 'react';
import echart, { dispose, getBarSeries, getLineSeries, getScatterSeries, setOption, xAxis, yAxis } from 'app/libs/echarts';

import PropTypes from 'prop-types';

class componentName extends Component {
    componentDidMount() {
        this.myChart = echart(this.refs.chart);
        this.renderChart();
    }
   
    renderChart() {
        console.log(this.props.rptdata);
    }
    formatOption(list) {
        
    }
    render() {
        return (
            <div ref="chart" className="chartpanel" ></div>
        );
    }
}

componentName.propTypes = {
    rptdata: PropTypes.object
}

export default componentName