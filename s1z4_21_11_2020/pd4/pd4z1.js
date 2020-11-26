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
console.log("tomek po odwroceniu daje: " + "tomek".reverse()); //
