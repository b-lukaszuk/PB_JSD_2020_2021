///////////////////////////////////////////////////////////////////////////////
//                                   Task 3                                  //
///////////////////////////////////////////////////////////////////////////////
// Write a function that rotates a list by k elements.
// For example [1, 2, 3, 4, 5, 6] rotated by two becomes
// [3, 4, 5, 6, 1, 2].
// Try solving this without creating a copy of the list.
///////////////////////////////////////////////////////////////////////////////

let listOfNums: Array<number> = [1, 2, 3, 4, 5, 6];
const shiftBy: number = 2;

// moves first elt of a list to its end
// bez podejscia funkcyjnego, zmiana listOfNums INPLACE
function moveFirstEltToEnd(): void {
    // [0], bo array.splice() zwraca usun. elt-y jako liste
    let movedElt: number = listOfNums.splice(0, 1)[0];
    listOfNums.splice(listOfNums.length, 1, movedElt);
}

// bez podejscia funkcyjnego, zmiana listOfNums INPLACE
function shiftByKelts(k: number): void {
    for (let i = 0; i < k; i++) {
        moveFirstEltToEnd();
    }
}

console.log("starting list", listOfNums);
shiftByKelts(shiftBy)
console.log("after shifting by", shiftBy);
console.log("final list", listOfNums);
