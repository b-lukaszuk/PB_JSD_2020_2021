"use strict";
exports.__esModule = true;
exports.capitalize = void 0;
// substitute of python's capitalize
// https://www.w3schools.com/python/ref_string_capitalize.asp
function capitalize(word) {
    // String.slice() jesli tylko start index, to end index = String.length
    return word[0].toUpperCase() + word.slice(1).toLocaleLowerCase();
}
exports.capitalize = capitalize;
