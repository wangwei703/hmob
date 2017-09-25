const COMM = {
    "ajk": "安居客",
    "fccs": "房产超市"
}

function getName(key) {
    return COMM[key] || key;
}
export { getName }