"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * this is LEVEL:TOPMOST MODULE OF THE TOKENIZER MACHINE
 *    LEVEL TOPMOST(CLASS TOKENZER):
 *                1.  INPUT FILE (MULTILINE STRING) AND PATTERN FILE,
 *                2. PASS EACH STRING WITH ALL PATTERNS TO LEVEL MIDDLE
 *
 */
const SMS_1 = require("./SMS");
const SRM_1 = require("./SRM");
let specialTokens = [
    { reg: 'EOL', name: 'EOL' },
    { reg: 'SOL', name: 'SOL' },
    { reg: 'EOF', name: 'EOF' },
    { reg: 'SOF', name: 'SOF' },
];
function tokenizer({ file, patterns }, SRM, SMS) {
    var lines = file.split('\n');
    let linenum = 0, pos = 0, previndex = 0, posByLine = 0;
    let allPAtterns = Object.keys(patterns).map(key => ({ reg: patterns[key], name: key })).concat(specialTokens);
    var onmatch = (index, match, name) => {
        pos += index - previndex;
        previndex = index;
        SRM.addRecord({
            index,
            match,
            name,
            line: linenum,
            pos
        });
    };
    for (let line of lines) {
        SMS({ string: line, patterns: allPAtterns, onmatch });
        linenum++;
        previndex = 0;
        posByLine += line.length + 1;
        pos = posByLine;
    }
    return SRM.finish();
}
function tokenizerFactory() {
    var srm = SRM_1.SRMFactory();
    return {
        tokenize: (arg) => tokenizer(arg, srm, SMS_1.SMS)
    };
}
exports.tokenizerFactory = tokenizerFactory;
