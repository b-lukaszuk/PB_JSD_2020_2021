///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
let treasureMap: Array<Array<number>> = [
    [34, 21, 32, 41, 25],
    [14, 42, 43, 14, 31],
    [54, 45, 52, 42, 23],
    [33, 15, 51, 31, 35],
    [21, 52, 33, 13, 23],
]


///////////////////////////////////////////////////////////////////////////////
//                                 functions                                 //
///////////////////////////////////////////////////////////////////////////////
/**
 * takes number (2 digits), returns array [tens, units]
 * [tens, units] -> will serve as [rows, cols] but indexing
 * is 1 (incl) to 5 (incl), so it will subtract 1 from each field
 * @param {number} fieldValue number (Int) from the treasure map field
 * @returns {number[]} [tens, units] -> will serve as [rows, cols]
 */
function twoDigitNumToCoord(fieldValue: number): number[] {
    let numAsStr: string = String(fieldValue);
    let tens: number = parseInt(numAsStr[0]);
    let units: number = parseInt(numAsStr[1]);
    return [tens - 1, units - 1]; // in JS indexing
}

/**
 * searches for a treasure (traverses a map) and declares its actions
 * @param {number[][]} map treasure map in the format specified by the task
 */
function searchForTreasure(map: number[][]): void {
    // visited cells
    let visRow: number = 0;
    let visCol: number = 0;
    // next place to go (coordinates read from the map)
    let nextTrip: number[] = [];

    let clue: number = undefined; // clue from the place on map

    while (true) {
        console.log("Visiting [" + (visRow + 1) + ", " + (visCol + 1) + "]");
        clue = map[visRow][visCol];
        if (clue === ((visRow + 1) * 10 + (visCol + 1))) {
            console.log("Treasure found!");
            console.log("Amount of gold: " + clue);
            break;
        }
        nextTrip = twoDigitNumToCoord(map[visRow][visCol]);
        visRow = nextTrip[0];
        visCol = nextTrip[1];
    }
}

function main(): void {
    searchForTreasure(treasureMap);
}


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();
