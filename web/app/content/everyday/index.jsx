import React, { Component, PropTypes } from 'react'

import InfoPanel from 'app/components/infopanel';
import QuaChart from './quachart';
import {Tabs} from 'antd-mobile';
import TrendChart from './trendchart';

const TabPane = Tabs.TabPane;
class Report extends Component {
    state = {
        data:[]
    }
    getCardRepot(key, json) {
       
        return <TabPane tab={json.name} key={key} style={{ fontSize: "16px" }}>
            <InfoPanel rptdata={{source:json.source,today:json.today,thismon:json.thismon}} />
            <TrendChart rptdata={{source:json.source,trend:json.trend}} />
            <QuaChart rptdata={{source:json.source,date:json.date,everyday:json.trend}} />
        </TabPane>
    }
    componentDidMount(){
        this.setState({
            data: window.RPTData
        })
    }
    render() {
        return (
            <Tabs className="content" destroyInactiveTabPane={true} animated={false}>
                {
                    this.state.data.map((c, idx) => {
                        return this.getCardRepot(idx, c)
                    })
                }
            </Tabs>
        )
    }
}

export default Report