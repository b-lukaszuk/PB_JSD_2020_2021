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
let latSent1: string = ""; // zmienane w main()
let latSent2: string = ""; // zmieniane w main()
let deLatSent1: string = ""; // zmienane w main()
let deLatSent2: string = ""; // zmieniane w main()


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
function main(): void {

    latSent1 = pigLat.getLatSentence(normSent1);
    latSent2 = pigLat.getLatSentence(normSent2);
    deLatSent1 = pigLat.getDeLatSentence(latSent1);
    deLatSent2 = pigLat.getDeLatSentence(latSent2);

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
