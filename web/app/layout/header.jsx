import React, { Component } from 'react'

import { Flex } from 'antd-mobile';
import { Icon } from 'antd-mobile';
import { NavLink } from "react-router-dom";
import barSvg from 'app/svg/bar.svg';
import lineSvg from 'app/svg/line.svg';
import todaySvg from 'app/svg/today.svg';

const LINKS = [{
    key: "home",
    name: "今日房价",
    icon:todaySvg
}, {
    key: "avgprice",
    name: "日走势",
    icon:lineSvg
}, {
    key: "avgpricemon",
    name: "月走势",
    icon:lineSvg
}, {
    key: "quantity",
    name: "房源数",
    icon:barSvg
}]
class componentName extends Component {
    render() {
        return <Flex className="navbar">
            {LINKS.map(l => <div key={l.key} className="navbar-item">
                <NavLink className="navbar-item-link" to={"/" + l.key} activeClassName="active">
                    <Icon type={l.icon} />
                    <div>{l.name}</div>
                </NavLink>
            </div>)
            }
        </Flex>
    }
}

export default componentName