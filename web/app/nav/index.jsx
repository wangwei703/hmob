import React, { Component } from 'react'

import { Flex } from 'antd-mobile';

class componentName extends Component {
    state = {
        data: this.props.rptdata,
        activeIndex: 0
    }
    onItemClick = (idx) => {
        if (this.state.activeIndex === idx) return;
        this.setState({
            activeIndex: idx
        });
        this.props.onChange&&this.props.onChange(this.state.data[idx]);
    }
    render() {
        console.log("render nav");
        return (
            <Flex justify="stretch" align="stretch" className="navbar">
                {
                    this.state.data.map((c, idx) => <Flex.Item key={idx} className={"navbar-item " + (this.state.activeIndex === idx ? "navbar-item-active" : "")} onClick={() => this.onItemClick(idx)}>{c.name}</Flex.Item>)
                }
            </Flex>
        )
    }
}

export default componentName