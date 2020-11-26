/////////////////
// Praca domowa z dnia 21-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// funkcje nie sa optymalizowane pod katem szybkosci
// ver 0.3
/////////////////

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 3                                 //
///////////////////////////////////////////////////////////////////////////////
// 3) Based on included JSON file.
//  a. Create a function that will return Json from the file.
//  b. Create a structures to hold data from the file
//  c. Map data from function a to structure from b.
//  d. Create object that will give us data about:
//     i. How much money was spend in 2014
//     ii. What company was earning how much
//     iii. What type on transaction was having what spending’s.
//     iv. Values of the spending in each month
//     v. Values of the spending in each day of the week


//  a. Create a function that will return Json from the file.
// na NodeJS uzywalismy
// fs = require('fs');
// fs.readFile(file, [encoding], [callback]);
// zakladam, ze uzywamy require(path) jak podano w pliku 1.js z githuba

/**
 * zwraca JSON wczytany z Pliku
 * @param {String} sciezka - sciezka do pliku JSON na dysku
 * @return {Object} JSON wczytany z pliku
 */
function getJSONfromFile(sciezka) {
    return require(sciezka);
}


//  b. Create a structures to hold data from the file
// tzn.? niejasne, dac let-a/const-a aby trzymac wczytany obiekt?
const transObj = getJSONfromFile("./Data.json");

console.log(transObj.slice(0, 2)); // tu dziala metoda array-owa slice

//  c. Map data from function a to structure from b.
// niejasne, np. z jakiej funkcji (mam sobie wymyslic?)

/**
 * zamienia kwote na PLN-y (zaokragla do 2 miejsc po przecinku i dokleja " PLN")
 * @param {Number|String} kwota - kwota
 * @return {String} kwota w PLN-ach (format "123.22 PLN")
 */
function numToPLN(kwota) {
    return parseFloat(kwota).toFixed(2) + " PLN";
}

/**
 * mapuje dana funkcje na wszystkie elementy obiektu
 * @param {Function} fun - funkcja stosowana na kazdym elemencie obiektu
 * @return {Array} tablica wynkikowa (wartosci zwracane przez funkcje)
 */
function myMap(fun, transakcje) {
    let tabWyn = [];
    for (let i = 0; i < transakcje.length; i++) {
        tabWyn.push(fun(transakcje[i]));
    }
    return tabWyn;
}

console.log(myMap((obj) => numToPLN(obj.cost), transObj).slice(0, 2));
console.log(transObj.map((obj) => numToPLN(obj.cost)).slice(0, 2));
// hmm, wbud map tez wydaje sie dzialac, chociaz powinno byc wywolane na arrayu
