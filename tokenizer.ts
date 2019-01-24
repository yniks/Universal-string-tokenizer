/**
 * this is LEVEL:TOPMOST MODULE OF THE TOKENIZER MACHINE
 *    LEVEL TOPMOST(CLASS TOKENZER):
 *                1.  INPUT FILE (MULTILINE STRING) AND PATTERN FILE,
 *                2. PASS EACH STRING WITH ALL PATTERNS TO LEVEL MIDDLE
 *      
 */
import {SMS} from './SMS'
import {SRMFactory} from './SRM'
type pattern={reg:string,name:string}
type patterns={[name:string]:string}
interface token
{
    name:string,
    code:string,
    pos:number
    x:number,
    y:number
}
interface SRM
{
    addRecord(this:SRM,{index,match,name,line,pos}:{index:number,match:string,name:string,line:number,pos:number}):any,
    finish():any
    ignore:Set<string>
    record:Map<number,token[]>
    finished:boolean
}
interface tokenizer
{
    SRM:SRM
    SMS({string,patterns,onmatch}:{string:string,patterns:pattern[],onmatch:{(index:number,match:string,name:string):any}}):any,
    tokenizer():token[]
}
let specialTokens=[
    {reg:'EOL',name:'EOL'},
    {reg:'SOL',name:'SOL'},
    {reg:'EOF',name:'EOF'},
    {reg:'SOF',name:'SOF'},
]
function tokenizer({file,patterns}:{file:string,patterns:patterns},SRM:SRM,SMS:SMS)
{
    var lines=file.split('\n');
    let linenum=0,pos=0,previndex=0,posByLine=0
    let allPAtterns=Object.keys(patterns).map(key=>({reg:patterns[key],name:key})).concat(specialTokens)
    var onmatch=(index:number,match:string,name:string):any=>
    { 
        pos+=index-previndex
        previndex=index
        SRM.addRecord(
            {
                index,
                match,
                name,
                line:linenum,
                pos
            }
        )
       
    }
    for(let line of lines)
    {
        SMS({string:line,patterns:allPAtterns,onmatch})
        linenum++;
        previndex=0
        posByLine+=line.length+1
        pos=posByLine
    }
    return SRM.finish()
}
export function tokenizerFactory()
{
    var srm=SRMFactory();
    return {
        tokenize:(arg :{ file: string; patterns: patterns; })=>tokenizer(arg,srm,SMS)
    }
}