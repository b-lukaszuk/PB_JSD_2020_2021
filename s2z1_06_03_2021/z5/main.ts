///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import NumsExtractor from "./classes/numsExtractor";


///////////////////////////////////////////////////////////////////////////////
//                              zmienne globalne                             //
///////////////////////////////////////////////////////////////////////////////
const str1: string = "2342";
const str2: string = "A243b";
const numsExtr: NumsExtractor = new NumsExtractor();


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                   //
///////////////////////////////////////////////////////////////////////////////
function main(): void {
    console.log("digits from", str1, "are:", numsExtr.getNumsFromString(str1));
    console.log("digits from", str2, "are:", numsExtr.getNumsFromString(str2));
}


///////////////////////////////////////////////////////////////////////////////
//                             wykonanie progaamu                           //
///////////////////////////////////////////////////////////////////////////////
main();

