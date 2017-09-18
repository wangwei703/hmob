import { Flex, Tabs } from 'antd-mobile';
import React, { Component, PropTypes } from 'react'

import Chart from './chart';
import Community from "app/libs/cfg";
import InfoItem from './infoitem';
import fetchData from 'app/libs/fetch';

const TabPane = Tabs.TabPane;
class Report extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetchData("home").then(json => {
            let data = [];
            Community.forEach(c => {
                let dayData = json.day.filter(d => d.c === c.key);
                let monData = json.mon.filter(d => d.c === c.key);
                data.push({
                    key: c.key,
                    name: c.name,
                    day: dayData,
                    mon: monData,
                    source: json.source
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
            let dayData = json.day.find(d => d.s === sk),
                monData = json.mon.find(d => d.s === sk),
                data = {
                    name: sn
                };
            if (dayData)
                data.day = {
                    v: dayData.a,
                    p: dayData.p
                }
            if (monData) {
                data.mon = {
                    v: monData.a,
                    p: monData.p
                }
            }
            return data;
        });
        return <TabPane tab={json.name} key={key} style={{ fontSize: "16px" }}>
            <InfoItem rptdata={rptdata} />
            <Chart rptdata={rptdata} />
        </TabPane>
    }
    callback(key) {
        console.log('onChange', key);
    }
    handleTabClick(key) {
        console.log('onTabClick', key);
    }
    render() {
        return (
            <Tabs className="content" onChange={this.callback} onTabClick={this.handleTabClick} animated={false} destroyInactiveTabPane={true}>
                {this.state.data.map((c, idx) => {
                    return this.getCardRepot(idx, c)
                })
                }
            </Tabs>
        )
    }
}

export default Report