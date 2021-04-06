class OverlapDetector {
    public constructor() {
        // nothing to do here
    }

    // returns an array of all possible (sub)strings of given length
    // e.g. "monica", 2 => ["mo", "on", "ni", "ic", "ca"]
    // lowercases letters, traverses word from left to right
    private getAllSubstrOfLen(word: string, len: number): Array<string> {
        let result: Array<string> = [];
        if (len > word.length || len < 1) {
            return [""];
        }
        let startInd: number = 0;
        let endInd: number = len;
        while (endInd <= word.length) {
            result.push(word.toLocaleLowerCase().substring(startInd, endInd));
            // move the frame right by 1
            startInd++;
            endInd++;
        }
        return result;
    }

    // returns first elt of arrayA that is in ArrayB or empty string
    // traverses arrays from left to right
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

    // checks longest substrngs first, checks left to right, until first spotted
    public getOverlapString(wordA: string, wordB: string): string {
        let result: string = "";
        let countDownCounter: number = Math.min(wordA.length, wordB.length);
        while (countDownCounter > 0 && !Boolean(result)) {
            let tabOfSubstrA: Array<string> = this.getAllSubstrOfLen(
                wordA,
                countDownCounter
            );
            let tabOfSubstrB: Array<string> = this.getAllSubstrOfLen(
                wordB,
                countDownCounter
            );
            result = this.getFirstAinB(tabOfSubstrA, tabOfSubstrB);
            countDownCounter--;
        }
        return result || "no overlap found";
    }
}

export default OverlapDetector;
