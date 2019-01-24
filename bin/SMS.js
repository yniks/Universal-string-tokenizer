"use strict";
/**
 * this is LEVEL: MIDDLE MODULE OF THE TOKENIZER MACHINE
 *  LEVEL MIDDLE (CLASS SMS):
 *                 1. INPUT ONE STRING, PATTERS ARRAY, ONMATCH CB
 *                 2. PASS EACH STRING WITH EACH PATTERN AND ONMATCH TO SEARCH SERVICE(LEVEL BOTTOM)
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const SearchService_1 = require("./SearchService");
function SMS({ string, patterns, onmatch }) {
    try {
        for (let pattern of patterns) {
            SearchService_1.SearchService({ string, pattern, onmatch });
        }
    }
    finally {
    }
}
exports.SMS = SMS;
