import React, { Component, PropTypes } from 'react'

import Chart from './chart';
import Community from "app/libs/cfg";
import { Tabs } from 'antd-mobile';
import fetchData from 'app/libs/fetch';

const TabPane = Tabs.TabPane;

class componentName extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetchData("avg").then(json => {
            let data = [];
            Community.forEach(c => {
                let dayData = json.data.filter(d => d.c === c.key),
                    date = json.date;
                date.sort((d1, d2) => d1 > d2 ? 1 : (d1 < d2 ? -1 : 0));
                data.push({
                    name: c.name,
                    date,
                    source: json.source,
                    data: dayData
                });
            });
            this.setState({
                data
            });
        });
    }

    getCardRepot(key, json) {
        return <TabPane tab={json.name} key={key} style={{ fontSize: "16px" }}>
            <Chart rptdata={json} />
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

export default componentName