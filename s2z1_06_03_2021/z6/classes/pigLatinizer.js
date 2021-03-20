"use strict";
exports.__esModule = true;
var capitalize_1 = require("../utilities/capitalize");
var PigLatenizer = /** @class */ (function () {
    // nothing fancy to do here
    function PigLatenizer() {
    }
    // przesuwa 1 litere na koniec slowa (wytnij i wklej)
    // zalozenie: slowo sklada sie z samych liter
    PigLatenizer.prototype.mvFirstLetToEnd = function (word) {
        // String.slice() jesli tylko start index, to end index = String.length
        return word.slice(1) + word[0];
    };
    // zalozenie: zdanie zlozone z samych liter
    // brak obslugi imion, nazw wlasnych, przecinkow, kropek, itd.
    // dozwolone => patrz ./README.md
    PigLatenizer.prototype.getLatSentence = function (sentence) {
        var words = sentence.split(" ");
        var latWords = [];
        for (var i = 0; i < words.length; i++) {
            var word = this.mvFirstLetToEnd(words[i]) + "ay";
            // kapitalizacja pierwszej litery pierwszgo slowa w zdaniu
            if (i === 0) {
                latWords.push(capitalize_1.capitalize(word));
            }
            else {
                latWords.push(word);
            }
        }
        return latWords.join(" ");
    };
    return PigLatenizer;
}());
exports["default"] = PigLatenizer;
