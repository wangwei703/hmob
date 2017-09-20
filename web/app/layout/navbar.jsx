import { Flex, Icon } from 'antd-mobile';
import React, { Component } from 'react'

import { NavLink } from "react-router-dom";
import barSvg from 'app/svg/bar.svg';
import lineSvg from 'app/svg/line.svg';

// import {loadDayIcon} from 'app/libs/dateicon';

const LINKS = [{
    key: "everyday",
    name: "每日行情",
    icon:barSvg
},{
    key: "montrend",
    name: "月度走势",
    icon:lineSvg
}]
class componentName extends Component {

    render() {
        return <Flex className="navbar">
            {LINKS.map(l => <div key={l.key} className="navbar-item">
                <NavLink className="navbar-item-link" to={"/" + l.key} activeClassName="active">
                    <div className="header-item-icon">
                        <Icon type={l.icon} />
                    </div>
                    <div className="header-item-name">
                        {l.name}
                    </div>
                </NavLink>
            </div>)
            }
        </Flex>
    }
}

export default componentName