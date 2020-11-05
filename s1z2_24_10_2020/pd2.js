/////////////////
// Praca domowa z dnia 24-10-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// funkcje nie sa optymalizowane pod katem szybkosci
/////////////////

// ARRAY: [1,6,23,8,4,8,3,7]
const tab = [1, 6, 23, 8, 4, 8, 3, 7];

// 1) Create a function that returns the sum of all elements passed in
// array as parameter. Function (array)=>number

/**
 * zwraca sume cyfr w tablicy
 * @param {Array<Number>} tablica - tablica liczb
 * @return {Number} suma wszystkich liczb w tablicy
 */
function sumTab(tablica) {
    // return tablica.reduce((a, b) => a + b, 0);
    //
    // lub tradycyjne (for-owe) podejscie
    let suma = 0;
    for (let i = 0; i < tablica.length; i++) {
	suma += tablica[i];
    }
    return suma;
}

console.log("suma liczb w tablicy " + tab + " wynosi: " + sumTab(tab));

// 2) Create a function that returns sum of first and last elements of
// given array.

/**
 * zwraca pierwszy i ostatni element tablicy
 * @param {Array} tablica - tablica jakichs elementow
 * @return {Array} tabWynik z 1 i ostatnim elt tablicy wejsciowej
 */
function retFirstLast(tablica) {
    return [tablica[0], tablica[tablica.length-1]];
}

console.log("\npierwszy i ostatni element tablicy " + tab + " to: " +
	    retFirstLast(tab));

// 3) Create a function that takes a number and return factorial of that number.

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

console.log("\n5! to " + silniaFor(5));
console.log("6! to " + silniaRek(6));

// 4) Create a function that returns given array in reverse order. //
// no build in functions :)

/**
 * zwraca tablice z kolejnosci elementow odwrotna niz w tablicy wejsciowej
 * @param {Array} tablica - tablica wejsciowa
 * @return {Array} tablica wyjsciowa (odwrocona w stos do wejsciowej)
 */
function reverseArray(tablica) {
    let tabOdwr = [];
    for (let i = (tablica.length - 1); i >= 0; i--) {
	tabOdwr.push(tablica[i]);
    }
    return tabOdwr;
}

console.log("\nodwrocona tablica " + tab + " to: " + reverseArray(tab));

// 5) Create a function that based on given array returns new array in
// pattern [a,b,c,d,e,f] -> [a+b, c+d, e+f] [1,3,4,1,0,3] => [4,5,3]
// function(array)=>array
// nie zdefiniowane co zrobic z tabl o dl nieparzystej (sam cos wymysle)

/**
 * f. pom - przyjmuje elt tablicy zwraca ten elt lub 0 (jesli otrzyma undefined)
 * @param {Number} eltTabl - element tablicy (Int lub undefined)
 * @return {Number} eltTabl lub 0 (bo np. tab[-1] da undefined)
 */
function eltLub0(eltTbl) {
    if (eltTbl === undefined) {
	return 0;
    } else {
	return eltTbl;
    }
}

/**
 * zwraca zredukowana tablice [id[0] + id[1], id[2] + id[3], itd.]
 * dla tablicy o dlugosci nieparzystej mamy last_elt + 0
 * @param {Array<Number>} tablica - tablica liczb
 * @return {Array<Number>} tab zred [id[0] + id[1], id[2] + id[3], itd.]
 */
function reduceArray(tablica) {
    let tabZred = [];  // dla [] na wejsciu zwroci [] na wyjsciu
    for (let i = 0; i < tablica.length; i += 2) {
	tabZred.push(tablica[i] + eltLub0(tablica[i+1]));
    }
    return tabZred;
}

console.log("\nzredukowana tablica " + tab + " to " +
	    reduceArray(tab));

// 6) For time of this example remove last element from the given
// array. Create a function that based on given array return new array
// in pattern [a,b,c,d,e] -> [a+b, c+d, e+e]
// Troche niejasne polecenie usuwac, czy dodac do siebie?

