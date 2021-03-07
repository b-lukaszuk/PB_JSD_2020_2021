// zwraca srodek przedzialu Int (zaokraglenie)
// lowerBoundary (inclusive), upperBoundary(exclusive)
function getMiddleOfRange(lowerBoundary: number, upperBoundary: number): number {
    return Math.round((lowerBoundary + upperBoundary - 2) / 2);
}

/**
 * fn. pomocn - imitacja pythonowego range()
 * zwraca losowa liczbe (Int) z podanego zakresu
 * @param {number} start - liczba (Int), poczatek zakresu (inclusive)
 * @param {number} start - liczba (Int), koniec zakresu (exclusive)
 * @return {number} losowa liczba (Int) z wybranego zakresu
 */
function getRandNumFromRange(start: number, stop: number): number {
    return Math.floor(Math.random() * (stop - start) + start);
}

export { getMiddleOfRange, getRandNumFromRange };
