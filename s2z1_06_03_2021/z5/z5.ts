///////////////////////////////////////////////////////////////////////////////
//                                   Task 5                                  //
///////////////////////////////////////////////////////////////////////////////
// Write a code that takes a number/string and returns a list of its
// digits. So for 2342 it should return [2,3,4,2].’A243b’ -> [2,4,3].
///////////////////////////////////////////////////////////////////////////////


function getNumsFromString(text: string): Array<number> {
    let tabOfChars: Array<string> = text.split("");
    let tabOfInts: Array<number> = tabOfChars.map((c) => parseInt(c));
    return tabOfInts.filter((num) => !isNaN(num));
}

const str1 = "2342";
const str2 = "A243b";

console.log("digits from", str1, "are:", getNumsFromString(str1));
console.log("digits from", str2, "are:", getNumsFromString(str2));

