class Palindrom {
    public constructor() {
        // nothing to do here
    }

    private isPalindrom(word: string): boolean {
        if (word.length < 1) {
            return false;
        } else if (word.length == 1) {
            // I guess, that one letter string is a palindrom, since
            // https://en.wikipedia.org/wiki/Palindromic_number
            // "[..] palindromic numbers [..] are: 0, 1, 2 [...]"
            return true;
        } else {
            let revWord: string = word.split("").reverse().join("");
            return revWord.toLocaleLowerCase() === word.toLocaleLowerCase();
        }
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
        let textLen: number = word.length;
        if (len > textLen || len < 1) {
            throw "incorrect substing length";
        }
        let startIndex: number = 0;
        let endIndex: number = len;
        while (endIndex <= textLen) {
            result.push(word.substring(startIndex, endIndex));
            // shift the frame right by 1
            startIndex++;
            endIndex++;
        }
        return result;
    }

    /**
     * gets array of all substrings from a given word
     * substrings -> descending by length, left to right
     * word is trimmed first (whitespaces removed from both ends)
     * @param {string} word - to derive substrings
     * @returns {Array<string>} all possible substrings from a word
     */
    private getAllSubstr(word: string): Array<string> {
        word = word.trim();
        let result: Array<string> = [];
        for (let i = word.length; i > 0; i--) {
            result = result.concat(this.getAllSubstrOfLen(word, i));
        }
        return result;
    }

    /**
     * analgous to Array.prototype.find() in es7 (es2016)
     * returns first elt of someArr that satisfies condition or undefined
     * @param {Array<any>} someArr - array to be searched
     * @param {Function} cbFn - callback takes elt of someArr returns boolean
     * @returns {any} first elt of someArr for which cbFn(els) is True
     */
    findInArray(someArr: Array<any>, cbFn: Function): any {
        for (let i = 0; i < someArr.length; i++) {
            if (cbFn(someArr[i])) {
                return someArr[i];
            }
        }
        return undefined;
    }

    /**
     * returns first longest palindrome, moves from left
     * @param {string} word - string to check for palindromes
     * @returns {string} longest palindrome found
     */
    public getLongestPalindrome(word: string): string {
        let substrings: Array<string> = this.getAllSubstr(word);
        let palindrome: string = this.findInArray(substrings, (substr) => {
            return this.isPalindrom(substr);
        })
        return palindrome || "no palindrome found";
    }
}

export default Palindrom;
