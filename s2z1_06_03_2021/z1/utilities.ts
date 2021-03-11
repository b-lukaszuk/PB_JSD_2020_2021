// helper function, useful for testing purposes
// similar to python's range
// https://www.w3schools.com/python/ref_func_range.asp
// start-stop (inclusive-exclusive)
function range(start: number, stop: number, step: number = 1): Array<number> {
    let tmp: Array<number> = [];
    for (let i = start; i < stop; i += step) {
        tmp.push(i);
    }
    return tmp;
}

export default range;