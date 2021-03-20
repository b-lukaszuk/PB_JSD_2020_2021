class NumsExtractor {
    // tu w konstruktorze nie robimy nic ciekawego
    public constructor() {
    }

    public getNumsFromString(text: string): Array<number> {
        let tabOfChars: Array<string> = text.split("");
        let tabOfInts: Array<number> = tabOfChars.map((c) => parseInt(c));
        return tabOfInts.filter((num) => !isNaN(num));
    }
}

export default NumsExtractor;
