// substitute of python's capitalize
// https://www.w3schools.com/python/ref_string_capitalize.asp
function capitalize(word: string): string {
    // String.slice() jesli tylko start index, to end index = String.length
    return word[0].toUpperCase() + word.slice(1).toLocaleLowerCase();
}

export { capitalize };
