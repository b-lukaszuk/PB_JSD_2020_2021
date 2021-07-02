///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
var treasureMap = [
    [34, 21, 32, 41, 25],
    [14, 42, 43, 14, 31],
    [54, 45, 52, 42, 23],
    [33, 15, 51, 31, 35],
    [21, 52, 33, 13, 23],
];
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
function twoDigitNumToCoord(fieldValue) {
    var numAsStr = String(fieldValue);
    var tens = parseInt(numAsStr[0]);
    var units = parseInt(numAsStr[1]);
    return [tens - 1, units - 1]; // in JS indexing
}
/**
 * searches for a treasure (traverses a map) and declares its actions
 * @param {number[][]} map treasure map in the format specified by the task
 */
function searchForTreasure(map) {
    // visited cells
    var visRow = 0;
    var visCol = 0;
    // next place to go (coordinates read from the map)
    var nextTrip = [];
    var clue = undefined; // clue from the place on map
    while (true) {
        console.log("Visiting [" + (visRow + 1) + ", " + (visCol + 1) + "]");
        clue = map[visRow][visCol];
        if (clue === ((visRow + 1) * 10 + (visCol + 1))) {
            console.log("\nTreasure found!");
            console.log("Amount of gold: " + clue);
            break;
        }
        nextTrip = twoDigitNumToCoord(map[visRow][visCol]);
        visRow = nextTrip[0];
        visCol = nextTrip[1];
    }
}
function printTreasureMap(treasureMap) {
    console.log("Behold the treasure map\n");
    for (var i = 0; i < treasureMap.length; i++) {
        console.log(treasureMap[i].toString());
        ;
    }
}
function main() {
    printTreasureMap(treasureMap);
    console.log("\nLet's look for the treasure\n");
    searchForTreasure(treasureMap);
}
///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
main();
