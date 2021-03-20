class InplaceListRotator {
    // tu nie robimy nic ciekawego
    public constructor() {
    }

    // moves first elt of a list to its end
    // "Try solving this without creating a copy of the list."
    // bez podejscia funkcyjnego, zmiana this._anArray INPLACE
    private moveFirstEltToEnd(someArray: Array<any>): void {
        // [0], bo array.splice() zwraca usun. elt-y jako liste
        let movedElt: number = someArray.splice(0, 1)[0];
        someArray.splice(someArray.length, 1, movedElt);
    }

    // "Try solving this without creating a copy of the list."
    // bez podejscia funkcyjnego, zmiana this._anArray INPLACE
    public shiftByKelts(someArray: Array<any>, k: number): void {
        for (let i = 0; i < k; i++) {
            this.moveFirstEltToEnd(someArray);
        }
    }
}

export default InplaceListRotator;

