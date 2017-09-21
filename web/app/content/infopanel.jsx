import React, { Component, PropTypes } from 'react'

import { Icon } from 'antd-mobile';
import { chartColors } from 'libs/echarts';
import lineSvg from 'svg/line.svg';
import monthSvg from 'svg/month.svg';
import todaySvg from 'svg/today.svg';

class componentName extends Component {
    format(data) {
        if (data) {
            let v = "--", p = "--", p_cls = "";
            if (typeof data.a === "number") {
                v = `${data.a}￥`;
            } else {
                p = ""
            }
            if (typeof data.p === "number") {
                p_cls = data.p < 0 ? "down" : "";
                p = `${data.p}%`;
            }
            return [v, p, p_cls];
        } else {
            return ["", "", ""];
        }
    }
    formatTrend(data){
        if(data&&Array.isArray(data.slr)&&data.slr.length===2){
            let slr=data.slr[1];
            if(typeof slr==="number"){
                slr=Math.round(slr*100)/100
                let cls ="",val=slr;
                if(slr<0){
                    cls="down";
                }else{
                    val="+"+slr;
                }
                return [val,cls];
            }
        }
        return ["",""];
    }
    renderContent(idx) {
        let { rptdata } = this.props;
        console.log(rptdata);
        let color = chartColors[idx],
            source = rptdata.source[idx],
            trend=rptdata.trend.find(d => d.s === source.k),
            today = rptdata.today.data.find(d => d.s === source.k),
            thismon = rptdata.thismon.data.find(d => d.s === source.k);
        let [dv, dp, dp_cls] = this.format(today);
        let [mv, mp, mp_cls] = this.format(thismon);
        let [tv,tv_cls]=this.formatTrend(trend)
        let content = [
            <div key={idx+"-1"} className="infopanel-cell infopanel-title" style={{ color }}>{source.n}</div>,
            <div key={idx+"-2"} className="infopanel-cell price">
                {dv}
                <span className={"rate " + dp_cls}>
                    {dp}
                </span>
            </div>,
            <div key={idx+"-3"} className="infopanel-cell price">
                {mv}
                <span className={"rate " + mp_cls}>
                    {mp}
                </span>
            </div>,
            <div key={idx+"-4"} className={"infopanel-cell price "+tv_cls}>
                {tv}
            </div>
        ];

        return content;
    }
    render() {
        return (
            <div className="infopanel">
                <div className="infopanel-left">
                    {this.renderContent(0)}
                </div>
                <div className="infopanel-middle">
                    <div className="infopanel-cell"></div>
                    <div className="infopanel-cell"><Icon type={todaySvg} size="xs" /></div>
                    <div className="infopanel-cell"><Icon type={monthSvg} size="xs" /></div>
                    <div className="infopanel-cell"><Icon type={lineSvg} size="xs" /></div>
                </div>
                <div className="infopanel-right">
                    {this.renderContent(1)}
                </div>
            </div>
        )
    }
}

componentName.propTypes = {

}

export default componentName