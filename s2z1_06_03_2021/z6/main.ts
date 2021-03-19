///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import PigLatenizer from "./pigLatinizer";


///////////////////////////////////////////////////////////////////////////////
//                              zmienne globalne                             //
///////////////////////////////////////////////////////////////////////////////
const normSent1: string = "ala ma kota";
const normSent2: string = "The quick brown fox";
const pigLat: PigLatenizer = new PigLatenizer();
let latSent1: string = pigLat.getLatSentence(normSent1);
let latSent2: string = pigLat.getLatSentence(normSent2);
let deLatSent1: string = pigLat.getDeLatSentence(latSent1);
let deLatSent2: string = pigLat.getDeLatSentence(latSent2);


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
function main(): void {

    console.log("Pig latenizing:", normSent1, "=>", latSent1);
    console.log("Pig latenizing:", normSent2, "=>", latSent2);
    console.log("============");

    console.log("Delatenizing:", latSent1, "=>", deLatSent1);
    console.log("Delatenizing:", latSent2, "=>", deLatSent2);
    console.log("============");
    console.log("That's it. Goodbye");
}


///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
main();
