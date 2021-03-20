"use strict";
exports.__esModule = true;
var capitalize_1 = require("../utilities/capitalize");
var PigDelatenizer = /** @class */ (function () {
    // nothing fancy to do here
    function PigDelatenizer() {
    }
    PigDelatenizer.prototype.mvLastLetToFront = function (word) {
        // String.slice() -1, tzn. ost od konca (jak w pythonie)
        return word.slice(-1) + word.slice(0, -1);
    };
    PigDelatenizer.prototype.getDeLatWord = function (word) {
        // -2, bo oprocz 2 ostatnich liter -> pigLatynizowane "ay"
        return this.mvLastLetToFront(word.slice(0, -2));
    };
    // zalozenie: zdanie zlozone z samych liter
    // brak obslugi imion, nazw wlasnych
    // dozwolone => patrz ./README.md
    PigDelatenizer.prototype.getDeLatSentence = function (sentence) {
        var words = sentence.split(" ");
        var deLatWords = [];
        for (var i = 0; i < words.length; i++) {
            var word = this.getDeLatWord(words[i]);
            // kapitalizacja pierwszego slowa w zdaniu
            if (i === 0) {
                deLatWords.push(capitalize_1.capitalize(word));
            }
            else {
                deLatWords.push(word);
            }
        }
        return deLatWords.join(" ");
    };
    return PigDelatenizer;
}());
exports["default"] = PigDelatenizer;
