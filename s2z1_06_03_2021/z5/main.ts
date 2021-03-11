///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import NumsExtractor from "./numsExtractor";


///////////////////////////////////////////////////////////////////////////////
//                              zmienne globalne                             //
///////////////////////////////////////////////////////////////////////////////
const str1 = "2342";
const str2 = "A243b";
const numsExtr1: NumsExtractor = new NumsExtractor(str1);
const numsExtr2: NumsExtractor = new NumsExtractor(str2);


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                   //
///////////////////////////////////////////////////////////////////////////////
function main(): void {
    console.log("digits from", str1, "are:", numsExtr1.getNumsFromString(str1));
    console.log("digits from", str2, "are:", numsExtr2.getNumsFromString(str2));
}


///////////////////////////////////////////////////////////////////////////////
//                             wykonanie progaamu                           //
///////////////////////////////////////////////////////////////////////////////
main();
