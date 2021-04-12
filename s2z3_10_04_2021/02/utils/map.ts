/**
 * returns lengths of subArrs (n of cols) of a given 2d array
 */
function getSubArrsLens(arr2d: Array<Array<any>>): Array<number> {
    let subArrsLens: Array<number> = [];
    for (let i = 0; i < arr2d.length; i++) {
        subArrsLens.push(arr2d[i].length);
    }
    return subArrsLens;
}

/**
 * returns elements from subarrays from a given index
 * for [[1, 2], [1, 3], [2, 2]] and 0 -> [1, 1, 2]
 */
function getSubArrsEltsFromInd(arr2d: Array<Array<any>>,
    index: number): Array<any> {
    let eltsFromInd: Array<any> = [];
    for (let i = 0; i < arr2d.length; i++) {
        eltsFromInd.push(arr2d[i][index]);
    }
    return eltsFromInd;
}

/**
 * common lisp like map, bit like haskell zipWith (but for n tables)
 * @param {Function} cbFn callback function to apply on elts from arrays
 * @param {Array<Array<any>>} arrays to apply, e.g. cbFn(ar1[i], ar2[i], ar3[i])
 * @returns {Array<any>} result array of the length of the shortest arrays
 */
function clMap(cbFn: Function,
    ...arrays: Array<Array<any>>): Array<any> {

    let noOfArrs: number = arrays.length;
    let noOfArgsInCb: number = cbFn.length;
    let arrsLens: Array<number> = getSubArrsLens(arrays);
    let minArrLen = Math.min(...arrsLens);
    let result: Array<any> = [];

    if (noOfArgsInCb !== noOfArrs) {
        throw new Error("number of args in callback must be equal to " +
            "number of arrays");
    }

    for (let i = 0; i < minArrLen; i++) {
        result.push(cbFn(...getSubArrsEltsFromInd(arrays, i)));
    }
    // return [];
    return result;
}

export default clMap;
