///////////////////////////////////////////////////////////////////////////////
//                                   Task 6                                  //
///////////////////////////////////////////////////////////////////////////////
// Write function that translates a text to Pig Latin and
// back. English is translated to Pig Latin by taking the first letter
// of every word, moving it to the end of the word and adding
// ‘ay’. “The quick brown fox” becomes “Hetay uickqay rownbay oxfay”.
///////////////////////////////////////////////////////////////////////////////

// przesuwa 1 litere na koniec slowa (wytnij i wklej)
// zalozenie slowo sklada sie z samych liter
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

// zalozenie zdanie zlozone z samych liter
function pigLatinize(text: string): string {
    let words: Array<string> = text.split(" ");
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

console.log(pigLatinize("ala ma kota"));
console.log(pigLatinize("The quick brown fox"));
