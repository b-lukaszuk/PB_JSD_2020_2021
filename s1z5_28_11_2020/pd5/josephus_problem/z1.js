"use strict";
exports.__esModule = true;
var person_1 = require("./person");
// lista osob w jaskini
var people = [];
for (var i = 1; i < 8; i++) {
    people.push(new person_1.Person(i));
}
console.log("liczba osob na poczatku: ");
console.log(people.map(function (pers) { return pers.getId(); }));
// zawsze 1 osoba na liscie zabija druga osobe na liscie
// a sama przechodzi na koniec listy
function killPerson() {
    // komunikat o zabiciu (kto kogo)
    console.log(people[0].getId().toString() +
        " kills " +
        people[1].getId().toString());
    // splice usuwa INPLACE
    people.splice(1, 1);
    // przesuniecie na koniec kolejki
    // splice usuwa INPLACE,
    // zwraca tez usuniety element(y) jako array (chocby 1 elementowy)
    var persToEndOfLine = people.splice(0, 1)[0];
    people.push(persToEndOfLine);
}
function killThemAll() {
    if (people.length === 1) {
        console.log(people[0].getId().toString() + " remains alive.");
        return; // domyslnie zwraca undefined
    }
    else {
        killPerson();
        killThemAll();
    }
}
killThemAll();