/**
 * python like randInt
 * returns random int from given range (incl-excl)
 * @param {number}  min - minimum (incl)
 * @param {number}  max - maximum (excl)
 * @returns {number} random value from a given range
 */
function randInt(min: number, max?: number): number {
    if (min < 0 || max < 0) {
        throw new Error("range must include non negative numbers")
    }
    if (arguments.length === 1) {
        max = min;
        min = 0;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default randInt;
