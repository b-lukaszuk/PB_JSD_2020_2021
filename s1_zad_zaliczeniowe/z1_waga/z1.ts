/////////////////
// Praca domowa z dnia 07-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// funkcje nie sa optymalizowane pod katem szybkosci
// w sumie to pisane na kolanie (w dniu cwiczen sprawdzajacych)
/////////////////

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 5
//                   zaliczeniowe na inny termin do pokazania?!
///////////////////////////////////////////////////////////////////////////////
// 5) Scale riddle. With 8 balls :) EXAM [1,1,1,1,2,1,1,1]. One of the
// items will be change to two. Indexes are t be chosen at random. Use
// compressions only two times.

// "indexes are t be chosen at random"?
// przyjmuje ze zmieniam losowa wartosc w tabeli na z 1 na 2
// "Use compressions only two times" - chodzi o "comparisons" (porownania)?
// jak mam rozumiec porownanie, tak jak w wazeniu, < lub > lub =
// inaczej jesli same if-y/elsy, boole (a > b) to jest chyba niemozliwe
// utworze wiec funkcje zwazKule - ktora imituje wazenie waga

/**
 * fn. pom. - sumuje elt-y tabeli
 * @param {Array<Number>} tab - tabela numerow
 * @return {Number} suma elementow w tabeli
 */
function sumTab(tab) {
    return tab.reduce((a, b) => a + b, 0);
}

/**
 * fn. pom. - imituje wazenie 2 zestawow kul
 * @param {Array<Number>} tab1 - tab liczb do porownania (lewa str wagi)
 * @param {Array<Number>} tab2 - tab liczb do porownania (prawa str wagi)
 * @return {Number} [-1, 0, 1] - dla tab1 vs. tab (lt, eq, gt)
 */
function zwazKule(tab1, tab2) {
    let sT1 = sumTab(tab1);
    let sT2 = sumTab(tab2);
    if (sT1 < sT2) {
        return -1;
    } else if (sT1 === sT2) {
        return 0;
    } else {
        return 1;
    }
}

let tabWaga = [1, 1, 1, 1, 1, 1, 1, 1];

/**
 * fn pomocn - zwraca liczbe (Int) z zakresu 0 do n (incl-excl)
 * @param {Number} n - liczba (Int), gorna granica zakresu (exclusive)
 * @return {Number} losowa liczba (Int) z zadanego zakresu
 */
function getIntToN(n) {
    // Math.random() - od 0 do 1
    // * n aby gorny zakres, floor aby zakres byl od 0 do n-1
    return Math.floor(Math.random() * n);
}

/**
 * fn. pomocn - wstawia 2 do los ind tabeli wejsciowej robi to inplace
 * @param {Array<Number>} tab - tablica liczb
 * @return {typ_zwracanej_wart} krotki opis zwracanej wartosci
 */
function put2doLosInd(tab) {
    tab[getIntToN(tab.length)] = 2; // wstawia 2 do los ind
}

put2doLosInd(tabWaga);
console.log("twoja waga wyglada nastepujaco: " + tabWaga);

/**
 * fn. pomoc - zwraca tab o ind start (incl) do stop (excl), start < stop
 * nie modyfikuje tabeli wejsciowej
 * @param {Array} tab - tabela (nie moze byc pusta)
 * @param {Number} start - indeks poczatkowy (inclusive)
 * @param {Number} end - indeks koncowy (exclusive)
 * @return {Array} tabela wynikowa z elt z tab wejsc z wybranego zakresu
 */
function tabRange(tab, start, stop) {
    let tabWyn = [];
    for (let i = start; i < stop; i++) {
	tabWyn.push(tab[i]);
    }
    return tabWyn;
}

// dziala, ale nieeleganckie -> do poprawy
/**
 * zwraca indeks 2 w 8 elt tabeli z rep(1, 7) i rep(2, 1)
 * @param {Array<Number>} tab - tablica 8 elt (zawsze), 7 to 1, 1 to 2
 * @return {Number} indeks pod ktorym jest 2
 */
function getInd2(tab) {
    let tab1of3 = tabRange(tab, 0, 3); // pierwsze 3 elty
    let tab2of3 = tabRange(tab, 3, 5); // 2 srodkowe elty
    let tab3of3 = tabRange(tab, 5, 8); // ostatnie 3 elty
    let wynWaz1 = zwazKule(tab1of3, tab3of3);
    if (wynWaz1 === 1) { // ciezka kula jest w 1 czesci
        console.log("2 jest na pocz");
        let wynWaz2 = zwazKule([tab[0]], [tab[1]]);
        if (wynWaz2 === 1) {
            console.log("2 jest pod indeksem 0");
        } else if (wynWaz2 === -1) {
            console.log("2 jest pod indeksem 1");
        } else {
            console.log("2 jest pod indeksem 2");
        }
    } else if (wynWaz1 === 0) { // ciezka kula jest w srodku
        console.log("2 jest w srodku");
        let wynWaz2 = zwazKule([tab[3]], [tab[4]]);
        if (wynWaz2 === 1) {
            console.log("2 jest pod indeksem 3");
        } else {
            console.log("2 jest pod indeksem 4");
        }
    } else { // ciezka kula jest w 3 czesci
        console.log("2 jest na koncu");
        let wynWaz2 = zwazKule([tab[5]], [tab[6]]);
        if (wynWaz2 === 1) {
            console.log("2 jest pod indeksem 5");
        } else if (wynWaz2 === -1) {
            console.log("2 jest pod indeksem 6");
        } else {
            console.log("2 jest pod indeksem 7");
        }
    }
}

getInd2(tabWaga);