/**
 * redukuj Tab wg. wzoru [a, b, c, d] => [a+b, c+d]
 * [a, b, c, d, e] => [a+b, c+d]
 * @param {Array<Number>} tablica - tablica liczb
 * @return {Array<Number>} tablica liczb (zredukowana wg. wzoru)
 */
function reduceArray2(tablica) {
    let dlTab = tablica.length;
    if (dlTab % 2 !== 0) {
	tablica.pop();
    }
    return reduceArray(tablica);
}

console.log("\nzredukowana tablica " + [1, 2, 3, 4, 5] + " (met2) to: " +
	    reduceArray2([1, 2, 3, 4, 5]));

/**
 * redukuj Tab wg. wzoru [a, b, c, d] => [a+b, c+d]
 * [a, b, c, d, e] => [a+b, c+d, e+e]
 * @param {Array<Number>} tablica - tablica liczb
 * @return {Array<Number>} tablica liczb (zredukowana wg. wzoru)
 */
function reduceArray3(tablica) {
    let dlTab = tablica.length;
    if (dlTab % 2 !== 0) {
	tablica.push(tablica[dlTab-1]);
    }
    return reduceArray(tablica);
}

console.log("\nzredukowana tablica " + [1, 2, 3, 4, 5] + " (met3) to: " +
	    reduceArray3([1, 2, 3, 4, 5]));


// 7) Create a function the return one random element from given
// array. // use random function

/**
 * fn pomocn - zwraca liczbe (Int) z zakresu 0 do n (incl-excl)
 * @param {Number} n - liczba (Int), gorna granica zakresu (exclusive)
 * @return {Number} losowa liczba (Int) z zadanego zakresu
 */
function getIntToN(n) {
    // Math.random() - od 0 do 1
    // * length aby gorny zakres, floor aby zakres byl od 0 do length-1
    return Math.floor(Math.random() * n);
}


/**
 * zwraca losowy elt tablicy
 * @param {Array} tablica - jakas tablica
 * @return {} wylosowana wartosc
 */
function getRandomElt(tablica) {
    let indeks = getIntToN(tablica.length);
    return tablica[indeks];
}

console.log("\nz tablicy " + tab + " wylosowalem: " +
	    getRandomElt(tab));

// 8) Create a function that takes two parameters: array and number
// off attempts. Based on number of attempts choose a random number
// from table that many times and return lowest one.

/**
 * losuje losowa wartosc z tablicy n*, zwraca najmniejsza wylos wartosc
 * losuje ze zwracaniem, wiec n > tablica.length jest OK
 * @param {Array<Number>} tablica - tablica liczb
 * @param {Number} proby - tyle razy losuje losowy elt z tablicy
 * @return {Number} najmniejsza z wylosowanych wartosci
 */
function getLowestRandom(tablica=[1,2,3], proby=5) {
    let tabWylosowanych = [];
    for (let i = 0; i < proby; i++) {
	tabWylosowanych.push(getRandomElt(tablica));
    }
    return Math.min(...tabWylosowanych);
}

console.log("\nz tablicy " + tab + " losuje 5x 1 elt ze zwracaniem.\n" +
	    "Najmniejszy wylosowany elt to: " + getLowestRandom(tab, 5));

// 9) Create a function that takes given array. Then takes a random
// element, removes it from the array and pushes it to result
// arrays. This takes place as long as there are elements in source
// array.
let tab2 = [1, 6, 23, 8, 4, 8, 3, 7];

/**
 * miesza (tasuje) array
 * @param {Array} tablica - tablica jakichs elementow
 * @return {Array} pomieszana/potasowana tablica wejsciowa
 */
function shuffleArray(tablica) {
    let tabWyn = [];
    while(tablica.length !== 0) {
	tabWyn.push(tablica.splice(getIntToN(tablica.length), 1)[0]);
    }
    return tabWyn;
}

