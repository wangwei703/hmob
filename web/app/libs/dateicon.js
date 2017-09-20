import d01Svg from 'app/svg/d01.svg';
import d02Svg from 'app/svg/d02.svg';
import d03Svg from 'app/svg/d03.svg';
import d04Svg from 'app/svg/d04.svg';
import d05Svg from 'app/svg/d05.svg';
import d06Svg from 'app/svg/d06.svg';
import d07Svg from 'app/svg/d07.svg';
import d08Svg from 'app/svg/d08.svg';
import d09Svg from 'app/svg/d09.svg';
import d10Svg from 'app/svg/d10.svg';
import d11Svg from 'app/svg/d11.svg';
import d12Svg from 'app/svg/d12.svg';
import d13Svg from 'app/svg/d13.svg';
import d14Svg from 'app/svg/d14.svg';
import d15Svg from 'app/svg/d15.svg';
import d16Svg from 'app/svg/d16.svg';
import d17Svg from 'app/svg/d17.svg';
import d18Svg from 'app/svg/d18.svg';
import d19Svg from 'app/svg/d19.svg';
import d20Svg from 'app/svg/d20.svg';
import d21Svg from 'app/svg/d21.svg';
import d22Svg from 'app/svg/d22.svg';
import d23Svg from 'app/svg/d23.svg';
import d24Svg from 'app/svg/d24.svg';
import d25Svg from 'app/svg/d25.svg';
import d26Svg from 'app/svg/d26.svg';
import d27Svg from 'app/svg/d27.svg';
import d28Svg from 'app/svg/d28.svg';
import d29Svg from 'app/svg/d29.svg';
import d30Svg from 'app/svg/d30.svg';
import d31Svg from 'app/svg/d31.svg';
import daySvg from 'app/svg/day.svg';

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
