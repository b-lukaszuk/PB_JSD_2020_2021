/**
 * 1D-arrays comparator
 * @param {argType} argName argDescription
 * @returns {retValType} retValDescription
 */
function areArraysEqual(arr1: Array<number>, arr2: Array<number>): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

export default areArraysEqual;
