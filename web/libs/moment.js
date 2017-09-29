import moment from 'moment';

moment.locale('zh-cn');

window.moment = moment;
const YMD = "YYYY-MM-DD";
const YM = "YYYYMM";

function getNearbyDays(date, duration=-10000) {
    if (typeof duration === "number") {
        let minDate = moment(date[0]).format(YMD),
            maxDate = moment(date[date.length - 1]).format(YMD);
        let dateArr = [];
        if (duration < -999) {
            //全部
            for (let i = 0; true; i++) {
                let n = moment(minDate).add(i, "days").format(YMD);
                dateArr.push(n);
                if (n === maxDate) {
                    break;
                }
            }
        } else {
            for (let i = 0; i > duration; i--) {
                let n = moment().add(i, "days").format(YMD);
                dateArr.unshift(n);
                if (n === minDate) {
                    break;
                }
            }
        }
        return dateArr;
    }
    return date;
}
function getNearbyMonths() {
    let list = [];
    for (let i = 0; i > -12; i--) {
        list.unshift(moment().add(i, "months").format(YM));
    }
    return list;
}
function getToday() {
    return moment().format(YMD);
}
function getThisMonth() {
    return moment().format(YM);
}

export default moment;
export {
    getToday,
    getThisMonth,
    getNearbyDays,
    getNearbyMonths
}
