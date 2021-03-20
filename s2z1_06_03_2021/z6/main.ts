///////////////////////////////////////////////////////////////////////////////
//                                  importy                                  //
///////////////////////////////////////////////////////////////////////////////
import PigLatinizer from "./pigLatinizer";
import PigDelatinizer from "./pigDelatinizer";


///////////////////////////////////////////////////////////////////////////////
//                              zmienne globalne                             //
///////////////////////////////////////////////////////////////////////////////
const origSent1: string = "ala ma kota";
const origSent2: string = "The quick brown fox";

const pigLat: PigLatinizer = new PigLatinizer();
const pigDelat: PigDelatinizer = new PigDelatinizer();

const latSent1: string = pigLat.getLatSentence(origSent1);
const latSent2: string = pigLat.getLatSentence(origSent2);

const deLatSent1: string = pigDelat.getDeLatSentence(latSent1);
const deLatSent2: string = pigDelat.getDeLatSentence(latSent2);


///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
function main(): void {

    console.log("Pig latenizing:", origSent1, "=>", latSent1);
    console.log("Pig latenizing:", origSent2, "=>", latSent2);
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
