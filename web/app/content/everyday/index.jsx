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
        // let rptdata = Object.entries(json.source).map((s, idx) => {
        //     let sk = s[0], sn = s[1];
        //     let today = json.today.find(d => d.s === sk),
        //         thismon = json.thismon.find(d => d.s === sk),
        //         everyday = json.everyday.filter(d => d.s === sk).map(d => {
        //             return {
        //                 d: d.d,
        //                 a: d.a,
        //                 t: d.t
        //             }
        //         }),
        //         data = {
        //             name: sn,
        //             everyday: {
        //                 date: json.date,
        //                 data: everyday
        //             }
        //         };
        //     if (today)
        //         data.day = {
        //             v: today.a,
        //             p: today.p
        //         }
        //     if (thismon) {
        //         data.mon = {
        //             v: thismon.a,
        //             p: thismon.p
        //         }
        //     }
        //     return data;
        // });
        return <TabPane tab={json.name} key={key} style={{ fontSize: "16px" }}>
            <InfoPanel rptdata={{source:json.source,today:json.today,thismon:json.thismon}} />
            <TrendChart rptdata={{source:json.source,trend:json.trend}} />
            <QuaChart rptdata={{source:json.source,everyday:json.everyday}} />
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