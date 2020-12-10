// 2)(EXAM) Solve sudoku

// background do rozwiazania:
// 1 video z YT z:
// https://www.youtube.com/watch?v=ckdwhm7GM94&list=PLAhxvOuSHpkYsUufBeuHjQUNcb3iHt9nl
// wlasnoreczne (na piechote) rozwiazanie 1 latwego sudoku z:
// https://sudoku.com/easy/
// i zobaczmy czy to wystarczy
// (do rozwiazania jest proste sudoku, wiec powinno)

// sudoku to duzy kwadrat 9x9 (malych kwadratow)
// bedzie reprezentowana jako tablica 81 elt [0:80], bo 9x9

//// kopia - potrzebna mi, kompowi wszystki jedno
//// daje tutaj, bo prettier-JS mi to rozbija do postaci malo czytelnej
// [
//     // [0:3, 0:9]
//     7, 0, 4,       8, 0, 0,       3, 0, 1,
//     8, 2, 0,       5, 0, 0,       0, 4, 0,
//     0, 0, 9,       4, 3, 0,       5, 0, 0,

//     // [3:6, 0:9]
//     3, 1, 0,       0, 0, 0,       8, 0, 7,
//     0, 8, 0,       0, 0, 0,       0, 1, 0,
//     9, 0, 7,       0, 0, 0,       0, 3, 2,

//     // [6:9, 0:9]
//     0, 0, 6,       0, 1, 5,       4, 0, 0,
//     0, 7, 0,       0, 0, 9,       0, 6, 5,
//     5, 0, 8,       0, 0, 2,       1, 0, 3,
// ];

let tabela9x9 = [
  7,
  0,
  4,
  8,
  0,
  0,
  3,
  0,
  1,
  8,
  2,
  0,
  5,
  0,
  0,
  0,
  4,
  0,
  0,
  0,
  9,
  4,
  3,
  0,
  5,
  0,
  0,
  3,
  1,
  0,
  0,
  0,
  0,
  8,
  0,
  7,
  0,
  8,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  9,
  0,
  7,
  0,
  0,
  0,
  0,
  3,
  2,
  0,
  0,
  6,
  0,
  1,
  5,
  4,
  0,
  0,
  0,
  7,
  0,
  0,
  0,
  9,
  0,
  6,
  5,
  5,
  0,
  8,
  0,
  0,
  2,
  1,
  0,
  3,
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
   * @param {Number} val - Int wpisany w najmniejszym kwadracie
   * @param {Number} w - Int (0-8) - indeks wiersza w kwadracie 9x9
   * @param {Number} k - Int (0-8) - indeks kolumny w kwadracie 9x9
   * @param {Number} kw3x3 - Int (0-8) - id kwadratu 3x3 do ktorego nalezy pole
   */
  constructor(val, w, k, kw3x3) {
    this.val = val;
    this.w = w;
    this.k = k;
    this.kw3x3 = kw3x3;
    // kandydaci do wpisania w to pole
    if (val !== 0) {
      this.kand = []; // jesli jest juz wpisana liczba to brak kandydatow
    } else {
      this.kand = range(1, 10); // jesli puste pole (0) to 0 (incl) - 9 (incl)
    }
  }
  getVal() {
    return this.val;
  }
  setVal(val) {
    this.val = val;
  }

  getKand() {
    return this.kand;
  }
  setKand(kand) {
    this.kand = kand;
  }
  getKol() {
    return this.k;
  }
  getWier() {
    return this.w;
  }
  getKw3x3() {
    return this.kw3x3;
  }
}

/**
 * usuwa dany numer z tablicy (pierwszy napotkany, jesli tam jest)
 * nie zmienia otrzymanej tablicy
 * @param {Array<Number>} tab - tablica Int-ow
 * @param {Number} num - szukana liczba do usuniecia z tabeli
 * @return {Array<Number>} array z us numerem (lub pusty array)
 */
function usNumZtab(tab, num) {
  let tab1 = [...tab];
  let eltPos = tab1.indexOf(num);
  if (eltPos >= 0) {
    tab1.splice(eltPos, 1); // usuwa inplace
  }
  return tab1;
}

/**
 * usuwa numery (nums) z tablicy (tab)
 * nie zmienia otrzymanej tablicy
 * @param {Array<Number>} tab - tablica Int-ow
 * @param {Array<Number>} nums - tab liczb (Int-y) do usun z tab
 * @return {Array<Number>} array z us numerami (lub pusty array)
 */
