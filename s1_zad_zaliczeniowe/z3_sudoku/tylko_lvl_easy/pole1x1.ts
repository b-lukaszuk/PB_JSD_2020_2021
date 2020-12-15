/**
 * klasa reprezentujaca pojedyncze pole sudoku (najmniejszy kwadrat, 1 x 81)
 */
class Pole1x1 {
    // pola prywatne, znaczenie docstringu konstruktora
    private val: number;
    private w: number;
    private k: number;
    private kw3x3: string;
    // kandydaci, tab legalnych do wpisania wart.
    private kand: Array<number>; 

    /**
     * konstruktor pola1x1
     * @param {number} val - wartosc (Int) 1-9 wpisana w pole 1x1, 0 jesli puste
     * @param {number} w - Int (0-8) - indeks wiersza w kwadracie 9x9
     * @param {number} k - Int (0-8) - indeks kolumny w kwadracie 9x9
     * @param {number} kw3x3 - Int (0-8) - id kwadr 3x3 do ktorego nalezy pole
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
     * @return {Array<number>} tab Int-ow od (incl) - do (excl) co iles oczek
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

    // setter kandydatow dla pola1x1
    setKand(kand: Array<number>): void {
	this.kand = kand;
    }

    // getter nr kolumny (z kw9x9) w ktorym jest pole1x1
    public getKol(): number {
	return this.k;
    }

    // getter nr wiersza (z kw9x9) w ktorym jest pole1x1
    public getWier(): number {
	return this.w;
    }

    // getter id kw3x3 w ktorym jest pole1x1
    public getKw3x3(): string {
	return this.kw3x3;
    }

    /**
     * usuwa dany numer z tablicy (pierwszy napotkany, jesli tam jest)
     * modyfikuje tablice wejsciowa INPLACE
     * @param {Array<number>} tab - tablica Int-ow
     * @param {number} num - szukana liczba do usuniecia z tab
     * @return {Array<number>} array (wejsciowy | z usun nr | pusty)
     */
    private usNumZtab(tab: Array<number>, num: number): Array<number> {
	let eltPos = tab.indexOf(num);
	if (eltPos >= 0) {
	    tab.splice(eltPos, 1); // usuwa INPLACE
	}
	return tab;
    }

    /**
     * usuwa numery (nums) z kandydatow (this.kand)
     * MODYFIKUJE this.kand
     * @param {Array<number>} nums - tab liczb (Int-y) do usun z this.kand
     */
    public usNumsZKand(nums: Array<number>): void {
	for (let i = 0; i < nums.length; i++) {
	    this.usNumZtab(this.kand, nums[i]);
	}
    }
}

export {Pole1x1}
