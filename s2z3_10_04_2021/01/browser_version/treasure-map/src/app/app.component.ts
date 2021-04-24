import { Component } from '@angular/core';
import areArraysEqual from "./utils/arraysComparator";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'treasure-map';

    public treasureMap: number[][] = [
        [34, 21, 32, 41, 25],
        [14, 42, 43, 14, 31],
        [54, 45, 52, 42, 23],
        [33, 15, 51, 31, 35],
        [21, 52, 33, 13, 23],
    ]

    public currentlyVisited: number[] = [0, 0];

    public isTreasureFound = false;

    public areTwoArrEql(arr1: number[], arr2: number[]) {
        return areArraysEqual(arr1, arr2);
    }

    public getTresaureFromCurrentField() {
        let [row, col] = this.currentlyVisited;
        return this.treasureMap[row][col];
    }

    /**
     * takes number (2 digits), returns array [tens, units]
     * [tens, units] -> will serve as [rows, cols] but indexing
     * is 1 (incl) to 5 (incl), so it will subtract 1 from each field
     * @param {number} fieldValue number (Int) from the treasure map field
     * @returns {number[]} [tens, units] -> will serve as [rows, cols]
     */
    public twoDigitNumToCoord(fieldValue: number): number[] {
        let numAsStr: string = String(fieldValue);
        let tens: number = parseInt(numAsStr[0]);
        let units: number = parseInt(numAsStr[1]);
        return [tens - 1, units - 1]; // in JS indexing
    }

    /**
     * searches for a treasure (traverses a map) and declares its actions
     * @param {number[][]} map treasure map in the format specified by the task
     */
    public searchForTreasure1step(map: number[][] = this.treasureMap): boolean {
        // visited cells
        let [visRow, visCol] = this.currentlyVisited;
        // next place to go (coordinates read from the map)
        let nextTrip: number[] = [];
        let clue: number; // clue from the place on map

        console.log("Visiting [" + (visRow + 1) + ", " + (visCol + 1) + "]");
        this.currentlyVisited = [visRow, visCol];
        clue = map[visRow][visCol];
        if (clue === ((visRow + 1) * 10 + (visCol + 1))) {
            console.log("\nTreasure found!");
            console.log("Amount of gold: " + clue);
            return true;
        }
        nextTrip = this.twoDigitNumToCoord(map[visRow][visCol]);
        visRow = nextTrip[0];
        visCol = nextTrip[1];
        this.currentlyVisited = [visRow, visCol];
        return false;
    }

    public searchForTreasureInHtml(): void {
        let intervalId = setInterval(() => {
            if (this.searchForTreasure1step()) {
                clearInterval(intervalId);
                this.isTreasureFound = true;
            };
        }, 1000);
    }
}
