import { Flex, Icon, List, NavBar, Radio, Range, WhiteSpace, createTooltip } from 'antd-mobile';
import PriceRange, { DateRange } from "libs/cfg";
import React, { Component } from 'react'

const RadioItem = Radio.RadioItem;
const RangeWithTooltip = createTooltip(Range);
const Item = List.Item;
class componentName extends Component {
    state = {
        daterange: -100000,
    }
    onDateSpanChange(val) {
        this.setState({ daterange: val });
    }

    onRriceRangeChange() {

    }
    onCloseDrawer=()=>{
        let {doOpenChange}=this.props;
        if(doOpenChange){
            doOpenChange(false);
        }
    }
    render() {
        let { daterange } = this.state;
        return (<Flex direction="column" align="stretch">
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
                {PriceRange.map((i, k) => (
                    <Item key={"price-range-" + k}>
                        <div style={{ position: 'relative', top: '-0.14rem', marginTop: ".14rem", marginBottom: ".14rem" }}>
                            <p style={{ margin: ".1rem" }}>{i.name}</p>
                            <RangeWithTooltip
                                min={5}
                                max={25}
                                defaultValue={i.range}
                                onChange={e => console.log(e)}
                            />
                        </div>
                    </Item>
                ))}
            </List>
            <WhiteSpace size="lg" />
        </Flex>)
    }
}

export default componentName