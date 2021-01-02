/////////////////
// zadanie zaliczeniowe z dnia 28-11-2020 zadane przy okazji pracy domowej
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// lekko opytmalizowane, pisane w typeScript
// zrobiono dla siebie, juz po otrzymaniu zaliczenia (5.0)
/////////////////


// 2)(EXAM) Solve sudoku

// background do rozwiazania:
// szybkie googlowanie, 10-15 min na pomysl i podstawy
// potem pisanie z glowy, na podstawie pomyslu z neta
// oczywiscie, wczesniej napisano rozw dla sudoku lvl easy (tylko)


// sudoku z zadania prowadzacego, lvl: beginner
// sudoku to tablica tablic (9 tablic 9 elementowych)
// 0 to puste pole
let sudoku1: Array<Array<number>> = [
    [7, 0, 4,       8, 0, 0,       3, 0, 1],
    [8, 2, 0,       5, 0, 0,       0, 4, 0],
    [0, 0, 9,       4, 3, 0,       5, 0, 0],

    [3, 1, 0,       0, 0, 0,       8, 0, 7],
    [0, 8, 0,       0, 0, 0,       0, 1, 0],
    [9, 0, 7,       0, 0, 0,       0, 3, 2],

    [0, 0, 6,       0, 1, 5,       4, 0, 0],
    [0, 7, 0,       0, 0, 9,       0, 6, 5],
    [5, 0, 8,       0, 0, 2,       1, 0, 3]
];


// inne sudoku z neta, do testu, level: (very) easy?
// sudoku to tablica tablic (9 tablic 9 elementowych)
// 0 to puste pole
let sudoku2: Array<Array<number>> = [
    [3, 0, 6,      0, 1, 0,      7, 0, 0],
    [0, 7, 0,      5, 0, 8,      0, 0, 0],
    [9, 0, 0,      0, 6, 0,      0, 0, 0],

    [0, 9, 0,      6, 0, 0,      5, 0, 3],
    [0, 0, 0,      9, 0, 5,      0, 0, 0],
    [1, 0, 5,      0, 0, 4,      0, 6, 0],

    [0, 0, 0,      0, 4, 0,      0, 0, 1],
    [0, 0, 0,      2, 0, 3,      0, 8, 0],
    [0, 0, 9,      0, 8, 0,      2, 0, 5]
];


// sudoku z neta, level: Expert
// sudoku to tablica tablic (9 tablic 9 elementowych)
// 0 to puste pole
let sudoku3: Array<Array<number>> = [
    [6, 0, 0,       0, 3, 1,       9, 0, 0],
    [8, 0, 0,       0, 0, 0,       0, 0, 0],
    [0, 0, 4,       8, 0, 7,       0, 0, 0],

    [0, 0, 0,       0, 8, 0,       0, 0, 0],
    [4, 5, 0,       0, 6, 0,       3, 0, 0],
    [9, 8, 0,       0, 0, 0,       5, 6, 0],

    [0, 0, 0,       0, 0, 0,       0, 0, 5],
    [1, 0, 0,       4, 9, 6,       0, 3, 0],
    [0, 0, 0,       0, 0, 0,       0, 0, 0]
];

/**
 * fun. pomocn., drukuje sudoku do konsoli
 * @param {Array<Array<number>>} sudoku, tablica 9 tablic 9 elementowych
 */
function prntSudoku(sudoku: Array<Array<number>>): void {
    // linia otwierajaca (pierwsza z gory)
    console.log("-------------------------");

    // iteracja po wierszach sudoku (9 tablic 9-cio elementowych)
    for (let w = 0; w < 9; w++) {
	let wierszDoDruku: string = "| "; // bok najbardziej od lewej

	// iteracja po kolumnach sudoku (9 tablic 9-cio elementowych)
	for (let k = 0; k < 9; k++) {
	    let poleDoDruku: string;
	    if(sudoku[w][k] === 0) {
		poleDoDruku = " "; // padding dla 0
	    } else {
		poleDoDruku = sudoku[w][k].toString();
	    }
	    wierszDoDruku += poleDoDruku + " ";
	    // co 3 kolumny prawy bok kwadratu 3x3
	    // w if-ie +1 bo inaczej indeks od 0 zaburza artymetyke z modulo
	    if ((k + 1) % 3 === 0) {
		wierszDoDruku += "| ";
	    }
	}
	console.log(wierszDoDruku);
	// co 3 wiersze dol boku kwadratu 3x3
	// w if-ie +1 bo indeks od 0 zaburza artymetyke z modulo
	if ((w + 1) % 3 === 0) {
	    console.log("-------------------------");
	}
    }
}

/**
 * fn. pomocn.
 * sprawdza, czy mozliwe jest wstawienie danej liczby w dane pole sudoku
 * w nawiasach (incl-incl)
 * @param {Array<Array<number>>} sudoku - sudoku ktore sprawdzamy
 * @param {number} w - Int (0-8) wiersz sudoku (9x9)
 * @param {number} k - Int (0-8) kolumna sudoku (9x9)
 * @param {number} n - Int (1-9), cyfra ktorej legalnosc wstawienia sprawdzamy
 * @return {Boolean} - true|false - dla wstaw danej cyfry w dane pole
 */
