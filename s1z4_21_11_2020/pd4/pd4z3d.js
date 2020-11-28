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



// na NodeJS uzywalismy
// fs = require('fs');
// fs.readFile(file, [encoding], [callback]);
// zakladam, ze uzywamy require(path) jak podano w pliku 1.js z githuba

//  b. Create a structures to hold data from the file
// tzn.? niejasne, dac let-a/const-a aby trzymac wczytany obiekt?
const transObj = require("./Data.json");


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
    .map((obj) => parseFloat(obj.cost)) // Str -> Float
    .reduce((a, b) => a + b, 0); // suma
totCost2014 = zaokr(totCost2014); // bo JS druk brzydkie numerki

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

/**
 * fn. pomocn - zwraca obiekt z zaokraglonymi liczbami
 * ZMIENIA OBIEKT IN-PLACE
 * @param {Object} obiekt - obiekt bez zagniezdzen zawierajacy floaty
 * @param {Function} fn - funkcja zaokraglajaca liczbe
 */
function zaokrAllNums(obiekt, fn) {
    for(const propName in obiekt) {
	obiekt[propName] = fn(obiekt[propName]);
    }
}

zaokrAllNums(earnByComp, zaokr);

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

zaokrAllNums(costByTrans, zaokr);
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

zaokrAllNums(spendByMonth, zaokr);
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

zaokrAllNums(spendByWeekDay, zaokr);
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


