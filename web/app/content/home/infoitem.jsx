import React, { Component, PropTypes } from 'react'

import {chartColors} from 'app/libs/echarts';

class componentName extends Component {
    format(data) {
        let v = "--", p = "--", p_cls = "";
        if (typeof data.v === "number") {
            v = `${data.v}￥`;
        }else{
            p=""
        }
        if (typeof data.p === "number") {
            p_cls = data.p < 0 ? "down" : "";
            p = `${Math.floor(data.p * 10000) / 100}%`;
        }
        return [v, p, p_cls];
    }
    renderContent(arr) {
        let content = [];
        if (Array.isArray(arr)) {
            content = arr.map((item, _idx) => {
                let [dv, dp, dp_cls] = this.format(item.day);
                let [mv, mp, mp_cls] = this.format(item.mon);
                return <div key={_idx} className="infopanel-item" style={{color:chartColors[_idx]}}>
                    <div className="infopanel-item-column">
                        {item.name}
                    </div>
                    <div className="infopanel-item-column price">
                        {dv}
                        <span className={"rate " + dp_cls}>
                            {dp}
                        </span>
                    </div>
                    <div className="infopanel-item-column price">
                        {mv}
                        <span className={"rate " + mp_cls}>
                            {mp}
                        </span>
                    </div>
                </div>
            });
        }
        return content;
    }
    render() {
        let { rptdata } = this.props;
        return (
            <div className="infopanel">
                {this.renderContent(rptdata)}
            </div>
        )
    }
}

componentName.propTypes = {

}

export default componentName