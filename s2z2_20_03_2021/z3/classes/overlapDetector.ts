class OverlapDetector {
    public constructor() {
        // nothing to do here
    }

    /**
    * returns an array of all possible (sub)strings of given length
    * e.g. "monica", 2 => ["mo", "on", "ni", "ic", "ca"]
    * lowercases letters, traverses word from left to right
     * @param {string} word string on which we will perform operations
     * @param {number} len length of substrings to search in word
     * @returns {array<string>} array of substrings of given length
     */
    private getAllSubstrOfLen(word: string, len: number): Array<string> {
        let result: Array<string> = [];
        let startInd: number = 0;
        let endInd: number = len;
        if (len > word.length || len < 1) {
            throw "incorrect substing length";
        } else {
            while (endInd <= word.length) {
                result.push(word.toLocaleLowerCase().substring(startInd, endInd));
                // move the frame right by 1
                startInd++;
                endInd++;
            }
        }
        return result;
    }

    /**
     * returns first elt of arrayA that is in arrayB or empty string
     * traverses arrays from left to right
     * @param {Array<sring} arrayA - elts from this array are searched in arrayB
     * @param {Array<sring} arrayB - array to be searched in
     * @returns {string} first elt from arrayA found in arrayB or empty string
     */
    private getFirstAinB(arrayA: Array<string>, arrayB: Array<string>): string {
        for (let a = 0; a < arrayA.length; a++) {
            for (let b = 0; b < arrayB.length; b++) {
                if (arrayA[a] === arrayB[b]) {
                    return arrayA[a];
                }
            }
        }
        return "";
    }

    /**
     * gets longest overlapping substring between wordA and wordB (if any)
     * searches left to right, trims words
     * @param {string} wordA - string for comparison
     * @param {string} wordB - string for comparison
     * @returns {string} longest overlapping string (or "no overlap found")
     */
    public getOverlapString(wordA: string, wordB: string): string {
        let result: string = "";
        wordA = wordA.trim();
        wordB = wordB.trim();
        // overlapping string got at most length of shorter word
        let countDownCounter: number = Math.min(wordA.length, wordB.length);
        while (countDownCounter > 0 && !Boolean(result)) {
            let tabOfSubstrA: Array<string> = this.getAllSubstrOfLen(
                wordA, countDownCounter);
            let tabOfSubstrB: Array<string> = this.getAllSubstrOfLen(
                wordB, countDownCounter);
            result = this.getFirstAinB(tabOfSubstrA, tabOfSubstrB);
            countDownCounter--;
        }
        return result || "no overlap found";
    }
}

export default OverlapDetector;