console.log("\nPomieszana tablica wejsciowa: "
	    + tab2 + " => " + shuffleArray(tab2));

// 10) Create a function that on given array will perform operation of
// adding or subtracting elements. Operation is to be chosen at
// random. And return a result.[a,b,c,d] =>(((a+-b)+-c)+-d)

/**
 * dodaje lub odejmuje od siebie poszczegolne elementy z tablicy liczb
 * @param {Array<Number>} tablica - tablica liczb
 * @return {Number} wynik przeprowadzonych operacji
 */
function AddOrSubTabElts(tablica) {
    let wynik = tablica[0];
    for (let i = 1; i < tablica.length; i++) {
	// getIntToN zwraca 0, 1, 2, lub 3, czyli 50%/50% dla -/+
	if (getIntToN(4) > 1) {
	    wynik -= tablica[i];
	} else {
	    wynik += tablica[i];
	}
    }
    return wynik;
}

console.log("\nlosowe dod/odejm elt-ow tablicy " + tab +
	    " zwraca: " + AddOrSubTabElts(tab));

// 11) Create a function that will return the current day name in Polish.
/**
 * zwraca aktualny dzien tygodnia w j. polskim
 * @return {String} aktualny dzien tygodnia
 */
function getDzienTyg() {
    const dni = {0: "Niedziela", 1: "Poniedzialek", 2: "Wtorek", 3: "Sroda",
	     4: "Czwartek", 5: "Piatek", 6: "Sobota"};
    let dzienCyfra = new Date().getDay(); // 0 to Niedziela
    return dni[dzienCyfra];
}

console.log("\nDzis jest " + getDzienTyg());

// 12) Create a function that tells us how many days till Friday

/**
 * zwraca ilosc dni od dzis (dz tyg) do danego dn tyg, liczy do przodu,
 * czyli od Sb (dzis) do Pt (cel) jest 6 dni (Nd, Pn, Wt, Sr, Czw, Pt)
 * @param {Number} dzis - Int 0-6 (dzien tygodnia, 0 - niedziela, 6 - sobota)
 * @return {Number} Int 0-6, ile dni zostalo (0 - dzis jest dzien docelowy)
 */
function getLbDniDo(dzis=new Date().getDay(), dzienDocelowy=5) {
    // 0 to Niedziela, 5 to Piatek
    if (dzis <= dzienDocelowy) {
	return dzienDocelowy - dzis;
    } else {
	// 7 dni caly cykl - l. dni o ktore juz przekroczylismy
	return 7 - (dzis - dzienDocelowy);
    }
}

console.log("\nDo piatku zostalo: " + getLbDniDo() + " [dzien|dni]");

// 13) Create a function that take two numbers and return the object
// with 4 fields. Result on 4 basic arithmetic operations.

// w JS-ie to obiekt, ale w Pythonie bylby to slownik
const funDict = {"+": (a, b) => a+b,
               "-": (a, b) => a-b,
               "*": (a, b) => a*b,
               "/": (a, b) => a/b};


/**
 * wykonuje zestaw funkcji na 2 liczbach, zwraca tab wynikow
 * @param {Number} x - pierwszy argument fn dwu-argumentowej
 * @param {Number} y - drugi argument fn dwu-argumentowej
 * @param {Object} funkcje - obiekt funkcji postaci {"fnLab": lambda}
 * @return {Object} obiekt postaci {"fnLab": wynik_fn<Number>}
 */
function wykFunNaLb(x, y, funkcje=funDict) {
    let wynDict = new Object();
    // Object.keys(wynDict) to array kluczy (stingow)
    for (klucz of Object.keys(funDict)) {
        wynDict[klucz] = funDict[klucz](x, y);
    }
    return wynDict;
}

console.log("4 podst op. matem. dla liczb: " + 1 + " i " + 2 +
            " daja nastepujace wyniki: " + JSON.stringify(wykFunNaLb(1, 2)));

