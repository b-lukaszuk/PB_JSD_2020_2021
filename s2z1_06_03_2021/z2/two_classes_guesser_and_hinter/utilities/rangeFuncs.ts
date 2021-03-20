// zwraca srodek przedzialu Int (zaokraglenie)
// lowerBoundary (inclusive), upperBoundary(INCLUSIVE)

/**
 * fn. zwraca srodek przedzialu Int (zaokraglenie)
 * @param {number} lowerBoundary - (Int), poczatek zakresu (inclusive)
 * @param {number} upperBoundary - (Int), koniec zakresu (INCLUSIVE)
 * @return {number} Int (srodek zakresu)
 */
function getMiddleOfRange(lowerBoundary: number, upperBoundary: number): number {
    return Math.round((lowerBoundary + upperBoundary - 1) / 2);
}

/**
 * fn. pomocn zwraca losowa liczbe (Int) z podanego zakresu
 * @param {number} start - liczba (Int), poczatek zakresu (inclusive)
 * @param {number} start - liczba (Int), koniec zakresu (exclusive)
 * @return {number} losowa liczba (Int) z wybranego zakresu
 */
function getRandNumFromRange(start: number, stop: number): number {
    return Math.floor(Math.random() * (stop - start) + start);
}

export { getMiddleOfRange, getRandNumFromRange };
