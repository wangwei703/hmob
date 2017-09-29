import moment, {
    getNearbyDays,
    getNearbyMonths,
    getThisMonth,
    getToday
} from './moment';

import comm from "./cfg";
import ecStat from 'echarts-stat';
import getRules from './filterrules';

function isNumber(n) {
    return typeof n === "number" && !isNaN(n);
}

function filterPrice(list, range) {
    return list.filter(d => d[0] >= range[0] * 10000 && d[0] <= range[1] * 10000);
}
function calcAvg(list) {
    if (Array.isArray(list) && list.length > 0) {
        return Math.floor(ecStat.statistics.mean(list.map(i => i[0])));
    }
    return null;
}
function getAvgAndOther(list, day, cid, sid, filter) {
    let commData = list.find(l => l.k === cid);
    if (commData && Array.isArray(commData.l)) {
        let dayData = commData.l.find(l => l.d === day);
        if (dayData && Array.isArray(dayData.l)) {
            let sData = dayData.l.find(l => l.k === sid);
            if (sData && Array.isArray(sData.l) && sData.l.length > 0) {
                let list2 = filterPrice(sData.l, filter.pricerange[cid]);
                let price = list2.map(p => p[0]),
                    avg = calcAvg(list2);
                if (isNumber(avg))
                    return { avg, length: list2.length, price };
            }
        }
    }
    return { avg: null, length: 0, price: [] };
}
function getDateList(date, range) {
    return getNearbyDays(date, range)
}

function statPreMonth(mtrendList, thismonth, cid, sid) {
    let mtrend = mtrendList.find(mt => mt.src === sid && mt.k === cid);
    if (mtrend && mtrend.t) {
        let md = mtrend.t[thismonth];
        md = parseInt(md, 10);
        if (isNumber(md))
            return md;
    }
    return;
}
function statToday(list, today, cid, sid, filter) {
    return getAvgAndOther(list, today, cid, sid, filter).avg;
}
function statEveryday(list, date, cid, sid, filter) {
    return date.map(d => getAvgAndOther(list, d, cid, sid, filter));
}
function statWeekPriceDistribution(list, date, cid, sid, filter) {
    let price = date.map(d => getAvgAndOther(list, d, cid, sid, filter).price);
    let newPrice = [];
    price.forEach(p => {
        newPrice.push(...p);
    });
    if (newPrice.length > 0)
        return ecStat.histogram(newPrice).data;//sturges
    return [];
}

function statEverydayTrend(list) {
    let data = [], x = 0;
    list.forEach(d => {
        if (isNumber(d.avg)) {
            data.push([x++, d.avg]);
        }
    });
    let myRegression = ecStat.regression('linear', data),
        gradient = myRegression.parameter.gradient;
    gradient = Math.round(gradient * 100) / 100;
    return {
        v: gradient,
        data: [[{
            coord: myRegression.points[0],
            symbol: 'none'
        }, {
            coord: myRegression.points[myRegression.points.length - 1],
            symbol: 'none'
        }]]
    }
}
function statEverymonth(mtrend, month, cid, sid) {
    return month.map(m => statPreMonth(mtrend, m, cid, sid));
}
//统计 入口函数
//小区id,data
function main(cid, props) {
    let { data, mtrend, source, filter, date, month, today, thismonth, weekDays } = props;
    return source.map(s => {
        let [sid, sname] = s;
        let thismondata = statPreMonth(mtrend, thismonth, cid, sid),
            todaydata = statToday(data, today, cid, sid, filter),
            everyday = statEveryday(data, date, cid, sid, filter),
            everydayTrend = statEverydayTrend(everyday),
            everymonthdata = statEverymonth(mtrend, month, cid, sid),
            weekPriceDistribution = statWeekPriceDistribution(data, date, cid, sid, filter);
        return {
            sid,
            sname,
            data: {
                thismondata,
                todaydata,
                everyday,
                everydayTrend,
                everymonthdata,
                weekPriceDistribution
            }
        }
    })
}
export default data => {
    let filterRules = getRules();
    let dateList = getDateList(data.date, filterRules.daterange),
        weekDays = getDateList(data.date, -7),
        monthList = getNearbyMonths(),
        today = getToday(),
        thismonth = getThisMonth(),
        source = Object.entries(data.source);//[["ajk", "安居客"],……];
    let result = [];
    comm.forEach(c => {
        result.push({
            data: main(c.key, {
                data: data.list,
                mtrend: data.monthtrend,
                source,
                filter: filterRules,
                date: dateList,
                month: monthList,
                today,
                thismonth,
                weekDays
            }),
            key: c.key,
            name: c.name,
            dateList,
            monthList
        });
    });
    return result;
}

