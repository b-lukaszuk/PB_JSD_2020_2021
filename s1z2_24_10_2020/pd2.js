/////////////////
// Praca domowa z dnia 24-10-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
/////////////////

// ARRAY: [1,6,23,8,4,8,3,7]
const tab = [1, 6, 23, 8, 4, 8, 3, 7];

// 1) Create a function that returns the sum of all elements passed in
// array as parameter. Function (array)=>number

/**
 * Okresla czy dany rok jest przestepny
 * @param {Array<Number>} tablica - tablica liczb
 * @return {Number} suma wszystkich liczb w tablicy
 */
function sumTab(tablica) {
    // return tablica.reduce((a, b) => a + b, 0);

    // lub tradycyjne (for-owe) podejscie
    let suma = 0;
    for (let i = 0; i < tablica.length; i++) {
        suma += tablica[i];
    }
    return suma;
}

console.log("suma liczb w tablicy " + tab.toString() + " wynosi:");
console.log(sumTab(tab));


// 2) Create a function that returns sum of first and last elements of
// given array.

// 3) Create a function that takes a number and return factorial of that number.

// 4) Create a function that returns given array in reverse order. //
// no build in functions :)

// 5) Create a function that based on given array returns new array in
// pattern [a,b,c,d,e,f] -> [a+b, c+d, e+f] [1,3,4,1,0,3] => [4,5,3]
// function(array)=>array

// 6) For time of this example remove last element from the given
// array. Create a function that based on given array return new array
// in pattern [a,b,c,d,e] -> [a+b, c+d, e+e]

// 7) Create a function the return one random element from given
// array. // use random function

// 8) Create a function that takes two parameters: array and number
// off attempts. Based on number of attempts choose a random number
// from table that many times and return lowest one.

// 9) Create a function that takes given array. Then takes a random
// element, removes it from the array and pushes it to result
// arrays. This takes place as long as there are elements in source
// array.

// 10) Create a function that on given array will perform operation of
// adding or subtracting elements. Operation is to be chosen at
// random. And return a result.[a,b,c,d] =>(((a+-b)+-c)+-d)

// 11) Create a function that will return the current day name in Polish. 

// 12) Create a function that tells us how many days till Friday 

// 13) Create a function that take two numbers and return the object
// with 4 fields. Result on 4 basic arithmetic operations.
