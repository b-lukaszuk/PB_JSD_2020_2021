/////////////////
// zadanie zaliczeniowe z dnia 28-11-2020 zadane przy okazji pracy domowej
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// lekko opytmalizowane, pisane w typeScript
/////////////////


// 2)(EXAM) Solve sudoku

// background do rozwiazania:
// 1 video z YT z:
// https://www.youtube.com/watch?v=ckdwhm7GM94&list=PLAhxvOuSHpkYsUufBeuHjQUNcb3iHt9nl
// wlasnoreczne (na piechote) rozwiazanie 1 latwego sudoku z:
// https://sudoku.com/easy/
// i zobaczmy czy to wystarczy
// (do rozwiazania wymagane jest tylko proste sudoku, wiec powinno)

// sudoku to duzy kwadrat 9x9 (zlozony z malych kwadratow)
// bedzie reprezentowany jako tablica 81 elt [0:80] (incl-incl), bo 9x9=81

// uzycie:
// bash:
// > tsc z3.ts
// > node z3.js

import {Kwadrat9x9} from "./kwadrat9x9";

// sudoku z zadania prowadzacego, lvl: beginner
let tab81eltV1: Array<number> = [
    // [0:3, 0:9] incl-excl
    7, 0, 4,       8, 0, 0,       3, 0, 1,
    8, 2, 0,       5, 0, 0,       0, 4, 0,
    0, 0, 9,       4, 3, 0,       5, 0, 0,

    // [3:6, 0:9] incl-excl
    3, 1, 0,       0, 0, 0,       8, 0, 7,
    0, 8, 0,       0, 0, 0,       0, 1, 0,
    9, 0, 7,       0, 0, 0,       0, 3, 2,

    // [6:9, 0:9] incl-excl
    0, 0, 6,       0, 1, 5,       4, 0, 0,
    0, 7, 0,       0, 0, 9,       0, 6, 5,
    5, 0, 8,       0, 0, 2,       1, 0, 3,
];

let easySudoku: Kwadrat9x9 = new Kwadrat9x9(tab81eltV1);

console.log("sudoku nr 1 przed rozwiazaniem");
easySudoku.print();

console.log("\nsudoku nr 1 po rozwiazaniu");
easySudoku.solveSudoku();
easySudoku.print();

// inne sudoku z neta, do testu, level: (very) easy?
// to jeszcze program daje rade, ale juz lvl wiecej progam nie rozwiazuje
// (za prosty algorytm)
let tab81eltV2: Array<number> = [
    // [0:3, 0:9] incl-excl
    3, 0, 6,      0, 1, 0,      7, 0, 0,
    0, 7, 0,      5, 0, 8,      0, 0, 0,
    9, 0, 0,      0, 6, 0,      0, 0, 0,

    // [3:6, 0:9] incl-excl
    0, 9, 0,      6, 0, 0,      5, 0, 3,
    0, 0, 0,      9, 0, 5,      0, 0, 0,
    1, 0, 5,      0, 0, 4,      0, 6, 0,

    // [6:9 0:9] incl-excl
    0, 0, 0,      0, 4, 0,      0, 0, 1,
    0, 0, 0,      2, 0, 3,      0, 8, 0,
    0, 0, 9,      0, 8, 0,      2, 0, 5,
];

easySudoku = new Kwadrat9x9(tab81eltV2);

console.log("\n\nsudoku nr 2 przed rozwiazaniem");
easySudoku.print();

console.log("\nsudoku nr 2 po rozwiazaniu");
easySudoku.solveSudoku();
easySudoku.print();
