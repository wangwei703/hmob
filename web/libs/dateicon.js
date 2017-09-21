import d01Svg from 'svg/d01.svg';
import d02Svg from 'svg/d02.svg';
import d03Svg from 'svg/d03.svg';
import d04Svg from 'svg/d04.svg';
import d05Svg from 'svg/d05.svg';
import d06Svg from 'svg/d06.svg';
import d07Svg from 'svg/d07.svg';
import d08Svg from 'svg/d08.svg';
import d09Svg from 'svg/d09.svg';
import d10Svg from 'svg/d10.svg';
import d11Svg from 'svg/d11.svg';
import d12Svg from 'svg/d12.svg';
import d13Svg from 'svg/d13.svg';
import d14Svg from 'svg/d14.svg';
import d15Svg from 'svg/d15.svg';
import d16Svg from 'svg/d16.svg';
import d17Svg from 'svg/d17.svg';
import d18Svg from 'svg/d18.svg';
import d19Svg from 'svg/d19.svg';
import d20Svg from 'svg/d20.svg';
import d21Svg from 'svg/d21.svg';
import d22Svg from 'svg/d22.svg';
import d23Svg from 'svg/d23.svg';
import d24Svg from 'svg/d24.svg';
import d25Svg from 'svg/d25.svg';
import d26Svg from 'svg/d26.svg';
import d27Svg from 'svg/d27.svg';
import d28Svg from 'svg/d28.svg';
import d29Svg from 'svg/d29.svg';
import d30Svg from 'svg/d30.svg';
import d31Svg from 'svg/d31.svg';
import daySvg from 'svg/day.svg';

const icons=[daySvg,d01Svg,d02Svg,d03Svg,d04Svg,d05Svg,d06Svg,d07Svg,d08Svg,d09Svg,d10Svg,d11Svg,d12Svg,d13Svg,d14Svg,d15Svg,d16Svg,d17Svg,d18Svg,d19Svg,d20Svg,d21Svg,d22Svg,d23Svg,d24Svg,d25Svg,d26Svg,d27Svg,d28Svg,d29Svg,d30Svg,d31Svg];
function loadDateNumberIcon(number) {
    return icons[number]||icons[0];
}

export default loadDateNumberIcon;
function loadDayIcon() {
    let now = new Date(),
        day = now.getDate();
    return loadDateNumberIcon(day);
}
function loadMonthIcon() {
    let now = new Date(),
        mon = now.getMonth() + 1;
    return loadDateNumberIcon(mon);
}
export { loadDayIcon, loadMonthIcon };
