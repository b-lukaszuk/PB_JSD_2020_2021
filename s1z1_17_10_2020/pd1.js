/////////////////
// Praca domowa z dnia 18-10-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
/////////////////

// 1. From years in array check for leap years [1974, 1900, 1985, 2000]
let lata = [1974, 1900, 1985, 2000];

/**
 * Okresla czy dany rok jest przestepny
 * @param {Number} rok - testowany rok (dodatni Int)
 * @return {Boolean} wynik testu (true/false)
 */
function czyPrzestepny(rok) {
    // za: https://en.wikipedia.org/wiki/Leap_year#Algorithm 
    if (rok % 4 !== 0) {
        return false;
    } else if (rok % 25 !== 0) {
        return true;
    } else if (rok % 16 !== 0) {
        return false;
    } else {
        return true;
    }
}

// jakis bug w VS Code, console.log() 
// nie drukuje prawidlowo Array-sow w Debug Console
// tzn. 1x drukuje ok, ale potem juz nie
console.log(lata.map(czyPrzestepny).toString());


// 2. Calculate factorial of 7.
/**
 * Liczy silnie (factorial) dla danej liczby iteracyjnie (for-em)
 * @param {Number} liczba (Int, >= 1)
 * @return {Number} silnia (Int, >= 1)
 */
function silniaFor(liczba = 10) {
    let silnia = 1;
    for (let i = 1; i < liczba + 1; i++) {
        silnia *= i;
    }
    return silnia;
}


/**
 * Liczy silnie (factorial) dla danej liczby rekurs. (taka jest def mat.)
 * (rekursja - nie dawac duzej liczby wejsciowej)
 * @param {Number} liczba (Int, >= 1), 
 * @return {Number} silnia (Int, >= 1)
 */
function silniaRek(liczba = 10) {
    if (liczba === 1) {
        return 1;
    } else {
        return liczba * silniaRek(liczba - 1);
    }
}

console.log(silniaFor(7));
console.log(silniaRek(7));

// 3. Calculate the sum of the odd items [1,6,23,8,4,98,3,7,3,98,4,98]
let cyfry = [1, 6, 23, 8, 4, 98, 3, 7, 3, 98, 4, 98];

/** 
* sprawdza czy liczba jest nieparzysta
* @param {Number} liczba - liczba do sprawdzenia (Int)
* @return {Boolean} wynik (true/false)
*/
function czyNparz(liczba) {
    return liczba % 2 !== 0;
}

/** 
* liczy sume liczb nieparzystych w tablicy
* @param {Array<Number>} liczby - tablica liczb (Int-ow)
* @return {Number} suma (Int)
*/
function sumujNparz(liczby) {
    let sumaNparz = 0;
    for (let i = 0; i < liczby.length; i++) {
        if (czyNparz(liczby[i])) {
            sumaNparz += liczby[i];
        }
    }
    return sumaNparz;
}

console.log(sumujNparz(cyfry));

// 4. Choose highest and lowest values from the given array.
// [1,6,23,8,4,98,3,7,3,98,4,98]. 
// One loop run.
// (chodzi chyba o uzycie for-a 1x, a nie o 1 iteracje/obrot for-a)

/** 
* zwraca min i max z tabeli uzywajac for-a tylko 1x
* @param {Array<Number>} liczby - tablica liczb
* @return {Array<Number, Number>} zwaraca tablice [min, max]
*/
function zwrocMinAndMax(liczby) {
    // ustawiam min i maxa na ost wart z tablicy (zmniejsza tablice inplace)
    let min = max = liczby.pop();
    // szukam min i max w 1 przejsciu for-a
    for (let i = 0; i < liczby.length; i++) {
        if (liczby[i] < min) {
            min = liczby[i];
        }
        if (liczby[i] > max) {
            max = liczby[i];
        }
    }
    return [min, max];
}

// jakis bug w VS Code, console.log()
// nie drukuje prawidlowo Array-sow w Debug Console
console.log(zwrocMinAndMax(cyfry).toString());

// 5. Choose longest string from the array.
// [‘Karol’, ‘Adam’,’Rogowski’,’Politechnika’,’Super’,’Weekend’]. 
// tylko 1, czy kilka w przypadku remisow?! (wezme kilka)
let tabStringow = ["Karol", "Adam", "Rogowski",
    "Politechnika", "Super", "Weekend"];

