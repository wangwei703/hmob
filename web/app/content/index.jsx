import React, { Component, PropTypes } from 'react'

import InfoPanel from 'app/content/infopanel';
// import List from './list';
import MonthTrendChart from './montrendchart';
import QuaChart from './quachart';
import { SegmentedControl } from 'antd-mobile';
import TrendChart from './trendchart';

class Report extends Component {
    state = {
        data: this.props.rptdata,
        tabIndex: 0
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.rptdata,
            name: nextProps.name
        })
    }
    onChange = (e) => {
        let idx = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            tabIndex: idx
        });
    }
    renderContent(data,tab) {
        // if (tab === 0) {
            return [
                <TrendChart key="trendchart" rptdata={{ date: data.date,trend: data.trend }} />,
                <QuaChart key="quachart" rptdata={{ date: data.date, everyday: data.trend }} />,
                <MonthTrendChart key="monthtrendchart" rptdata={{ mons: data.mons, everymon: data.everymon }} />];
        // } else {
        //     return <List rptdata={{ date: data.date, everyday: data.trend,everymon: data.everymon }}/>;
        // }
    }
    render() {
        let data = this.state.data;
        let tab=this.state.tabIndex;
        return (
            <div className="content">
                <h3 className="title"><span>{data.name}</span></h3>
                <InfoPanel rptdata={{ source: data.source, today: data.today, thismon: data.thismon, trend: data.trend }} />
                {/* <SegmentedControl
                    selectedIndex={this.state.tabIndex}
                    values={['图表', '列表']}
                    onChange={this.onChange}
                /> */}
                {this.renderContent(data,tab)}

            </div>
        )
    }
}

export default Report