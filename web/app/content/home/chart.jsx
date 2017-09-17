import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JustGage,{getRandomInt} from 'app/libs/charts/justgage';
class Chart extends Component {

    componentDidMount() {
      console.log(this.props.rptdata);
      var g1 = new JustGage({
        id: "g1",
        value: getRandomInt(0, 1000),
        min: 0,
        max: 1000,
        relativeGaugeSize: true,
        gaugeColor: "rgba(0,0,0,0.4)",
        levelColors: "#0DB8DF",
        labelFontColor : "#ffffff",
        titleFontColor: "#ffffff",
        valueFontColor :"#ffffff",
        label: "VISITORS",
        gaugeWidthScale: 0.2,
        donut: true
    });
    }
    render() {
        return (
            <div id="g1">
                
            </div>
        );
    }
}

Chart.propTypes = {
    rptdata: PropTypes.array
};

export default Chart;