/** 
* Zwraca tablice z najdluzszym stringiem/ami lub [] (jesli input to [])
* @param {Array<String>} tabStringow - tablica stringow
* @return {Array<String>} tabNajdlStringow - tablica najdluzszych stringow
* (String-i) lub []
*/
function zwrocNajdlStringi(tabStringow) {
    // przy pustej tablicy tabDlStringow to []
    let tabDlStringow = tabStringow.map((s) => s.length);
    // przy pustej tablicy dlMax to -Infinity
    let dlMax = Math.max(...tabDlStringow); // ...Array to wypakowanie
    // jesli pusta tablica to brak stringow do zwrotu
    // czyli zwraca pusta tablice
    return tabStringow.filter((s) => s.length === dlMax);
}

// jakis bug w VS Code, console.log()
// nie drukuje prawidlowo Array-sow w Debug Console
console.log(zwrocNajdlStringi(tabStringow).toString());

// 6. Choose all the indexes on the highest value from the given array.
// [1,6,23,8,4,98,3,7,3,98,4,98].

/** 
* zwraca tabele z indeksem/ami max-a/ow w danym array-u (input)
* @param {Array<Number>} liczby - tablica liczb
* @return {Array<Number>} tabIndxyMaxow - indeksy max-a/ow w tablicy liczby
*/
function zwrocIndxyMaxow(liczby) {
    let maxZtab = Math.max(...liczby);
    let tabIndxyMaxow = [];
    for (let i = 0; i < liczby.length; i++) {
        if (liczby[i] === maxZtab) {
            tabIndxyMaxow.push(i);
        }
    }
    return tabIndxyMaxow;
}

// jakis bug w VS Code, console.log()
// nie drukuje prawidlowo Array-sow w Debug Console
console.log(zwrocIndxyMaxow(cyfry).toString());


// 7. Calculate average value from the given array for even numbers
// [1,6,23,8,4,98,3,7,3,98,4,98]

/** 
* liczy srednia z liczb parzystych w tabeli
* @param {Array<Number>} liczby - tabela liczb
* @return {Number} srednia z liczb parzystych z tabeli
*/
function liczSrParzystych(liczby) {
    let tabParzyste = liczby.filter((a) => a % 2 === 0);
    let sumaParz = tabParzyste.reduce((a, b) => a + b, 0);
    return sumaParz / tabParzyste.length;
}

console.log(liczSrParzystych(cyfry));

// 8. Calculate average value of items at even indexes.
// Zero is not considered to be even number. [1,6,23,8,4,98,3,7,3,98,4,98]

/** 
* liczy srednia liczb z tablicy, dla liczb na parzystych indeksach (> 1)
* @param {Array<Number>} liczby - tablica liczb
* @return {Number} srednia liczb z indeksow parzystych powyzej 1
*/
function liczSrNaParzInd(liczby) {
    let tabLiczbZparzInd = [];
    for (let i = 2; i < liczby.length; i += 2) {
        tabLiczbZparzInd.push(liczby[i]);
    }
    let suma = tabLiczbZparzInd.reduce((a, b) => a + b, 0);
    return suma / tabLiczbZparzInd.length;
}

console.log(liczSrNaParzInd(cyfry));

// 9. With a given start value of 0.
// Iterate the array and add even items and subtract odd ones.
// [1,6,23,8,4,98,3,7,3,98,4,98]

/** 
* wykonuje dzialanie: sum(all_even) - sum(all_odd) dla danej tab wejsciowej
* @param {Array<Number>} liczby - tabela liczb
* @return {Number} wynik dzialania: sum(all_even) - sum(all_odd)
*/
function dodParzOdejmNparz(liczby) {
    let tabParzyste = liczby.filter((a) => !czyNparz(a));
    let tabNparzyste = liczby.filter((a) => czyNparz(a));
    let sumParz = tabParzyste.reduce((a, b) => a + b, 0);
    let sumNparz = tabNparzyste.reduce((a, b) => a + b, 0);
    return sumParz - sumNparz;
}

console.log(dodParzOdejmNparz(cyfry));