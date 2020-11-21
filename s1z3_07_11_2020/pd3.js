/////////////////
// Praca domowa z dnia 07-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// funkcje nie sa optymalizowane pod katem szybkosci
// w sumie to pisane na kolanie
/////////////////


///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 1                                 //
///////////////////////////////////////////////////////////////////////////////
// 1) Create an iffe that returns an object with fields: function
// setValue(), function showValue() and
// function reverseValue(). Calling functions either logs the value or
// reverse it in an object. If value was not provided yet or is empty
// showValue function is to return information about that. Value can
// be type string or number. reverseValue(): If number do (*(-1)), if
// string reverse it. Closure pattern.

// Ok, tak jak zrozumialem polecenie:
// "logs the value" - czyli console.log()?
// "(*(-1))" czyli numer*(-1)
// "reverse string", czyli 'abc' => 'cba'
// "not provided or is empty"? - pozwole tylko na stringi i numery,
// to przy okazji nie bedzie tabel i innych niepotrzebnych rzeczy


let myObject = (function ifkaZwracaObiekt() {
    return {
	wartosc: 1,
	showValue() {
	    console.log("aktualna wartosc przechowywana w obiekcie to " +
			this.wartosc);
	}, // getter zalecany: get showValue(){return this.wartosc}
	setValue(wartStartowa) {
	    if(typeof wartStartowa === "number" || // tylko nr i str
	       typeof wartStartowa === "string") { // bez pusty, array, itd.
		this.wartosc = wartStartowa;
		console.log("ustawiono nowa wartosc obiektu");
	    } else {
		console.log("nieprawidlowy argument, przyjmuje " +
			    "tylko numery i stringi");
	    }
	    this.showValue();
	}, // alternatywa (zalecany setter): set setValue(wartStartowa),
	// wywolanie obiekt.setValue = "abc";
	reverseValue() {
	    if(typeof this.wartosc === "number") {
		this.wartosc = -1 * this.wartosc;
	    } else if (typeof this.wartosc === "string") {
		let strOdwr = []; // na razie tablica
		for (let i = this.wartosc.length-1; i >= 0; i--) {
		    strOdwr.push(this.wartosc[i]);
		}
		strOdwr = strOdwr.join(""); // teraz robimy z tego string
		this.wartosc = strOdwr;
	    } 
	    this.showValue(); // na koniec pokazujemy zmieniona wartosc
	},
    };
})();

// myObject.showValue();
// myObject.setValue(2);
// myObject.setValue();
// myObject.reverseValue();
// myObject.setValue("abc");
// myObject.reverseValue();

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 2                                 //
///////////////////////////////////////////////////////////////////////////////
// 2) Create four function definitions. One for every basic math
// operations and taking two input parameters. Create one more
// function. This function is to return calculation object. This
// object is to have parameters object field that holds two operation
// parameters inside (x and y) and a function field that points to a
// function with math operation (defined at the beginning). A
// function setOperation() that sets the field from previous sentence
// and a calculate() function that makes calculation and returns its
// value.

let dod = (a, b) => a+b;
let odejm = (a, b) => a-b;
let mnoz = (a, b) => a*b;
let dziel = (a, b) => a/b;

function wybierzOperacje(x, y) {
    return { // calculation object
        x: x,
        y: y,
        funDoWyk: dod, // domyslna wartosc
        setOperation(operacja) {
            this.funDoWyk = operacja;
        },
        calculate() {
            return this.funDoWyk(x, y);
        },
    };
}

// let operNa1i4 = wybierzOperacje(1, 4);
// operNa1i4.setOperation(odejm);
// console.log(operNa1i4.calculate());
// operNa1i4.setOperation(mnoz);
// console.log(operNa1i4.calculate());


// let operNa3i9 = wybierzOperacje(3, 9);
// operNa3i9.setOperation(dod);
// console.log(operNa3i9.calculate());
// operNa3i9.setOperation(dziel);
// console.log(operNa3i9.calculate());

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 3                                 //
///////////////////////////////////////////////////////////////////////////////
// 3) Create an array (by hand) of objects and call sum() function in
// context of each one of them. Sum function is to come from this
// object BaseObject = {x,y, sum: function (){
// return this.x+this.y}}

// Example array: [{x:2,y:3},{x:-1,x:6,{x:0,x:8},…..]

let myArr = [
    {
        x: 2,
        y: 3,
    },
    {
        x: -1,
        y: 6,
    },
    {
        x: 0,
        y: 8,
    },
    {
        x: 4,
        y: 101,
    },
];

// tu zainicjalizuje x i y (just in case)
let BaseObject = {x: 0, y: 0, sum() {return this.x + this.y;}};

// for (let i = 0; i < myArr.length; i++) {
//     console.log(
// 	BaseObject.sum.call(myArr[i])
//     );
// }

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 4                                  //
///////////////////////////////////////////////////////////////////////////////
// 4) Given an array of objects, for each object call operation()
// function in context of next object. If object is last, got back to
// start of the array for operation function. In loop;

// [
//     {
//         x: 1,
//         y: 'object one value',
    //     operation: () => 'object one prefix' + this.x + this.y
//     },
//     {
//         x: 2,
//         y: 'object two value',
//         operation: () => 'object two prefix' + this.x + this.y
//     },

//     {
//         x: 3,
//         y: 'object three value',
//         operation: () => 'object three prefix' + this.x + this.y
//     }
// ]

let tabOb = [
    {
        x: 1,
        y: ', object one value',
        operation() {return 'object one prefix ' + this.x + this.y;},
    },
    {
        x: 2,
        y: ', object two value',
        operation() {return 'object two prefix ' + this.x + this.y;},
    },

    {
        x: 3,
        y: ', object three value',
        operation() {return 'object three prefix ' + this.x + this.y;},
    }
];

for (let i = 0; i < tabOb.length; i++) {
    if (i !== (tabOb.length - 1)) {
    	console.log(
    	    tabOb[i].operation.call(tabOb[i+1])
    	);
    } else {
    	console.log(
    	    tabOb[i].operation.call(tabOb[0])
        );
    }
}

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 5
//                   zaliczeniowe na inny termin do pokazania?!
///////////////////////////////////////////////////////////////////////////////
// 5) Scale riddle. With 8 balls :) EXAM [1,1,1,1,2,1,1,1]. One of the
// items will be change to two. Indexes are t be chosen at random. Use
// compressions only two times.
