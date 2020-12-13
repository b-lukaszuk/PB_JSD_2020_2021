/**
 * klasa reprezentujaca Karte do gry w pokera
 * karta to obiekt z 2 polami: ranga i kolor
 * wartosci 2-10, J, D, K, A (reprezentacja: 2-14)
 * kolory:  czerwo, dzwonek, wino, zoledz (reprezentacja: 1-4)
 */
class Karta {
    private ranga: number = 0;
    private kolor: number = 0;

    /**
     * @param {number} ranga - (Int: 2-14, gdzie 11-14 to J, D, K, A)
     * @param {number} kolor - (int: 1-4), kolejno czerwo, dzwonek, wino, zoledz
     */
    public constructor(ranga: number, kolor: number) {
	this.ranga = ranga;
	this.kolor = kolor;
    }

    public getRanga(): number {
	return this.ranga;
    }

    public getKolor(): number {
	return this.kolor;
    }

    /**
     * zwraca repr stringowa rangi karty
     * @returns {string} - reprezentacja stringowa rangi karty 
     */
    private getRangAsString(): string {
	let strRanga: string;
	// reprezentacja stringowa rangi
	switch (this.ranga) {
	case 11:
	    strRanga = "J";
	    break;
	case 12:
	    strRanga = "D";
	    break;
	case 13:
	    strRanga = "K";
	    break;
	case 14:
	    strRanga = "A";
	    break;
	default:
	    strRanga = String(this.ranga);
	}
	return strRanga;
    }

    /**
     * zwraca repr stringowa koloru karty
     * @returns {string} - reprezentacja stringowa koloru karty 
     */
    private getKolorAsString(): string {
	let strKolor: string;
	// reprezentacja stringowa koloru
	switch (this.kolor) {
	case 1:
	    strKolor = "\u2665"; // czerwo
	    break;
	case 2:
	    strKolor = "\u2666"; // dzwonek
	    break;
	case 3:
	    strKolor = "\u2660"; // wino
	    break;
	default:
	    strKolor = "\u2663"; // zoledz
	}
	return strKolor;
    }
    
    /**
     * zwraca repr stringowa karty
     * @returns {string} - reprezentacja stringowa karty 
     */
    public toString() {
	return this.getRangAsString() + this.getKolorAsString();
    }
}

export {Karta}
