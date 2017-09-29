import Community from "./cfg";
import doStat from './stat';

function padStart(num) {
    if (num < 10)
        return `0${num}`;
    return `${num}`;
}
let dateComm = {
    now() {
        return new Date();
    },
    getYMD(date) {
        date = date || this.now();
        let y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate();
        return [y, m, d];
    },
    formatYMD(date) {
        date = date || this.now();
        let [y, m, d] = this.getYMD(date);
        return `${y}-${padStart(m)}-${padStart(d)}`;
    },
    formatYM(date) {
        date = date || this.now();
        let [y, m] = this.getYMD(date);
        return `${y}${padStart(m)}`;
    },
    today() {
        return this.formatYMD();
    },
    mon() {
        return this.formatYM();
    }
}

function formatToday(json, comm) {
    let data = [],
        todayStr = dateComm.today(),
        [y, m, d] = dateComm.getYMD();
    if (typeof json === "object") {
        if (json.date === todayStr) {
            if (Array.isArray(json.data)) {
                let list = json.data.filter(d => d.c === comm);
                data = list.map(item => ({
                    s: item.s,
                    a: item.a,
                    p: item.p
                }))
            }
        }
    }
    return { d, data };
}
function formatEveryDay(list, comm) {
    if (Array.isArray(list)) {
        let day = list.filter(h => h.c === comm);
        return day.map(d => ({
            s: d.s,
            a: d.a,
            q: d.q
        }));
    }
    return [];
}
function formatThisMonth(json, comm) {
    let data = [],
        monStr = dateComm.mon(),
        [y, m, d] = dateComm.getYMD();
    if (typeof json === "object") {
        if (json.mon === monStr) {
            if (Array.isArray(json.data)) {
                let list = json.data.filter(d => d.c === comm);
                data = list.map(item => ({
                    s: item.s,
                    a: item.a,
                    p: item.p
                }))
            }
        }
    }
    return { m, data };
}
function formatEveryMonth(list, comm) {
    if (Array.isArray(list)) {
        let month = list.filter(h => h.c === comm);
        return month.map(m => ({
            s: m.s,
            t: m.t
        }));
    }
    return [];
}

function formatTrend(list, comm) {
    if (Array.isArray(list)) {
        let commTrend = list.find(h => h.c === comm);
        if (commTrend && Array.isArray(commTrend.data))
            return commTrend.data;
    }
    return [];
}

function filter(houseList) {
    return houseList;
}

export default houseList => {
    let json=doStat(houseList);
    let data = [];
    Community.forEach(c => {
        let today = formatToday(json.today, c.key),
            everyday = formatEveryDay(json.everyday, c.key),
            thismon = formatThisMonth(json.thismonth, c.key),
            everymon = formatEveryMonth(json.everymon, c.key),
            trend = formatTrend(json.trend, c.key);
        data.push({
            date: json.date,
            mons: json.mons,
            source: json.source,
            name: c.name,
            today,
            // everyday,
            thismon,
            everymon,
            trend
        });
    });
    return data;
}