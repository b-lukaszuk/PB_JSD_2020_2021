import {Pole1x1} from "./pole1x1"

/**
 * klasa reprezentujaca kwadrat9x9 skladajacy sie z 81 obiektow klasy pole1x1
 */
class Kwadrat9x9 {
    private tabPol1x1: Array<Pole1x1> = [];
    private allKw3x3Ids: Array<string> = [];

    /**
     * konstruktor kwadratu9x9 zlozonego z pol1x1
     * @param {Array<number>} tab9x9 - tab Int-ow do zamiany na pola1x1
     */
    public constructor(tab9x9: Array<number>) {
	// iteracja po wierszach tab9x9 (input)
	for (let w = 0; w < 9; w++) {
	    // iteracja po kolumnach tab9x9 (input)
	    for (let k = 0; k < 9; k++) {
		let id: number = 9 * w + k; // id tabPol1x1, 81 eltow [0-80]
		let idKw3x3: string = this.getIdKw3x3(w, k); // id kwadratu3x3
		// jesli akt idKw3x3 nie ma w this.allKw3x3Ids to go dodaj
		if (this.allKw3x3Ids.indexOf(idKw3x3) === -1) {
		    this.allKw3x3Ids.push(idKw3x3);
		}
		this.tabPol1x1.push(new Pole1x1(tab9x9[id], w, k, idKw3x3));
	    }
	}
    }

    /**
     * met pom - do tworzenia id Kw3x3
     * @param {number} num - Int (0-8) - kolumna lub wiersz Kw9x9
     * @returns {string} "a" | "b" | "c" (co 3 num-y)
     */
    private abc(num: number): string {
	if (num > 5) { // 6, 7, 8
	    return "c";
	} else if (num > 2) { // 3, 4, 5
	    return "b";
	} else { // 0, 1, 2
	    return "a";
	}
    }

    /**
     * met. pom. - zwraca id kw3x3 ("aa"-"cc")
     * @param {number} w - Int (0-8) - wiersz Kw9x9
     * @param {number} k - Int (0-8) - kolumna Kw9x9
     * @returns {string} id kw3x3 ("aa"-"cc")
     */
    private getIdKw3x3(w: number, k: number): string {
	return this.abc(w) + this.abc(k);
    }

    /**
     * getter zwraca tab pol1x1, po kol/wier/idKw3x3
     * @param {number|string} id - Int (0-8) dla kol i wier, "aa-cc" dla idKw3x3
     * @param {string} typ - "k" | "w" | "id", po czym zwracac pola
     * @returns {Array<Pole1x1>} tab pol1x1 po kol/wier/idKw3x3
     */
    private getPolBy(id: number|string, typ: string): Array<Pole1x1> {
	if(typ === "k") {
	    return this.tabPol1x1.filter((p) => p.getKol() === id);
	} else if (typ === "w") {
	    return this.tabPol1x1.filter((p) => p.getWier() === id);
	} else {
	    return this.tabPol1x1.filter((p) => p.getKw3x3() === id);
	}
    }

    /**
     * getter, zwraca tab zajetych wartosci po kol/wier/idKw3x3
     * @param {number|string} id - (0-8) dla k/w, lub "aa"-"cc" dla idKw3x3
     * @param {string} typ - "k" | "w" | "kw3x3", po czym zwracamy
     * @returns {Array<number>} tab wart pol z kol/wier/kw3x3
     */
    private getZajBy(id: number | string, typ: string) {
	let pola: Array<Pole1x1> = this.getPolBy(id, typ);
	return pola.map((p) => p.getVal())
	    .filter((num) => num !== 0);
    }

    /**
     * setter, update-uje kandydatow w polach1x1 na podst zaw. kol/wier/idKw3x3
     * @param {number|string} id - (0-8) dla k/w, lub "aa"-"cc" dla idKw3x3
     * @param {string} typ - "k" | "w" | "kw3x3", po czym zwracamy
     */
    private updKandBy(id: number | string, typ: string): void {
	let zajete: Array<number> = this.getZajBy(id, typ);
	this.getPolBy(id, typ).forEach((p) => p.usNumsZKand(zajete))
    }


    /**
     * setter, update-uje kandydatow we wszystkich polach1x1
     * iterujac kolejno po kazdym wierszu, kolumnie i kwadracie3x3
     */
    private updAllKand(): void {
	for (let i = 0; i < 9; i++) {
	    this.updKandBy(i, "w");
	    this.updKandBy(i, "k");
	    this.updKandBy(this.allKw3x3Ids[i], "kw3x3");
	}
    }

    /**
     * setter, update-uje wartosci we wszystkich polach1x1
     * na podstawie zupdateowanej tab kandydatow w polu1x1
     */
    private updAllVals(): void {
	this.tabPol1x1.forEach((p) => {
	    if (p.getKand().length === 1) {
		p.setVal(p.getKand()[0]);
	    }
	});
    }

    /**
     * sprawdza, czy sudoku jest rozwiazane
     */
    private isSolved(): boolean {
	// w kwadracie3x3 may cyfry 1-9 (incl-incl)
	// z R-a: sum(1:9) => 45
	// mamy 9 kwadratow3x3, wiec sum(1:9)*9 => 405
	let sumaPol: number = this.tabPol1x1
	    .map((p) => p.getVal())
	    .reduce((acc, cur) => acc + cur);
	return sumaPol === 405;
    }


    /**
     * rozwiazywacz sudoku
     * @param {number} nIter - Int (liczba iteracji), tj. update-ow pol1x1
     */
    public solveSudoku(nIter = 100): void {
	for (let i = 0; i < nIter; i++) {
	    this.updAllKand();
	    this.updAllVals();
	    if (this.isSolved()) {
		console.log("rozwiazano po " + i + " iter");
		break;
	    }
	}
    }


    /**
     * druker, drukuje aktualny stan sudoku w konsoli
     */
    public print() {
	// linia otwierajaca (pierwsza z gory)
	console.log("-------------------------");

	// iteracja po wierszach
	for (let w = 0; w < 9; w++) {
	    let wierszDoDruku = "| "; // bok najbardziej od lewej

	    // iteracja po kolumnach
	    for (let k = 0; k < 9; k++) {
		let id = 9 * w + k; // id z tabPol1x1
		wierszDoDruku += this.tabPol1x1[id].getVal() + " ";
		// co 3 kolumny prawy bok kwadratu 3x3
		// +1 bo inaczej indeks od 0 zaburza artymetyke z modulo
		if ((k + 1) % 3 === 0) {
		    wierszDoDruku += "| ";
		}
	    }
	    console.log(wierszDoDruku);
	    // co 3 wiersze dol boku kwadratu 3x3
	    // +1 bo indeks od 0 zaburza artymetyke z modulo
	    if ((w + 1) % 3 === 0) {
		console.log("-------------------------");
	    }
	}
    }
}

export {Kwadrat9x9}
