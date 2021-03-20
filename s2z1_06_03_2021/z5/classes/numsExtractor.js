"use strict";
exports.__esModule = true;
var NumsExtractor = /** @class */ (function () {
    // tu w konstruktorze nie robimy nic ciekawego
    function NumsExtractor() {
    }
    NumsExtractor.prototype.getNumsFromString = function (text) {
        var tabOfChars = text.split("");
        var tabOfInts = tabOfChars.map(function (c) { return parseInt(c); });
        return tabOfInts.filter(function (num) { return !isNaN(num); });
    };
    return NumsExtractor;
}());
exports["default"] = NumsExtractor;
