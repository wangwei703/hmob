import PriceRange, { DateRange } from './cfg';

const STORAGE_KEY = "filter-rules";
function readRules() {
    let rules = localStorage.getItem(STORAGE_KEY);
    if (rules) {
        try {
            return JSON.parse(rules);
        } catch (e) {
            return null;
        }
    }
    return null;
}
function saveRules(rules) {
    if (rules) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
    } else {
        localStorage.removeItem(STORAGE_KEY);
    }
}
function getRules() {
    let rules = readRules(),
        daterange = DateRange[0].value,
        pricerange = {};
    PriceRange.forEach(p => {
        pricerange[p.key] = p.range;
    });
    if (rules) {
        if (!DateRange.find(r => r.value === rules.daterange)) {
            rules.daterange = daterange;
        }
        if (rules.pricerange) {
            PriceRange.forEach(p => {
                let item=rules.pricerange[p.key];
                if(!Array.isArray(item)||item.length!==2){
                    rules.pricerange[p.key]=p.range;
                }
            });
        } else {
            rules.pricerange = pricerange;
        }
        return rules;
    } else {
        return {
            daterange,
            pricerange
        }
    }
}

export default getRules;
export {saveRules};