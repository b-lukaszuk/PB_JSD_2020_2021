/////////////////
// Praca domowa z dnia 07-11-2020
// Przedmiot: Programowanie w jezyku JavaScript
// Podyplomowka: JavaScript Developer 2020/2021
// funkcje nie sprawdzaja zalozen, nie lapia bledow (try...catch), itd.
// funkcje nie sa optymalizowane pod katem szybkosci
// w sumie to pisane na kolanie (w dniu cwiczen sprawdzajacych)
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

// for (let i = 0; i < tabOb.length; i++) {
//     if (i !== (tabOb.length - 1)) {
//     	console.log(
//     	    tabOb[i].operation.call(tabOb[i+1])
//     	);
//     } else {
//     	console.log(
//     	    tabOb[i].operation.call(tabOb[0])
//         );
//     }
// }

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 5
//                   zaliczeniowe na inny termin do pokazania?!
///////////////////////////////////////////////////////////////////////////////
// 5) Scale riddle. With 8 balls :) EXAM [1,1,1,1,2,1,1,1]. One of the
// items will be change to two. Indexes are t be chosen at random. Use
// compressions only two times.

// "indexes are to be chosen at random"?
// przyjmuje ze zmieniam losowa wartosc w tabeli na z 1 na 2
// "Use compressions only two times" - chodzi o "comparisons" (porownania)?
// jak mam rozumiec porownanie, tak jak w wazeniu, < lub > lub =
// inaczej jesli same if-y/elsy, boole (a > b) to jest chyba niemozliwe
// utworze wiec funkcje zwazKule - ktora imituje wazenie waga




/**
 * fn. pom. - sumuje elt-y tabeli
 * @param {Array<Number>} tab - tabela numerow
 * @return {Number} suma elementow w tabeli
 */
function sumTab(tab) {
    return tab.reduce((a, b) => a + b, 0);
}

/**
 * fn. pom. - imituje wazenie 2 zestawow kul
 * @param {Array<Number>} tab1 - tab liczb do porownania (lewa str wagi)
 * @param {Array<Number>} tab2 - tab liczb do porownania (prawa str wagi)
 * @return {Number} [-1, 0, 1] - dla tab1 vs. tab (lt, eq, gt)
 */
function zwazKule(tab1, tab2) {
    let sT1 = sumTab(tab1);
    let sT2 = sumTab(tab2);
    if (sT1 < sT2) {
        return -1;
    } else if (sT1 === sT2) {
        return 0;
    } else {
        return 1;
    }
}

let tabWaga = [1, 1, 1, 1, 1, 1, 1, 1];

/**
 * fn pomocn - zwraca liczbe (Int) z zakresu 0 do n (incl-excl)
 * @param {Number} n - liczba (Int), gorna granica zakresu (exclusive)
 * @return {Number} losowa liczba (Int) z zadanego zakresu
 */
function getIntToN(n) {
    // Math.random() - od 0 do 1
    // * length aby gorny zakres, floor aby zakres byl od 0 do length-1
    return Math.floor(Math.random() * n);
}

/**
 * fn. pomocn - wstawia 2 do los ind tabeli wejsciowej (inplace or not)
 * @param {Array<Number>} tab - tablica liczb
 * @param {Bool} inplace - czy modyf. tab wejsciowa, czy zwrocic kopie  
 * @return {typ_zwracanej_wart} krotki opis zwracanej wartosci
 */
function put2doLosInd(tab, inplace=false) {
    if(!inplace) { // kopia tabeli wejsciowej, nie zmieniamy inplace
        tab = tab.slice(); 
    }
    return tab[getIntToN(tab.length)] = 2; // wstawia 2 do los ind
}


put2doLosInd(tabWaga, inplace=true);
console.log("twoja waga wyglada nastepujaco: " + tabWaga);


/**
 * fn. pomocn - zwraca tab o ind od start (incl) do stop (excl), start < stop
 * @param {Array} tab - tabela (nie moze byc pusta)
 * @param {Number} start - indeks poczatkowy (inclusive)
 * @param {Number} end - indeks koncowy (exclusive)
 * @return {Array} tabela wynikowa z elt z tab wejsc z wybranego zakresu
 */
function tabRange(tab, start, stop) {
    let tabWyn = [];
    for (let i = start; i < stop; i++) {
	tabWyn.push(tab[i]);
    }
    return tabWyn;
}


/**
 * zwraca indeks 2 w 8 elt tabeli z rep(1, 7) i rep(2, 1)
 * @param {Array<Number>} tab - tablica 8 elt (zawsze), 7 to 1, 1 to 2
 * @return {Number} indeks pod ktorym jest 2
 */
function getInd2(tab) {
    let tab1of3 = tabRange(tab, 0, 3); // pierwsze 3 elty
    let tab2of3 = tabRange(tab, 3, 5); // 2 srodkowe elty
    let tab3of3 = tabRange(tab, 5, 8); // ostatnie 3 elty
    let wynWaz1 = zwazKule(tab1of3, tab3of3);
    if (wynWaz1 === 1) { // ciezka kula jest w 1 czesci
        console.log("2 jest na pocz");
        let wynWaz2 = zwazKule([tab[0]], [tab[1]]);
        if (wynWaz2 === 1) {
            console.log("2 jest pod indeksem 0");
        } else if (wynWaz2 === -1) {
            console.log("2 jest pod indeksem 1");
        } else {
            console.log("2 jest pod indeksem 2");
        }
    } else if (wynWaz1 === 0) { // ciezka kula jest w srodku
        console.log("2 jest w srodku");
        let wynWaz2 = zwazKule([tab[3]], [tab[4]]);
        if (wynWaz2 === 1) {
            console.log("2 jest pod indeksem 3");
        } else {
            console.log("2 jest pod indeksem 4");
        }
    } else { // ciezka kula jest w 3 czesci
        console.log("2 jest na koncu");
        let wynWaz2 = zwazKule([tab[5]], [tab[6]]);
        if (wynWaz2 === 1) {
            console.log("2 jest pod indeksem 5");
        } else if (wynWaz2 === -1) {
            console.log("2 jest pod indeksem 6");
        } else {
            console.log("2 jest pod indeksem 7");
        }
    }
}

getInd2(tabWaga);