function isPossible(sudoku: Array<Array<number>>,
		    w: number, k: number, n: number): Boolean {
    // spr czy cyfra (n) z nie wyst juz w gdzie indziej w swoim wierszu
    // wlaczajac to siebie samego (czyli pole [w,k])
    for (let i = 0; i < 9; i++) {
	if (sudoku[w][i] === n) {
	    return false;
	}
    }
    // spr czy cyfra (n) z nie wyst juz w gdzie indziej w swojej kolumnie
    // wlaczajac to siebie samego (czyli pole [w,k])
    for (let i = 0; i < 9; i++) {
	if (sudoku[i][k] === n) {
	    return false;
	}
    }
    // spr czy cyfra (n) z nie wyst juz w gdzie indziej w swoim kwadracie 3x3
    // `Math.floor(w|k / 3)` => 0|1|2, np. (Python-like): 2//3=0, 4//3=1, 8//3=2
    // `Math.floor(w|k / 3)*3` => 0|3|6
    // (indeksy 1 pola (wiersz/kolumna sudoku) rozpocz kw3x3 w kw9x9
    // popatrzec na rys sudoku, aby lepiej zrozumiec
    let w0: number = Math.floor(w/3)*3;
    let k0: number = Math.floor(k/3)*3;

    for (let r = 0; r < 3; r++) { // row
	for (let c = 0; c < 3; c++) { // columns
	    // iteruje po wszyskich wierszach/kolumnach danego kwadratu 3x3
	    if (sudoku[w0+r][k0+c] === n) {
		return false;
	    }
	}
    }
    return true;
}

/**
 * fn. pomocn.
 * sprawdza czy dane sudoku zostalo juz rozwiazane
 * ponizej cyfry w nawiasach jako (incl-incl)
 * @param {Array<Array<number>>} sudoku - tablica 9 tablic (kazda 9 liczb)
 * @return {Boolean} true|false dla rozwiazania sudoku
 */
function isSolved(sudoku: Array<Array<number>>): Boolean {
    // rozwiazany kwadrat 3x3 zawiera wszystkie cyfry z zakresu 1-9
    // z R-a: sum(1:9) => 45
    // mamy 9 kwadratow 3x3, wiec: 45*9 => 405
    let suma: number = 0;
    for (let w = 0; w < 9; w++) {
	for (let k = 0; k < 9; k++) {
	    suma += sudoku[w][k];
	}
    }
    if (suma === 405) {
	return true;
    } else {
	return false;
    }
}

/**
 * rozwiazuje dane sudoku (wypelnia 0/blanki odpowiednimi cyframi 1-9)
 * w trakcie zmienia otrzymana tablice inplace, ale cofa ruchy,
 * wiec ostatecznie tablica zostaje nie zmieniona
 * uzywa rekurencji
 * jako input zalecane sa poprawne sudoku (z 1 rozwiazaniem)
 * inaczej bedzie drukowac wszystkie mozliwe rozwiazania
 * ponizej cyfry w nawiasach sa (incl-incl)
 * @param {Array<Array<number>>} sudoku - sudoku do rozwiazania
 * sudoku to tablica 9 tablic, kazda z tych tablic zawiera 9 eltow cyfry (0-9)
 */
function solve(sudoku: Array<Array<number>>): void {
    for (let r = 0; r < 9; r++) { // rows tab9x9
	for (let c = 0; c < 9; c++) { // columns tab9x9
	    // przejdz po wszystkich pustych polach (0 w srodku)
	    if (sudoku[r][c] === 0) {
		// sprawdz mozliwosc wstawienia cyfr (1-9) w dane puste pole
		for (let i = 1; i < 10; i++) {
		    if (isPossible(sudoku, r, c, i)) {
			// wyprobuj dana mozliwa wartosc (wstaw zamiast 0/pusty)
			sudoku[r][c] = i;
			// jesli to rozw cale sudoku to je wydrukuj
			if (isSolved(sudoku)) {
			    console.log("znaleziono rozwiazanie:");
			    prntSudoku(sudoku);
			    return // zwraca undefined
			}
			// rozwiaz reszte sudoku przy tej wstaw wartosci `i`
			solve(sudoku);
			// jesli sie nie uda z ta mozliwa wartoscia (1-9) z `i`
			// to to pole ustaw ponownie na 0 (puste), czyli resetuj
			// i sprawdz w reszcie for-a z `let i` (dalsze iteracje)
			// czy inne wartosci pasuja
			sudoku[r][c] = 0;
		    }
		}
		// zadna z wartosci od 1 do 9 nie pasuje dla danego pustego pola
		return // zwraca undefined
	    }
	}
    }
    // po przejsciu przez wszystkie pola tab9x9
    return // zwraca undefined
}

console.log("sudoku 1, uklad poczatkowy");
prntSudoku(sudoku1);
solve(sudoku1);
console.log("======");

console.log("\nsudoku 2, uklad poczatkowy");
prntSudoku(sudoku2);
solve(sudoku2);
console.log("======");

console.log("\nsudoku 3, uklad poczatkowy");
prntSudoku(sudoku3);
solve(sudoku3);
console.log("======");
