/**
 * this is LEVEL: MIDDLE MODULE OF THE TOKENIZER MACHINE
 *  LEVEL MIDDLE (CLASS SMS):
 *                 1. INPUT ONE STRING, PATTERS ARRAY, ONMATCH CB
 *                 2. PASS EACH STRING WITH EACH PATTERN AND ONMATCH TO SEARCH SERVICE(LEVEL BOTTOM)
 *      
 */

import {SearchService} from './SearchService'
type pattern={reg:string,name:string}
export function SMS({string,patterns,onmatch}:{string:string,patterns:pattern[],onmatch:{(index:number,match:string):any}})
{
    try
    {
        for(let pattern of patterns)
        {
            SearchService({string,pattern,onmatch})
        }
    }
}