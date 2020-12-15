/**
 * klasa reprezentujaca pojedyncze pole sudoku (najmniejszy kwadrat, 1x1)
 */
class Pole1x1 {
    // pola prywatne, znaczenie: patrz docstring konstruktora
    private val: number;
    private w: number;
    private k: number;
    private kw3x3: string;
    // kandydaci, tj. tab legalnych do wpisania wart. (Int 0-8) incl-incl
    private kand: Array<number>;

    /**
     * konstruktor pola1x1, w nawiasach (incl-incl)
     * @param {number} val - wartosc (Int 1-9) wpisana w pole 1x1, 0 jesli puste
     * @param {number} w - Int (0-8) - indeks wiersza w kwadracie 9x9
     * @param {number} k - Int (0-8) - indeks kolumny w kwadracie 9x9
     * @param {string} kw3x3 - "aa-cc" - id kwadr 3x3 do ktorego nalezy pole
     */
    public constructor(val: number, w: number, k: number, kw3x3: string) {
	this.val = val;
	this.w = w;
	this.k = k;
	this.kw3x3 = kw3x3;
	// kandydaci do wpisania w to pole
	if (val !== 0) {
	    // jesli jest juz wpisana liczba to brak kandydatow
	    this.kand = [];
	} else {
	    // jesli puste pole (0) to 1-9 (incl-incl)
	    this.kand = this.range(1, 10);
	}
    }

    /**
     * odpowiednik Python-owego range()
     * generuje tablice wypelniona Intami od (incl) do (excl) co iles wartosci
     * @param {number} start - Int, od jakiej liczby zaczac (included)
     * @param {number} stop - Int, do jakiej liczby dojsc (excluded)
     * @param {number} co - Int, co ile oczek inkrementowac
     * @return {Array<number>} tab Int-ow start-stop (incl-excl) co iles oczek
     */
    private range(start: number, stop: number, co: number = 1): Array<number> {
	let tab: Array<number> = [];
	for (let i = start; i < stop; i += co) {
	    tab.push(i);
	}
	return tab;
    }

    // getter dla wartosci wpisanej w pole1x1
    public getVal(): number {
	return this.val;
    }

    // setter wartosci wpisanej w pole1x1
    public setVal(val: number): void {
	this.val = val;
    }

    // getter kandydatow, tj. mozliwych do wpisania w pole1x1 wartosci
    public getKand(): Array<number> {
	return this.kand;
    }

    /**
     * getter nr wier/kol (kw9x9) lub id kw3x3 w ktorym jest pole1x1
     * @param {string} typ - "w"|"k"|"kw3x3"
     * @returns {number|string} id dla wiersza/kol/kw3x3 w ktorym jest pole1x1
     */
    public getLokalizacja(typ: string): number|string {
	if(typ === "w") {
	    return this.w;
	} else if (typ === "k") {
	    return this.k;
	} else {
	    return this.kw3x3;
	}
    }

    /**
     * usuwa dany numer z tablicy (pierwszy napotkany)
     * modyfikuje tablice wejsciowa INPLACE
     * jesli numeru nie znaleziono wtedy nie zmienia tab wejsc
     * po modyfikacji moze zostac pusta tablica wejsc
     * @param {Array<number>} tab - tablica Int-ow
     * @param {number} num - szukana liczba do usuniecia z tab
     */
    private usNumZtab(tab: Array<number>, num: number): void {
	let eltPos = tab.indexOf(num);
	if (eltPos >= 0) {
	    tab.splice(eltPos, 1); // usuwa INPLACE
	}
    }

    /**
     * usuwa numery (nums) z kandydatow (this.kand)
     * modyfikuje this.kand INPLACE
     * @param {Array<number>} nums - tab liczb (Int-y) do usun z this.kand
     */
    public usNumsZKand(nums: Array<number>): void {
	for (let i = 0; i < nums.length; i++) {
	    this.usNumZtab(this.kand, nums[i]);
	}
    }

    /**
     * zwraca stringowa repr pola,
     * tj. cyfra 1-9 (incl-incl) lub wyp jesli 0 (puste pole)
     * @param {string} wyp - string do uzycia jako reprez. pust pola
     */
    public getRepr(wyp: string = " "): string {
	if (this.val === 0) {
	    return wyp;
	} else {
	    return (this.val).toString();
	}
    }
}

export {Pole1x1}
