
const REG = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

function rgb2Hex(color) {
    if (/^(rgb|RGB)/.test(color)) {
        let aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        let strHex = "#";
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = color;
        }
        return strHex;
    } else if (REG.test(color)) {
        let aNum = color.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return color;
        } else if (aNum.length === 3) {
            let numHex = "#";
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum + aNum);
            }
            return numHex;
        }
    } else {
        return color;
    }
}

/*16进制颜色转为RGB格式*/
function hex2RGB(color, alpha = 1) {
    let sColor = color.toLowerCase();
    if (sColor && REG.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        if (alpha === 1) {
            return `rgb(${sColorChange.join(",")}`;
        } else {
            return `rgba(${sColorChange.join(",")},${alpha})`;
        }
    } else {
        return sColor;
    }
}
function hex2RGBA(color,alpha){
    return hex2RGB(color,alpha)
}
export { rgb2Hex, hex2RGB,hex2RGBA }