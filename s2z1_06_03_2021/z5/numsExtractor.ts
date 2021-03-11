class NumsExtractor {
    public constructor(private _text: string) {
    }

    public getNumsFromString(text: string): Array<number> {
        let tabOfChars: Array<string> = text.split("");
        let tabOfInts: Array<number> = tabOfChars.map((c) => parseInt(c));
        return tabOfInts.filter((num) => !isNaN(num));
    }
}

export default NumsExtractor;
