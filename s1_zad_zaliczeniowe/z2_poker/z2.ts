/////////////////
// zadanie zaliczeniowe z dnia 21-11-2020 zadane przy okazji pracy domowej
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// lekko opytmalizowane, pisane w typeScript
/////////////////

///////////////////////////////////////////////////////////////////////////////
//	                     zadanie 4 (egazminacyjne)
//		          do pokazania w innym terminie?!
///////////////////////////////////////////////////////////////////////////////
// 4) * Create a solution that will tell us what poker set we
// have. The solution is to deal us 5 cards from the standard 52
// card deck. After that the solution is to tell us what is the
// best poker set. EXAM

// uzycie:
// bash:
// > tsc z2.ts
// > node z2.js

import {Karta} from "./karta"
import {Talia} from "./taliaKart"
import {Hand} from "./hand"

let taliaKart: Talia = new Talia();

let hand1: Hand = new Hand(taliaKart.getNrandCards(5));
console.log("5 kart z losowego rozdania");
console.log(hand1.toString());
console.log(hand1.ustalUklad());

// t1
console.log("\n===");
console.log("Poker krolewski");
let hand2: Hand = new Hand(
    [
	new Karta(12, 4),
	new Karta(13, 4),
	new Karta(14, 4),
	new Karta(10, 4),
	new Karta(11, 4),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());

// t2
console.log("\n===");
console.log("Poker");
hand2 = new Hand(
    [
	new Karta(7, 2),
	new Karta(9, 2),
	new Karta(10, 2),
	new Karta(8, 2),
	new Karta(11, 2),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());

// t3
console.log("\n===");
console.log("Kareta");
hand2 = new Hand(
    [
	new Karta(9, 1),
	new Karta(9, 3),
	new Karta(9, 4),
	new Karta(3, 2),
	new Karta(9, 2),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());

// t4
console.log("\n===");
console.log("Full");
hand2 = new Hand(
    [
	new Karta(3, 4),
	new Karta(6, 3),
	new Karta(6, 1),
	new Karta(3, 4),
	new Karta(6, 2),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());

// t5
console.log("\n===");
console.log("Kolor");
hand2 = new Hand(
    [
	new Karta(2, 1),
	new Karta(11, 1),
	new Karta(7, 1),
	new Karta(14, 1),
	new Karta(4, 1),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());

// t6
console.log("\n===");
console.log("Strit");
hand2 = new Hand(
    [
	new Karta(7, 1),
	new Karta(6, 3),
	new Karta(5, 2),
	new Karta(3, 2),
	new Karta(4, 4),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());

// t7
console.log("\n===");
console.log("Trojka");
hand2 = new Hand(
    [
	new Karta(8, 1),
	new Karta(2, 4),
	new Karta(8, 3),
	new Karta(8, 4),
	new Karta(10, 2),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());

// t8
console.log("\n===");
console.log("Dwie Pary");
hand2 = new Hand(
    [
	new Karta(12, 2),
	new Karta(12, 3),
	new Karta(5, 1),
	new Karta(2, 4),
	new Karta(5, 3),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());


// t9
console.log("\n===");
console.log("Para");
hand2 = new Hand(
    [
	new Karta(13, 2),
	new Karta(7, 4),
	new Karta(2, 3),
	new Karta(11, 1),
	new Karta(13, 4),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());


// t10
console.log("\n===");
console.log("Wysoka karta");
hand2 = new Hand(
    [
	new Karta(5, 1),
	new Karta(7, 3),
	new Karta(3, 4),
	new Karta(12, 2),
	new Karta(10, 3),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());
