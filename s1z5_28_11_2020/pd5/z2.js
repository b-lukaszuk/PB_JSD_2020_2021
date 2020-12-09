// 2)(EXAM) Solve sudoku

// background, 1 video z YT
// https://www.youtube.com/watch?v=ckdwhm7GM94&list=PLAhxvOuSHpkYsUufBeuHjQUNcb3iHt9nl
// wlasnoreczne (na piechote) rozwiazanie 1 latwego sudoku z
// https://sudoku.com/easy/
// i zobaczmy czy to wystarczy

// sudoku to duzy kwadrat 9x9 (malych kwadratow)
// na razie bedzie reprezentowany jako tablica tablic
// w komentarzach indeksacja Python-owa (od 0 i incl-excl)
let table = [
  // [0:3, 0:3]
  [
    [7, 0, 4],
    [8, 2, 0],
    [0, 0, 9],
  ],
  // [0:3, 3:6]
  [
    [8, 0, 0],
    [5, 0, 0],
    [4, 3, 0],
  ],
  // [0:3, 6:9]
  [
    [3, 0, 1],
    [0, 4, 0],
    [5, 0, 0],
  ],
  // [3:6, 0:3]
  [
    [3, 1, 0],
    [0, 8, 0],
    [9, 0, 7],
  ],
  // [3:6, 3:6]
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  // [3:6, 6:9]
  [
    [8, 0, 7],
    [0, 1, 0],
    [0, 3, 2],
  ],
  // [6:9, 0:3]
  [
    [0, 0, 6],
    [0, 7, 0],
    [5, 0, 8],
  ],
  // [6:9, 3:6]
  [
    [0, 1, 5],
    [0, 0, 9],
    [0, 0, 2],
  ],
  // [6:9, 6:9]
  [
    [4, 0, 0],
    [0, 6, 5],
    [1, 0, 3],
  ],
];

/**
 * odpowiednik Python-owego range()
 * generuje tablice wypelniona Intami od (incl) do (excl) co iles
 * @param {Number} start - od jakiej liczby zaczac (included)
 * @param {Number} stop - do jakiej liczby dojsc (excluded)
 * @param {Number} co - co ile oczek inkrementowac
 * @return {Array<Number>} tablica z Int-ami od (incl) - do (excl) co iles oczek
 */
function range(start, stop, co = 1) {
  let tab = [];
  for (let i = start; i < stop; i += co) {
    tab.push(i);
  }
  return tab;
}

/**
 * pojedyncze pole sudoku (najmniejszy kwadrat)
 */
class Pole1x1 {
  /**
   * @param {Number} num - Int wpisany w najmniejszym kwadracie
   * @param {Number} w - Int (0-9) - indeks wiersza w kwadracie 9x9
   * @param {Number} k - Int (0-9) - indeks kolumny w kwadracie 9x9
   */
  constructor(num, w, k) {
    this.num = num;
    this.w = w;
    this.k = k;
    // kandydaci do wpisania w to pole
    if (num !== 0) {
      this.kand = []; // jesli jest juz wpisana liczba to brak kandydatow
    } else {
      this.kand = range(1, 10); // jesli puste pole (0) to 0 (incl) - 9 (incl)
    }
  }
  getNum() {
    return this.num;
  }

  getKand() {
    return this.kand;
  }
  setKand(kand) {
    this.kand = kand;
  }
}

/**
 * usuwa dany numer z tablicy (pierwszy napotkany, jesli tam jest)
 * zmienia tablice inplace
 * @param {Array<Number>} tab - tablica Int-ow
 * @param {Number} num - szukana liczba do usuniecia z tabeli
 */
function usNumZtab(tab, num) {
  let eltPos = tab.indexOf(num);
  if (eltPos >= 0) {
    tab.splice(eltPos, 1);
  }
}

/**
 * kwadrat 3x3 w sudoku, skladajacy sie z 9 pol
 */
class Kwadr3x3 {
  /**
   * @param {Array<Object>} tabPol - tablica obiektow Pole1x1
   */
  constructor(tabPol) {
    this.tabPol = tabPol;
  }
  /**
   * updateuje kandydatow we wszystkich ob. Pole1x1
   * usuwa z kandydatow w obiekcie Pole1x1 liczby ktore sa juz w kwadracie3x3
   * @param {Array<Number>} tab - tablica Int-ow
   * @param {Number} num - szukana liczba do usuniecia z tabeli
   */
  updateKandyd() {
    let zajLiczby = this.tabPol
      .map((pole) => pole.getNum())
      .filter((num) => num > 0);

    for (let i = 0; i < zajLiczby; i++) {
      for (let j = 0; j < this.tabPol.length; i++) {
        this.tabPol[i].setKand(usNumZtab(this.tabPol[i].getKand(), i));
      }
    }
  }
}
