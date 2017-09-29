import { Button, Flex, List, Radio, Range, WhiteSpace } from 'antd-mobile';
import PriceRange, { DateRange } from "libs/cfg";
import React, { Component } from 'react'

import { saveRules } from 'libs/filterrules';

const RadioItem = Radio.RadioItem;
const Item = List.Item;
// 函数防抖
function Debounce(fn) {
    // 维护一个 timer
    let timer = null,
        delay = 500;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(()=> {
            fn.apply(this, args);
        }, delay);
    };
}
class componentName extends Component {
    constructor(props){
        super(props);
        this.state=props.filterRules;
        this.doChange = Debounce(this._doChange);
    }
    onDateSpanChange(val) {
        this.setState({ daterange: val });
        this.doChange();
    }

    onPriceRangeChange(range, key) {
        let {pricerange}=this.state;
        pricerange[key]=range;
        this.setState({
            pricerange
        });
        this.doChange();
    }

    _doChange=()=>{
        saveRules(this.state);
        let { doApplyRules } = this.props;
        if (doApplyRules) {
            doApplyRules();
        }
    }
    render() {
        let { daterange, pricerange } = this.state;
        return (<Flex direction="column" align="stretch" className="am-drawer-content">
            <div className="setting-header" >
                设置
             </div>
            <List renderHeader={() => '发布时间'}>
                {DateRange.map(i => (
                    <RadioItem key={i.value} checked={daterange === i.value} onChange={() => this.onDateSpanChange(i.value)}>
                        {i.text}
                    </RadioItem>
                ))}
            </List>
            <List renderHeader={() => '单价范围'}>
                {PriceRange.map((i) => (
                    <Item key={"price-range-" + i.key}>
                        <div style={{ position: 'relative', top: '-0.14rem', marginTop: ".14rem", marginBottom: ".14rem" }}>
                            <p style={{ margin: ".1rem" }}>{i.name}<span style={{ float: 'right' }}>{pricerange[i.key].join(' - ')} 万</span></p>
                            <Range
                                min={0.5}
                                max={2.2}
                                step={0.1}
                                defaultValue={pricerange[i.key]}
                                onChange={e => this.onPriceRangeChange(e, i.key)}
                            />
                        </div>
                    </Item>
                ))}
            </List>
            <WhiteSpace size="lg" />
            {/* <Button className="btn-save" type="primary" onClick={this.doSave}>确定</Button>
            <WhiteSpace size="lg" /> */}
        </Flex>)
    }
}

export default componentName