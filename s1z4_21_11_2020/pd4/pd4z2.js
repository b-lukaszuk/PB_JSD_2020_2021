/////////////////
// Praca domowa z dnia 21-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// funkcje nie sa optymalizowane pod katem szybkosci
// ver 0.3
/////////////////


///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 2                                 //
///////////////////////////////////////////////////////////////////////////////
// 2) Extend Number type with the reverse() function. The function is
// to reverse the value of the Number on which it was called.

// co to znaczy reverse number, czy tak jak w zad 1 z pd3
// "reverseValue(): If number do (*(-1))", czyli chyba liczba*(-1),
// czy moze tak jak w zad wyzej czyli 123, bedzie 321, zrobmy to 2 dla odmiany

// wykorzystam przeladowanie z poprzedniego zadania (zad 1)
String.prototype.reverse = function() {
    return this.valueOf() // tekst w stringu
	.split("").reverse() // do tabeli i odwr. elt-ow tabeli
	.join(""); // polaczenie tabeli w string
};

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
