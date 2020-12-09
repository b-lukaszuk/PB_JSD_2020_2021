// 2)(EXAM) Solve sudoku

// background, 1 video z YT
// https://www.youtube.com/watch?v=ckdwhm7GM94&list=PLAhxvOuSHpkYsUufBeuHjQUNcb3iHt9nl
// wlasnoreczne (na piechote) rozwiazanie 1 latwego sudoku z
// https://sudoku.com/easy/
// i zobaczmy czy to wystarczy
// (do rozwiazania jest proste sudoku wiec powinno)

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
   * @param {<Object>} pola1x1 - wiele obiektow (do 9), klasy pole
   */
  constructor(...pola1x1) {
    if (pola1x1.length != 9) {
      console.log("blad! obiektow pole1x1 musi byc dokladnie 9");
    } else {
      this.tabPol = pola1x1;
    }
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

class Kwadrat9x9 {
  constructor(tab9x9) {
    this.tabPol9x9 = [];
    for (let w = 0; w < 9; w++) {
      for (let k = 0; k < 9; k++) {
        this.tabPol9x9.push(new Pole1x1(tab9x9[9 * w + k], (w = w), (k = k)));
      }
    }
  }
  // drukuje sudoku (kwadrat9x9) do konsoli
  print() {
    // linia otwierajaca (pierwsza z gory)
    console.log("-------------------------");

    for (let w = 0; w < 9; w++) {
      // iteracja wiersze
      let wierszDoDruku = "| "; // bok najbardziej od lewej

      for (let k = 0; k < 9; k++) {
        // iteracja kolumny
        let id = 9 * w + k; // id z tabPol9x9
        wierszDoDruku += this.tabPol9x9[id].getNum() + " ";
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

kwadrat9x9 = new Kwadrat9x9(tabela9x9);
// console.log(kwadrat9x9.tabPol9x9);
kwadrat9x9.print();
