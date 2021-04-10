///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
import Palindrom from "./classes/palindrom";

///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
const palindrom: Palindrom = new Palindrom();
const words: Array<string> = [
    "karakis",
    "baerren",
    "kajak",
    "inni",
    "sedes",
    "axy",
    "",
];

///////////////////////////////////////////////////////////////////////////////
//                           functions definitions                           //
///////////////////////////////////////////////////////////////////////////////
/**
 * tests for longest palindrom in the word
 * declares it in the console
 */
function declarePalindrom(word: string): void {
    console.log("===");
    console.log("Searching for the first longest palindrome in: <<",
        word, ">>");
    console.log("result:", palindrom.getLongestPalindrome(word));
    console.log("===\n");
}

function main() {
    words.forEach((word: string) => {
        declarePalindrom(word);
    });
    console.log("That's all. Goodbye!");
}

///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();
