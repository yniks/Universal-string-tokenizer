/**
 * TOKENIZER METHODOLOGY:
 *      LEVEL TOPMOST(CLASS TOKENZER):
 *                1.  INPUT FILE AND PATTERN FILE,
 *                2. PASS EACH STRING WITH ALL PATTERNS TO LEVEL MIDDLE
 *      LEVEL MIDDLE (CLASS SMS):
 *                 1. INPUT ONE STRING, PATTERS ARRAY, ONMATCH CB
 *                 2. PASS EACH STRING WITH EACH PATTERN AND ONMATCH TO SEARCH SERVICE(LEVEL BOTTOM)
 *      LEVEL BOTOTM (CLASS SS):
 *                  1. INPUT ONE STRING, ONE PATTERN, ONMATCH CB
 */

/**
 * SMS: SEARCH MANAGEMENTS SERVICE
 *      THIS IS SECOND LEVEL SEARICE MAMANGEMENT SERVICE, BELOW 
 */

/**
 * THESE FUNCTIONS ARE STATESS ACROSS DEFERENT LINES
 */
type pattern={reg:string,name:string}
function isSpecialPattern(pattern:pattern,onmatch:{(index:number,match:string,name:string):any},string:string)
{   
      switch(pattern.reg)
        {
            case 'EOL':{
                onmatch(string.length,'\n',pattern.name)
            };break;
            case "SOL":{
                onmatch(-1,'\n',pattern.name)
            };break;
            default: return  false
        }
        return true;
}
export function SearchService({string,onmatch,pattern}:{string:string,onmatch:{(index:number,match:string,name:string):any},pattern:pattern})
{
    if(isSpecialPattern(pattern,onmatch,string))return true;
    var regex=RegExp(pattern.reg,'g');
    var success=false
    var match;
    //check
    var lastindexStuckedat = 0;
    while ((match = regex.exec(string)) != null) {
        success=true
        onmatch(match.index, match[0],pattern.name);
        if (regex.lastIndex == lastindexStuckedat)return true; //index got stucked
        lastindexStuckedat = regex.lastIndex;
    }
        return success;
}