import { Person } from './person'

// lista osob w jaskini
let people: Array<Person> = [];

// nadanie imion/id osobom w jaskini
for (let i = 1; i < 8; i++) {
    people.push(new Person(i));
}

console.log("liczba osob na poczatku: ");
console.log(people.map((pers) => pers.getId()));

/**
* imituje zabicie jednej osoby z jaskini przez druga osobe
* informacje o zdarzeniu wyswietla na ekranie
* zmienia INPLACE tabele people
* zawsze pierwsza osoba na liscie (index 0) 
* zabija druga osobe na liscie (index 1)
* po czym sama idzie na koniec kolejki
*/
function killPerson(): void {

    // komunikat o zabiciu (kto => kogo)
    console.log(
	people[0].getId().toString() +
	" kills " +
	people[1].getId().toString()
	);

    // metoda splice usuwa INPLACE
    people.splice(1, 1);

    // przesuniecie na koniec kolejki
    // splice usuwa INPLACE,
    // zwraca tez usuniety element(y) jako array (chocby 1 elementowy)
    let persToEndOfLine: Person = people.splice(0, 1)[0];
    people.push(persToEndOfLine);
}

/**
* imituje caly ciag zabic, az zostanie 1 osoba w jaskini
* kazde zabicie wyswietla informacje (funkcja killPerson())
* zakonczenie zabijania wyswietla informacje o tym kto przezyl
* zmienia INPLACE tabele people
* wykorzystuje rekursje/rekurencje
*/
function getSurvivor(): void {
    if (people.length === 1) {
	console.log(people[0].getId().toString() + " remains alive");
	// return potrzebne aby kiedys zakonczyc rekurencje
	return // domyslnie zwraca undefined
    } else {
	killPerson();
	getSurvivor();
    }
}

getSurvivor();
