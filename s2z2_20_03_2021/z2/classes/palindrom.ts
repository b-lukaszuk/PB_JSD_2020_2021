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

    // returns an array of all possible (sub)strings of given length
    // e.g. "monica", 2 => ["mo", "on", "ni", "ic", "ca"]
    private getAllSubstrOfLen(word: string, len: number): Array<string> {
        let result: Array<string> = [];
        let textLen: number = word.length;
        if (len > textLen || len < 1) {
            return [""];
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

    // substrings -> descending by length, left to right
    private getAllSubstr(word: string): Array<string> {
        let result: Array<string> = [];
        for (let i = word.length; i > 0; i--) {
            result = result.concat(this.getAllSubstrOfLen(word, i));
        }
        return result;
    }

    // returns first longest palindrome from left
    public getLongestPalindrome(word: string): string {
        let substrings: Array<string> = this.getAllSubstr(word);
        let palindromes: Array<string> = substrings.filter((substr: string) => {
            return this.isPalindrom(substr);
        });
        // in es7 (es2016) there's a method string.find(), then w/o [0]
        return palindromes[0] || "no palindrome found";
    }
}

export default Palindrom;
