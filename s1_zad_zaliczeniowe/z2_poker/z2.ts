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

import {Karta} from "./karta"
import {Talia} from "./taliaKart"
import {Hand} from "./hand"

let taliaKart = new Talia();

let hand1 = new Hand(taliaKart.getNrandCards(5));
console.log(hand1.toString());
console.log(hand1.ustalUklad());

console.log("===");
let hand2 = new Hand(
    [
	new Karta(7, 1),
	new Karta(6, 1),
	new Karta(5, 1),
	new Karta(8, 2),
	new Karta(4, 1),
    ]
)
console.log(hand2.toString());
console.log(hand2.ustalUklad());
