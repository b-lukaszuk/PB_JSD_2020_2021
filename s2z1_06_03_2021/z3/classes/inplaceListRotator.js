"use strict";
exports.__esModule = true;
var InplaceListRotator = /** @class */ (function () {
    // tu nie robimy nic ciekawego
    function InplaceListRotator() {
    }
    // moves first elt of a list to its end
    // "Try solving this without creating a copy of the list."
    // bez podejscia funkcyjnego, zmiana this._anArray INPLACE
    InplaceListRotator.prototype.moveFirstEltToEnd = function (someArray) {
        // [0], bo array.splice() zwraca usun. elt-y jako liste
        var movedElt = someArray.splice(0, 1)[0];
        someArray.splice(someArray.length, 1, movedElt);
    };
    // "Try solving this without creating a copy of the list."
    // bez podejscia funkcyjnego, zmiana this._anArray INPLACE
    InplaceListRotator.prototype.shiftByKelts = function (someArray, k) {
        for (var i = 0; i < k; i++) {
            this.moveFirstEltToEnd(someArray);
        }
    };
    return InplaceListRotator;
}());
exports["default"] = InplaceListRotator;
