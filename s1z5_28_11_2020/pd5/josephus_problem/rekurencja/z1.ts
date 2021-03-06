///////////////////////////////////////////////////////////////////////////////
//                                  zmienne                                  //
///////////////////////////////////////////////////////////////////////////////
// tabela osob w jaskini (numerki)
let people: Array<number> = [];

// nadanie imion/id osobom w jaskini (1-7, incl-incl)
for (let i = 1; i < 8; i++) {
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
function killPerson(curPeople: Array<number>): Array<number> {

    // kopia tablicy wejsciowej
    let tmpPeople: Array<number> = [...curPeople];

    // komunikat o zabiciu (kto => kogo)
    console.log(tmpPeople[0] + " kills " + tmpPeople[1]);

    // array.slice(start, [stop]) nie modyfikuje tablicy
    // if no stop, then stop=array.length

    // usuwanie osoby zabitej, indeks 1
    tmpPeople = [tmpPeople[0], ...tmpPeople.slice(2)];

    // przesuniecie zabijajacego (indeks 0) na koniec kolejki
    tmpPeople = [...tmpPeople.slice(1), tmpPeople[0]];

    return tmpPeople;
}

/**
 * imituje caly ciag zabic, az zostanie 1 osoba w jaskini
 * kazde zabicie wyswietla informacje (funkcja killPerson())
 * zakonczenie zabijania wyswietla informacje o tym kto przezyl
 * wykorzystuje rekursje/rekurencje (mozna tez zrobic for-em)
 */
function getSurvivor(curPeople: Array<number>): number {
    if (curPeople.length === 1) {
        // return potrzebne aby kiedys zakonczyc rekurencje
        return curPeople[0]; // zwraca jedynego ocalalego
    } else {
        // kill person tworzy kopie tablicy
        return getSurvivor(killPerson(curPeople));
    }
}

///////////////////////////////////////////////////////////////////////////////
//                             wykonanie programu                            //
///////////////////////////////////////////////////////////////////////////////
console.log("Poczatkowo w jaskini sa: ");
console.log(people.toString() + "\n");
console.log("zaczynamy zabijanie do ostatniego zywego\n");
console.log(getSurvivor(people), "remains alive");
