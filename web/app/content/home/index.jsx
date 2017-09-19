import React, { Component, PropTypes } from 'react'

import Chart from './chart';
import Community from "app/libs/cfg";
import InfoItem from './infoitem';
import { Tabs } from 'antd-mobile';
import fetchData from 'app/libs/fetch';

const TabPane = Tabs.TabPane;
class Report extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetchData("data").then(json => {
            let data = [];
            Community.forEach(c => {
                let today = json.today.filter(d => d.c === c.key);
                let thismon = json.thismonth.filter(d => d.c === c.key);
                let everyday = json.everyday.filter(d => d.c === c.key);
                data.push({
                    date: json.date,
                    source: json.source,
                    key: c.key,
                    name: c.name,
                    today,
                    thismon,
                    everyday
                });
            })
            this.setState({
                data
            });
        });
    }

    getCardRepot(key, json) {

        let rptdata = Object.entries(json.source).map((s, idx) => {
            let sk = s[0], sn = s[1];
            let today = json.today.find(d => d.s === sk),
                thismon = json.thismon.find(d => d.s === sk),
                everyday = json.everyday.filter(d => d.s === sk).map(d=>{
                    return {
                        d:d.d,
                        a:d.a,
                        t:d.t
                    }
                }),
                data = {
                    name: sn,
                    everyday: {
                        date: json.date,
                        data: everyday
                    }
                };
            if (today)
                data.day = {
                    v: today.a,
                    p: today.p
                }
            if (thismon) {
                data.mon = {
                    v: thismon.a,
                    p: thismon.p
                }
            }
            return data;
        });
        return <TabPane tab={json.name} key={key} style={{ fontSize: "16px" }}>
            <InfoItem rptdata={rptdata} />
            <Chart rptdata={rptdata} />
        </TabPane>
    }
    render() {
        return (
            <Tabs className="content" animated={false} destroyInactiveTabPane={true}>
                {this.state.data.map((c, idx) => {
                    return this.getCardRepot(idx, c)
                })
                }
            </Tabs>
        )
    }
}

export default Report