function usNumsZtab(tab, nums) {
  let tab1 = [...tab];
  for (let i = 0; i < nums.length; i++) {
    tab1 = usNumZtab(tab1, nums[i]);
  }
  return tab1;
}

class Kwadrat9x9 {
  constructor(tab9x9) {
    this.tabPol9x9 = [];
    this.kw3x3Ids = [];
    // iteracja po wierszach tab9x9 (input)
    for (let w = 0; w < 9; w++) {
      // iteracja po kolumnach tab9x9 (input)
      for (let k = 0; k < 9; k++) {
        let id = 9 * w + k; // id formatu 9x9
        let idKw3x3 = this.getKw3x3(w, k);
        if (this.kw3x3Ids.indexOf(idKw3x3) === -1) {
          this.kw3x3Ids.push(idKw3x3);
        }
        this.tabPol9x9.push(new Pole1x1(tab9x9[id], w, k, idKw3x3));
      }
    }
  }

  // num - liczba od 0 do 8
  // zwraca "a", "b" lub "c" dla zakresu co 3 liczac od 0
  abc(num) {
    if (num > 5) {
      return "c";
    } else if (num > 2) {
      return "b";
    } else {
      return "a";
    }
  }

  // dla wiersza i kolumny zwraca id kwadratu 3x3
  // od "aa" do "cc"
  getKw3x3(w, k) {
    return this.abc(w) + this.abc(k);
  }

  getValKol(k) {
    return this.tabPol9x9.filter((pole) => pole.getKol() === k);
  }

  getValWier(w) {
    return this.tabPol9x9.filter((pole) => pole.getWier() === w);
  }

  getValKw3x3(id) {
    return this.tabPol9x9.filter((pole) => pole.getKw3x3() === id);
  }

  // update kandydatow na podst zawartosci kolumny
  updKandKol(k) {
    let zajete = this.getValKol(k)
      .map((pole) => pole.getVal())
      .filter((num) => num !== 0);
    this.getValKol(k).forEach((p) => {
      p.setKand(usNumsZtab(p.getKand(), zajete));
    });
  }

  // update kandydatow na podst zawartosci wiersza
  updKandWier(w) {
    let zajete = this.getValWier(w)
      .map((pole) => pole.getVal())
      .filter((num) => num !== 0);
    this.getValWier(w).forEach((p) => {
      p.setKand(usNumsZtab(p.getKand(), zajete));
    });
  }

  // update kandydatow na podst zawartosci Kwadratu3x3
  updKandKw3x3(id) {
    let zajete = this.getValKw3x3(id)
      .map((pole) => pole.getVal())
      .filter((num) => num !== 0);
    this.getValKw3x3(id).forEach((p) => {
      p.setKand(usNumsZtab(p.getKand(), zajete));
    });
  }

  updAllKands() {
    for (let i = 0; i < 9; i++) {
      this.updKandWier(i);
      this.updKandKol(i);
      this.updKandKw3x3(this.kw3x3Ids[i]);
    }
  }

  updAllVals() {
    this.tabPol9x9.forEach((p) => {
      if (p.getKand().length === 1) {
        p.setVal(p.getKand()[0]);
      }
    });
  }

  solveSudoku(n_iter = 200) {
    for (let i = 0; i < n_iter; i++) {
      this.updAllKands();
      this.updAllVals();
    }
  }

  // drukuje sudoku (kwadrat9x9) do konsoli
  print() {
    // linia otwierajaca (pierwsza z gory)
    console.log("-------------------------");

    // iteracja po wierszach
    for (let w = 0; w < 9; w++) {
      let wierszDoDruku = "| "; // bok najbardziej od lewej

      // iteracja po kolumnach
      for (let k = 0; k < 9; k++) {
        let id = 9 * w + k; // id z tabPol9x9
        wierszDoDruku += this.tabPol9x9[id].getVal() + " ";
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

let kwadrat9x9 = new Kwadrat9x9(tabela9x9);
kwadrat9x9.print();
console.log("\n");
kwadrat9x9.solveSudoku();
kwadrat9x9.print();

// console.log(kwadrat9x9.kw3x3Ids);

// console.log(kwadrat9x9.tabPol9x9);
