///////////////////////////////////////////////////////////////////////////////
//                                   Task 6                                  //
///////////////////////////////////////////////////////////////////////////////
// Write function that translates a text to Pig Latin and
// back. English is translated to Pig Latin by taking the first letter
// of every word, moving it to the end of the word and adding
// ‘ay’. “The quick brown fox” becomes “Hetay uickqay rownbay oxfay”.
///////////////////////////////////////////////////////////////////////////////

// przesuwa 1 litere na koniec slowa (wytnij i wklej)
// zalozenie: slowo sklada sie z samych liter
function mvFirstLetToEnd(word: string): string {
    // String.slice() jesli tylko start index, to end index = String.length
    return word.slice(1) + word[0];
}

// substitute of python's capitalize
// https://www.w3schools.com/python/ref_string_capitalize.asp
function capitalize(word: string): string {
    // String.slice() jesli tylko start index, to end index = String.length
    return word[0].toUpperCase() + word.slice(1).toLocaleLowerCase();
}

// zalozenie: zdanie zlozone z samych liter
// brak obslugi imion, nazw wlasnych
function pigLatinize(sentence: string): string {
    let words: Array<string> = sentence.split(" ");
    let latWords: Array<string> = [];
    for (let i = 0; i < words.length; i++) {
        let word: string = mvFirstLetToEnd(words[i]) + "ay";
        if (i === 0) {
            latWords.push(capitalize(word));
        } else {
            latWords.push(word);
        }
    }
    return latWords.join(" ");
}

let sentence1: string = "ala ma kota";
let sentence2: string = "The quick brown fox";
let latSentence1: string = pigLatinize(sentence1);
let latSentence2: string = pigLatinize(sentence2);
console.log("Pig latenizing:", sentence1, "=>", latSentence1);
console.log("Pig latenizing:", sentence2, "=>", latSentence2);
console.log("============");

function mvLastLetToFront(word: string): string {
    // String.slice() -1, tzn. ost od konca (jak w pythonie)
    return word.slice(-1) + word.slice(0, -1);
}

function dePigLatWord(word: string): string {
    return mvLastLetToFront(word.slice(0, -2));
}

// zalozenie: zdanie zlozone z samych liter
// brak obslugi imion, nazw wlasnych
function dePigLatinize(sentence: string): string {
    let words: Array<string> = sentence.split(" ");
    let deLatWords: Array<string> = [];
    for (let i = 0; i < words.length; i++) {
        let word: string = dePigLatWord(words[i]);
        if (i === 0) {
            deLatWords.push(capitalize(word));
        } else {
            deLatWords.push(word);
        }
    }
    return deLatWords.join(" ");
}

let deLatSentence1: string = dePigLatinize(latSentence1);
let deLatSentence2: string = dePigLatinize(latSentence2);

console.log("Delatenizing:", latSentence1, "=>", deLatSentence1);
console.log("Delatenizing:", latSentence2, "=>", deLatSentence2);
