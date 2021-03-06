var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
///////////////////////////////////////////////////////////////////////////////
//                                  zmienne                                  //
///////////////////////////////////////////////////////////////////////////////
// tabela osob w jaskini (numerki)
var people = [];
// nadanie imion/id osobom w jaskini (1-7, incl-incl)
for (var i = 1; i < 8; i++) {
    people.push(i);
}
// Karol sugerowal aby zamiast modyfikacji tablicy inplace
// dac podejscie funkcyjne, dobra uwaga, so here we go...
///////////////////////////////////////////////////////////////////////////////
//                                  funkcje                                  //
///////////////////////////////////////////////////////////////////////////////
/**
 * imituje zabicie jednej osoby z jaskini przez druga osobe
 * informacje o zdarzeniu wyswietla na ekranie
 * zawsze pierwsza osoba na liscie (index 0)
 * zabija druga osobe na liscie (index 1)
 * po czym sama idzie na koniec kolejki
 */
function killPerson(curPeople) {
    // kopia tablicy wejsciowej
    var tmpPeople = __spreadArrays(curPeople);
    // komunikat o zabiciu (kto => kogo)
    console.log(tmpPeople[0] + " kills " + tmpPeople[1]);
    // array.slice(start, [stop]) nie modyfikuje tablicy
    // if no stop, then stop=array.length
    // usuwanie osoby zabitej, indeks 1
    tmpPeople = __spreadArrays([tmpPeople[0]], tmpPeople.slice(2));
    // przesuniecie zabijajacego (indeks 0) na koniec kolejki
    tmpPeople = __spreadArrays(tmpPeople.slice(1), [tmpPeople[0]]);
    return tmpPeople;
}
/**
 * imituje caly ciag zabic, az zostanie 1 osoba w jaskini
 * kazde zabicie wyswietla informacje (funkcja killPerson())
 * zakonczenie zabijania wyswietla informacje o tym kto przezyl
 */
function getSurvivor(curPeople) {
    // kopia tablicy wejsciowej
    var survivors = __spreadArrays(curPeople);
    while (survivors.length > 1) {
        survivors = killPerson(survivors);
    }
    return survivors[0];
}
///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
console.log("Poczatkowo w jaskini sa: ");
console.log(people.toString() + "\n");
console.log("zaczynamy zabijanie do ostatniego zywego\n");
console.log(getSurvivor(people), "remains alive");
