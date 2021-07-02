"use strict";
exports.__esModule = true;
exports.toggleColor = exports.Color = void 0;
var Color;
(function (Color) {
    Color[Color["White"] = 0] = "White";
    Color[Color["Black"] = 1] = "Black";
})(Color || (Color = {}));
exports.Color = Color;
function toggleColor(color) {
    return color === Color.White ? Color.Black : Color.White;
}
exports.toggleColor = toggleColor;
