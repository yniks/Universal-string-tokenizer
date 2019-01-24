"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortMap(map) {
    if (map.isSorted)
        return map;
    var keys = [...map.keys()];
    var result = new Map;
    keys.sort((a, b) => a - b).forEach(key => result.set(key, map.get(key)));
    result.isSorted = true;
    return result;
}
//get region (maximum) covered by a tagged location
function getCoveredRegion(tokens) {
    var maximum = 0;
    /**
     * PTR: there a zero length tokens too
     */
    for (let each of tokens) {
        if (each.code.length > maximum)
            maximum = each.code.length;
    }
    return maximum;
}
/**
 * T find the `length` of the `gapped region` between the two `tagged tokkens`
 * @param first tagged list of tokens
 * @param x2 start `position` of `second` tagg.
 */
function Gap(x1, x2, first) {
    /**
     * CHECKED:works for non empty tags
     * CHECKED:works for empty tags
     */
    /**
     * Assuming valid data
     */
    var region1 = getCoveredRegion(first);
    var distance = x2 - x1; //distance between `starting points` of the tags
    return distance - region1;
}
function getEmptySlot(record) {
    let sequence = [...sortMap(record)].map(item => item[1]);
    let each, emptySlots = [];
    for (each in sequence) {
        if ((Number(each) + 1) >= sequence.length)
            continue;
        let current = sequence[each];
        let nextpos = sequence[Number(each) + 1][0].pos; //FIXME:each+1 may get out of range
        //if(next[0].pos<current[0].x)continue;//line ended
        let gap = Gap(current[0].pos, nextpos, current);
        let gapcode = '', i = 0;
        while (i++ < gap)
            gapcode += ' ';
        if (gap > 0) {
            let endofCurrentCoverage = getCoveredRegion(current);
            emptySlots.push([
                {
                    name: 'UNKNOWN',
                    code: gapcode,
                    pos: current[0].pos + endofCurrentCoverage,
                    x: current[0].x + endofCurrentCoverage,
                    y: current[0].y
                }
            ]);
        }
    }
    return emptySlots;
}
function addRecord({ index, match, name, line, pos }) {
    if (this.ignore.has(name))
        return false;
    if (!this.record.get(pos))
        this.record.set(pos, []);
    this.record.get(pos).push({
        name,
        code: match,
        pos: pos,
        x: index,
        y: line
    });
    return true;
}
function finish() {
    let emptySlots = getEmptySlot(this.record);
    emptySlots.forEach(token => {
        this.record.set(token[0].pos, token);
    });
    this.record = sortMap(this.record);
    this.finished = true;
    return this.record;
}
function SRMFactory() {
    return {
        finished: false,
        ignore: new Set,
        record: new Map,
        addRecord,
        finish
    };
}
exports.SRMFactory = SRMFactory;
