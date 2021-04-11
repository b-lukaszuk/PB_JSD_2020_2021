let treasureMap: Array<Array<number>> = [
    [34, 21, 32, 41, 25],
    [14, 42, 43, 14, 31],
    [54, 45, 52, 42, 23],
    [33, 15, 51, 31, 35],
    [21, 52, 33, 13, 23],
]


/**
 * takes number (2 digits), returns array [tens, units]
 * [tens, units] -> will serve as [rows, cols] but indexing
 * is 1 (incl) to 5 (incl), so it will subtract 1 from each field
 * @param {number} fieldValue number (Int) from the treasure map field
 * @returns {Array<number>} [tens, units] -> will serve as [rows, cols]
 */
function numToCoord(fieldValue: number): Array<number> {
    let numAsStr: string = String(fieldValue);
    let tens: number = parseInt(numAsStr[0]);
    let units: number = parseInt(numAsStr[1]);
    return [tens - 1, units - 1]; // in JS indexing
}

function searchForTreasure(map: Array<Array<number>>): void {
    let visRow: number = 0;
    let visCol: number = 0;
    let nextTrip: Array<number> = []

    let clue: number = -99;

    while (true) {
        console.log("Visiting [" + (visRow + 1) + ", " + (visCol + 1) + "]");
        clue = map[visRow][visCol];
        if (clue === ((visRow + 1) * 10 + (visCol + 1))) {
            console.log("Treasure found!");
            console.log("Amount of gold: " + clue);
            break;
        }
        nextTrip = numToCoord(map[visRow][visCol]);
        visRow = nextTrip[0];
        visCol = nextTrip[1];
    }
}

searchForTreasure(treasureMap);
