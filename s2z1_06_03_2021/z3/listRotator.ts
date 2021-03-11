class ListRotator {
    private _anArray: Array<any>;

    constructor(someArray: Array<any>) {
        // kopia arrayu przyj jako arg w konstruktorze 
        this._anArray = [...someArray];
    }

    public printArray(): void {
        console.log(this._anArray);
    }

    // moves first elt of a list to its end
    // "Try solving this without creating a copy of the list."
    // bez podejscia funkcyjnego, zmiana this._anArray INPLACE
    private moveFirstEltToEnd(): void {
        // [0], bo array.splice() zwraca usun. elt-y jako liste
        let movedElt: number = this._anArray.splice(0, 1)[0];
        this._anArray.splice(this._anArray.length, 1, movedElt);
    }

    // "Try solving this without creating a copy of the list."
    // bez podejscia funkcyjnego, zmiana this._anArray INPLACE
    public shiftByKelts(k: number): void {
        for (let i = 0; i < k; i++) {
            this.moveFirstEltToEnd();
        }
    }
}

export default ListRotator;

