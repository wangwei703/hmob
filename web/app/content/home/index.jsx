import React, { Component, PropTypes } from 'react'
import Community from "app/libs/cfg";
import fetchData from 'app/libs/fetch';
import { Flex } from 'antd-mobile';
import Chart from './chart';
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
                    data: {
                        day: dayData,
                        mon: monData,
                        source: json.source
                    }
                });
            })
            this.setState({
                data
            });
        });
    }

    getCardRepot(json) {
        let rptdata = Object.entries(json.source).map((s, idx) => {
            let sk = s[0], sn = s[1];
            let dayData = json.day.find(d => d.s === sk),
                monData = json.mon.find(d => d.s === sk),
                data = {};
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
            return {
                name: sn,
                data
            };
        });
        return <Chart rptdata={rptdata} />
    }
    render() {
        return (
            <div className="content">
                {this.state.data.map((c, idx) => {
                    return <Flex.Item key={idx} className="report-main-item">
                        <h2 className="report-main-item-title">{c.name}</h2>
                        <div className="report-main-item-body">
                            {this.getCardRepot(c.data)}
                        </div>
                    </Flex.Item>
                })
                }
            </div>
        )
    }
}

export default Report