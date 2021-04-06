///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
import OverlapDetector from "./classes/overlapDetector";

///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
const overDet: OverlapDetector = new OverlapDetector();
const pairsOfWords = [
    [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Pellentesque aliquet ni et urna venenatis. Dolor at pulvo ni soda.",
    ],
    ["karol", "rolki"],
    ["rak", "kajak"],
    ["medicine", "house med. dr"],
    ["ala", "emu"],
    ["ala", ""],
];

///////////////////////////////////////////////////////////////////////////////
//                           functions definitions                           //
///////////////////////////////////////////////////////////////////////////////
function declareOverlap(twoWords: Array<string>): void {
    let [wordA, wordB] = twoWords;
    console.log("===");
    console.log("Comparing: <<", wordA, ">> & <<", wordB, ">> for overlap");
    console.log("result:", overDet.getOverlapString(wordA, wordB));
    console.log("===\n");
}

function main(): void {
    for (let i = 0; i < pairsOfWords.length; i++) {
        declareOverlap(pairsOfWords[i]);
    }

    console.log("That's all. Goodbye!");
}

///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();
