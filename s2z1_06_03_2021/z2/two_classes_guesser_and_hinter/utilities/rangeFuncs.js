"use strict";
// zwraca srodek przedzialu Int (zaokraglenie)
// lowerBoundary (inclusive), upperBoundary(INCLUSIVE)
exports.__esModule = true;
exports.getRandNumFromRange = exports.getMiddleOfRange = void 0;
/**
 * fn. zwraca srodek przedzialu Int (zaokraglenie)
 * @param {number} lowerBoundary - (Int), poczatek zakresu (inclusive)
 * @param {number} upperBoundary - (Int), koniec zakresu (INCLUSIVE)
 * @return {number} Int (srodek zakresu)
 */
function getMiddleOfRange(lowerBoundary, upperBoundary) {
    return Math.round((lowerBoundary + upperBoundary - 1) / 2);
}
exports.getMiddleOfRange = getMiddleOfRange;
/**
 * fn. pomocn zwraca losowa liczbe (Int) z podanego zakresu
 * @param {number} start - liczba (Int), poczatek zakresu (inclusive)
 * @param {number} start - liczba (Int), koniec zakresu (exclusive)
 * @return {number} losowa liczba (Int) z wybranego zakresu
 */
function getRandNumFromRange(start, stop) {
    return Math.floor(Math.random() * (stop - start) + start);
}
exports.getRandNumFromRange = getRandNumFromRange;
