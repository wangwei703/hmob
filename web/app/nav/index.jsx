import React, { Component } from 'react'

import { SegmentedControl } from 'antd-mobile';

class componentName extends Component {
    state = {
        data: this.props.rptdata,
        selectedIndex:this.props.selectedIndex
    }
    onChange = e => {
        let idx=e.nativeEvent.selectedSegmentIndex,
            name=e.nativeEvent.value;
        this.props.onChange && this.props.onChange(idx, name);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedIndex: nextProps.selectedIndex
        })
    }
    render() {
        let values=this.state.data.map(c=>c.name);
        return (
            <SegmentedControl
                tintColor={'#373461'}
                className="navbar"
                prefixCls="hm"
                selectedIndex={this.state.selectedIndex}
                style={{ borderRadius: 0 }}
                values={values}
                onChange={this.onChange}
            />
        )
    }
}

export default componentName