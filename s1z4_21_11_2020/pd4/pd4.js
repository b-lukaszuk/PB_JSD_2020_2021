/////////////////
// Praca domowa z dnia 21-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// funkcje nie sa optymalizowane pod katem szybkosci
// ver 0.3
/////////////////

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 1                                 //
///////////////////////////////////////////////////////////////////////////////
// 1) Extend String type with the reverse() function. The function is
// to reverse the value of the string on which it was called.

String.prototype.reverse = function() {
    return this.valueOf() // tekst w stringu
	.split("").reverse() // do tabeli i odwr. elt-ow tabeli
	.join(""); // polaczenie tabeli w string
};

console.log("alan po odwroceniu daje: " + "alan".reverse()); //

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 2                                 //
///////////////////////////////////////////////////////////////////////////////
// 2) Extend Number type with the reverse() function. The function is
// to reverse the value of the Number on which it was called.

// co to znaczy reverse number, czy tak jak w zad 1 z pd3
// "reverseValue(): If number do (*(-1))", czyli chyba liczba*(-1),
// czy moze tak jak w zad wyzej czyli 123, bedzie 321, zrobmy to 2 dla odmiany

// zakladamy, ze odwracamy tylko czesc calkowita numeru
Number.prototype.reverse = function () {
    return parseInt(this.valueOf()
		    .toFixed(0) // toFixed -> String (w sr Int),
		    .reverse()); // i String.reverse() z poprzedniego zadania :)
};

// na primitive-ach to nie dziala, czyli 123.reverse() bedzie blad, ale
console.log("123 po odwroceniu daje: " + new Number(123).reverse());
let jakasLiczba = 234;
console.log(jakasLiczba + " po odwroceniu daje: " + jakasLiczba.reverse());

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

// console.log(myMap((obj) => numToPLN(obj.cost), transObj));
// console.log(transObj.map((obj) => numToPLN(obj.cost)));
// hmm, wbud map tez wydaje sie dzialac, chociaz powinno byc wywolane na arrayu


//  d. Create object that will give us data about:
//     i. How much money was spend in 2014
//     ii. What company was earning how much
//     iii. What type on transaction was having what spending’s.
//     iv. Values of the spending in each month
//     v. Values of the spending in each day of the week

/**
 * fn. pomoc zwraca rok (Int) ze stringu postaci "dd-mm-yyyy"
 * @param {String} ddmmyyy - data w postaci "dd-mm-yyyy"
 * @return {Number} - rok (Int) ze stringu
 */
function getRok(ddmmyyyy) {
    return parseInt(ddmmyyyy.replace(/.+-(\d{4}$)/, "$1"));
}

/**
 * fn. pomoc zwraca liczbe zakroglana odp. liczbe miejsc po przec
 * @param {Number|String} liczba - liczba do zaokraglenia
 * @param {Number} ilePoPrzec - do ilu miejsc po przecinku zaokraglic
 * @return {Number} zaokraglona liczba (Float)
 */
function zaokr(liczba, ilePoPrzec=2) {
    return parseFloat(parseFloat(liczba).toFixed(ilePoPrzec));
}



//     i. How much money was spend in 2014
let totCost2014 = transObj.filter(
    (obj) => getRok(obj.detailsOfPayment.date) === 2014) // spr rok
    .map((obj) => zaokr(obj.cost)) // Str -> Float, altern parseFloat()
    .reduce((a, b) => a + b, 0); // suma

// console.log("suma wydatkow w 2014 roku: " + totCost2014);


//     ii. What company was earning how much
let earnByComp = {}; // obiekt (JS), slownik w Python-ie

transObj.forEach((obj) => {
    let curComp = obj.detailsOfPayment.company;
    if(curComp in earnByComp) { // jesli jest juz w slown (Python), dodaj do
        earnByComp[curComp] += parseFloat(obj.cost);
    } else { // jesli nie to wstaw po raz 1
        earnByComp[curComp] = parseFloat(obj.cost);
    }
});

// console.log(earnByComp);


//     iii. What type on transaction was having what spending’s.
let costByTrans = {}; // slownik (Python)

transObj.forEach((obj) => {
    let curTrans = obj.detailsOfPayment.Type;
    if(curTrans in costByTrans) { // jesli jest juz w slown (Python), dodaj do
        costByTrans[curTrans] += parseFloat(obj.cost);
    } else { // jesli nie to wstaw po raz 1
        costByTrans[curTrans] = parseFloat(obj.cost);
    }
});

// console.log(costByTrans);

//     iv. Values of the spending in each month

/**
 * fn. pomoc zwraca miesiac (Int) ze stringu postaci "dd-mm-yyyy"
 * @param {String} ddmmyyy - data w postaci "dd-mm-yyyy"
 * @return {Number} - miesiac (Int) ze stringu, nie sprawdza czy 1-12
 */
function getMies(ddmmyyyy) {
    return parseInt(ddmmyyyy.replace(/.+(\d{2})-\d{4}$/, "$1"));
}


let spendByMonth = {}; // slownik {Python}

transObj.forEach((obj) => {
    let curMonth = getMies(obj.detailsOfPayment.date);
    if(curMonth in spendByMonth) { // jesli jest juz w slown (Python), dodaj do
        spendByMonth[curMonth] += parseFloat(obj.cost);
    } else { // jesli nie to wstaw po raz 1
        spendByMonth[curMonth] = parseFloat(obj.cost);
    }
});

// console.log(spendByMonth);

//     v. Values of the spending in each day of the week

/**
 * fn. pomoc zwraca dzien (Int) ze stringu postaci "dd-mm-yyyy"
 * @param {String} ddmmyyy - data w postaci "dd-mm-yyyy"
 * @return {Number} - miesiac (Int) ze stringu, nie sprawdza czy 1-31
 */
function getDzien(ddmmyyyy) {
    return parseInt(ddmmyyyy.replace(/^(\d{2})-.*/, "$1"));
}

/**
 * fn. pomoc zwraca dzienTygodnia (Int) ze stringu postaci "dd-mm-yyyy"
 * @param {String} ddmmyyy - data w postaci "dd-mm-yyyy"
 * @return {Number} - dzien tygodnia (Int) ze stringu, 0 - Sun, 6 - Sat
 */
function getDzTyg(ddmmyyyy) {
    let data = new Date(getRok(ddmmyyyy),
                        getMies(ddmmyyyy)-1, // tu ma byc 0-11, 0 - Jan
                        getDzien(ddmmyyyy));
    return data.getDay();
}

let spendByWeekDay = {};

transObj.forEach((obj) => {
    let curDay = getDzTyg(obj.detailsOfPayment.date);
    if(curDay in spendByWeekDay) { // jesli jest juz w slown (Python), dodaj do
        spendByWeekDay[curDay] += parseFloat(obj.cost);
    } else { // jesli nie to wstaw po raz 1
        spendByWeekDay[curDay] = parseFloat(obj.cost);
    }
});

// console.log(spendByWeekDay);


let summaryStat = {};

// wypelnienie koncowego obiektu
Object.assign(summaryStat,
	      {totCost2014},
	      {earnByComp},
	      {costByTrans},
	      {spendByMonth},
	      {spendByWeekDay});

console.log(summaryStat);

///////////////////////////////////////////////////////////////////////////////
//	                     zadanie 4 (egazminacyjne)
//		          do pokazania w innym terminie?!
///////////////////////////////////////////////////////////////////////////////
// 4) * Create a solution that will tell us what poker set we
// have. The solution is to deal us 5 cards from the standard 52
// card deck. After that the solution is to tell us what is the
// best poker set. EXAM
